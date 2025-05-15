// @ts-nocheck
import instructions from './instructions';
import toolService, { toolDefinitions } from './toolService';

export default class RealtimeService {
  constructor() {
    this.peerConnection = null;
    this.dataChannel = null;
    this.onTrackCallback = null;
    this.ready = false;
    this.mediaStream = null;
    this.messageHandler = null;
  }

  async init(onTrack) {
    if (typeof window === 'undefined') {
      console.error('Cannot initialize WebRTC outside of browser environment');
      return false;
    }

    // Clean up any existing connections first
    await this.stopSession();

    this.onTrackCallback = onTrack;
    this.peerConnection = new RTCPeerConnection();
    this.setupEventListeners();
    this.dataChannel = this.peerConnection.createDataChannel('oai-events');
    
    // Properly bind the message handler and store reference for removal
    this.messageHandler = this.handleMessage.bind(this);
    
    this.dataChannel.addEventListener('open', () => {
      console.log('Data channel open');
      this.configureDataChannel();
    });
    
    this.dataChannel.addEventListener('message', this.messageHandler);
    
    return true;
  }

  setupEventListeners() {
    this.peerConnection.ontrack = (event) => {
      if (this.onTrackCallback) {
        this.onTrackCallback(event);
      }
    };
    
    // Add logging for connection state changes
    this.peerConnection.onconnectionstatechange = () => {
      console.log('Connection state:', this.peerConnection.connectionState);
    };
    
    // Add logging for ICE connection state changes
    this.peerConnection.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', this.peerConnection.iceConnectionState);
    };
    
    // Add logging for signaling state changes
    this.peerConnection.onsignalingstatechange = () => {
      console.log('Signaling state:', this.peerConnection.signalingState);
    };
  }

  configureDataChannel() {
    console.log('Configuring data channel');
    const event = {
      type: 'session.update',
      session: {
        modalities: ['text', 'audio'],
        tools: toolDefinitions,
        instructions: instructions
      },
    };
    this.dataChannel.send(JSON.stringify(event));
    this.ready = true;
  }

  handleMessage = async (ev) => {
    console.log('Received message:', ev.data);
    try {
      const msg = JSON.parse(ev.data);
      // Handle function calls
      if (msg.type === 'response.function_call_arguments.done') {
        const fn = toolService[msg.name];
        if (fn !== undefined) {
          console.log(`Calling local function ${msg.name} with ${msg.arguments}`);
          const args = JSON.parse(msg.arguments);
          const result = await fn(args);
          console.log('result', result);
          
          // Let OpenAI know that the function has been called and share it's output
          const event = {
            type: 'conversation.item.create',
            item: {
              type: 'function_call_output',
              call_id: msg.call_id,
              output: JSON.stringify(result),
            },
          };
          this.dataChannel.send(JSON.stringify(event));
          
          // Have assistant respond after getting the results
          this.dataChannel.send(JSON.stringify({type:"response.create"}));
        }
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  }

  async startSession() {
    try {
      console.log('Starting session...');
      
      // Get user media
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Media stream obtained:', this.mediaStream.id);
      
      // Add tracks to peer connection
      this.mediaStream.getTracks().forEach((track) => {
        console.log('Adding track to peer connection:', track.kind, track.id);
        this.peerConnection.addTransceiver(track, { direction: 'sendrecv' });
      });
      
      // Create offer
      console.log('Creating offer...');
      const offer = await this.peerConnection.createOffer();
      console.log('Offer created');
      
      // Set local description
      console.log('Setting local description...');
      await this.peerConnection.setLocalDescription(offer);
      console.log('Local description set');
      
      // Fetch session token
      console.log('Fetching session token...');
      const tokenResponse = await fetch('/api/session');
      const data = await tokenResponse.json();
      const EPHEMERAL_KEY = data.client_secret.value;
      console.log('Session token obtained');
      
      // Connect to OpenAI
      const baseUrl = 'https://api.openai.com/v1/realtime';
      const model = 'gpt-4o-realtime-preview-2024-12-17';
      
      console.log('Connecting to OpenAI...');
      const response = await fetch(`${baseUrl}?model=${model}`, {
        method: 'POST',
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          'Content-Type': 'application/sdp',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to connect to OpenAI:', response.status, errorText);
        throw new Error(`Failed to connect to OpenAI: ${response.status} ${errorText}`);
      }
      
      const answer = await response.text();
      console.log('Received answer from OpenAI');
      
      // Set remote description
      console.log('Setting remote description...');
      await this.peerConnection.setRemoteDescription({
        sdp: answer,
        type: 'answer',
      });
      console.log('Remote description set');
      
      return true;
    } catch (error) {
      console.error('Error starting session:', error);
      // Clean up resources on error
      this.stopSession().catch(e => console.error('Error cleaning up after failed session start:', e));
      return false;
    }
  }
  
  async stopSession() {
    try {
      console.log('Stopping session...');
      
      // Close the data channel if it exists
      if (this.dataChannel) {
        // Remove event listeners
        if (this.messageHandler) {
          this.dataChannel.removeEventListener('message', this.messageHandler);
        }
        
        // Send an optional "goodbye" message
        if (this.dataChannel.readyState === 'open') {
          try {
            const event = {
              type: 'conversation.item.create',
              item: {
                type: 'text',
                text: 'User has ended the session.'
              },
            };
            this.dataChannel.send(JSON.stringify(event));
            console.log('Sent goodbye message');
          } catch (err) {
            console.log('Could not send goodbye message', err);
          }
          
          this.dataChannel.close();
          console.log('Data channel closed');
        }
        this.dataChannel = null;
      }
      
      // Stop all media tracks
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach(track => {
          console.log('Stopping track:', track.kind, track.id);
          track.stop();
        });
        this.mediaStream = null;
        console.log('Media stream tracks stopped');
      }
      
      // Close the peer connection
      if (this.peerConnection) {
        this.peerConnection.close();
        this.peerConnection = null;
        console.log('Peer connection closed');
      }
      
      // Reset state
      this.ready = false;
      this.messageHandler = null;
      
      console.log('Session stopped successfully');
      return true;
    } catch (error) {
      console.error('Error stopping session:', error);
      return false;
    }
  }
  
  isReady() {
    return this.ready;
  }
}