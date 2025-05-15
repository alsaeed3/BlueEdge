// @ts-nocheck
import instructions from './instructions';
import toolService, { toolDefinitions } from './toolService';

export default class RealtimeService {
  constructor() {
    this.peerConnection = null;
    this.dataChannel = null;
    this.onTrackCallback = null;
    this.ready = false;
  }

  async init(onTrack) {
    if (typeof window === 'undefined') {
      console.error('Cannot initialize WebRTC outside of browser environment');
      return false;
    }

    this.onTrackCallback = onTrack;
    this.peerConnection = new RTCPeerConnection();
    this.setupEventListeners();
    this.dataChannel = this.peerConnection.createDataChannel('oai-events');
    
    this.dataChannel.addEventListener('open', () => {
      console.log('Data channel open');
      this.configureDataChannel();
    });
    
    this.dataChannel.addEventListener('message', this.handleMessage);
    
    return true;
  }

  setupEventListeners() {
    this.peerConnection.ontrack = (event) => {
      if (this.onTrackCallback) {
        this.onTrackCallback(event);
      }
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
  }

  async startSession() {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Add tracks to peer connection
      stream.getTracks().forEach((track) => 
        this.peerConnection.addTransceiver(track, { direction: 'sendrecv' })
      );
      
      // Create offer
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      
      // Fetch session token
      const tokenResponse = await fetch('/api/session');
      const data = await tokenResponse.json();
      console.log('Session token:', data);
      const EPHEMERAL_KEY = data.client_secret.value;
      
      // Connect to OpenAI
      const baseUrl = 'https://api.openai.com/v1/realtime';
      const model = 'gpt-4o-realtime-preview-2024-12-17';
      
      const response = await fetch(`${baseUrl}?model=${model}`, {
        method: 'POST',
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          'Content-Type': 'application/sdp',
        },
      });
      
      const answer = await response.text();
      
      // Set remote description
      await this.peerConnection.setRemoteDescription({
        sdp: answer,
        type: 'answer',
      });
      
      return true;
    } catch (error) {
      console.error('Error starting session:', error);
      return false;
    }
  }
  
  isReady() {
    return this.ready;
  }
}