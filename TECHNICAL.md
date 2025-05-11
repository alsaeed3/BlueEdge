# BlueEdge Technical Documentation

This document provides detailed technical information about the BlueEdge interactive AI assistant project, focusing on the implementation details of individual components and their integration.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Component Documentation](#component-documentation)
3. [WebRTC Implementation](#webrtc-implementation)
4. [Animation System](#animation-system)
5. [Sound Integration](#sound-integration)
6. [AI Tool Calls](#ai-tool-calls)
7. [Styling](#styling)

## Project Structure

The BlueEdge project follows a standard Next.js application structure:

```
- public/       # Static assets
- src/
  - app/        # Next.js App Router pattern
    - api/      # API routes
    - lib/      # Configuration and utilities
    - page.tsx  # Main application entry point
  - components/ # React components
```

### Key Files

- `src/app/page.tsx`: Main application component with WebRTC logic
- `src/app/lib/config.ts`: Configuration for AI model and tools
- `src/components/AiSection.tsx`: Visual component orchestration
- `src/app/api/session/route.ts`: API endpoint for session management

## Component Documentation

### AiSection Component

The `AiSection` component is responsible for displaying the appropriate visual component based on the AI tool call. It uses Framer Motion for smooth transitions between different states.

```tsx
// Key properties
interface SceneProps {
  toolCall: ToolCall;
  isAISpeaking: boolean;
}

// State management
const [displayComponent, setDisplayComponent] = useState('')
const [message, setMessage] = useState('')

// Function call handling
useEffect(() => {
  if (!toolCall) return;
  
  // Parse arguments from toolCall
  // Switch between different display components based on tool name
}, [toolCall]);

// Component rendering with AnimatePresence for transitions
```

### Visual Components

#### Panorama360

A 360° panoramic viewer that allows users to look around virtual environments:

- Uses styled-components for custom styling
- Implements touch and mouse controls for navigation
- Supports hotspots for interactive points
- Dynamically changes scenes based on user interaction

#### InvestmentChart

A financial chart component that visualizes property investment projections:

- Uses Chart.js for data visualization
- Displays property value growth over time
- Accepts dynamic parameters for investment amounts, returns, etc.
- Features transparent background for better UI integration

#### Voucher

An interactive voucher display with animation effects:

- Features a visually appealing design with gradient backgrounds
- Includes a copy-to-clipboard function for voucher codes
- Displays car imagery that integrates with the voucher design
- Uses confetti animation for celebratory effects

#### EmailSent

A component that confirms document delivery:

- Features a large email icon
- Shows animation to indicate successful delivery
- Displays recipient email address
- Includes a resend button for retry functionality

#### PointsReward

An animated points counter with sound effects:

- Displays points being added with animated counter
- Features floating coins animation
- Includes progress bar toward next reward level
- Implements sound effects for coin addition
- Provides sound toggle functionality

#### WaveAvatar

A visual representation of the AI speaking:

- Animated waveform that responds to audio levels
- Provides visual feedback during AI speech
- Helps users understand when the AI is speaking

## WebRTC Implementation

The application uses WebRTC for real-time audio communication with the AI model:

```javascript
// Setting up WebRTC peer connection
const pc = new RTCPeerConnection();

// Setting up audio tracks
stream.getTracks().forEach((track) => {
  pc.addTrack(track, stream);
});

// Creating data channel for events
const dc = pc.createDataChannel("oai-events");

// Handle incoming audio for AI voice
pc.ontrack = (e) => {
  audioElement.current.srcObject = e.streams[0];
  // Setup audio analyzer
};
```

### Audio Analysis

The application analyzes incoming audio to detect when the AI is speaking:

```javascript
const analyzeAudio = () => {
  // Get frequency data from audio analyzer
  // Calculate average volume level
  // Normalize for visualization
  // Set speaking state based on threshold
};
```

## Animation System

The project uses Framer Motion for animations:

- `AnimatePresence` for component transitions
- Custom animation variants for different components
- Coordinated animations for multi-part components
- Bottom-to-top transitions for component entry

Example animation pattern:
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {/* Component content */}
</motion.div>
```

## Sound Integration

Sound effects are implemented using the Web Audio API:

```tsx
// Sound references
const coinAudioRef = useRef<HTMLAudioElement>(null);
const completeAudioRef = useRef<HTMLAudioElement>(null);

// Play sound function
const playCoinSound = () => {
  if (!soundEnabled) return;
  
  try {
    if (coinAudioRef.current) {
      coinAudioRef.current.currentTime = 0;
      coinAudioRef.current.play().catch(err => {
        console.error("Error playing sound:", err);
      });
    }
  } catch (error) {
    console.error("Error playing sound:", error);
  }
};
```

### Sound Files

- `coin-sound.mp3`: Used for points increment animation
- `complete-sound.mp3`: Used when animations complete

## AI Tool Calls

The AI can trigger various tool functions during conversation:

```typescript
// Tool call definition
interface ToolCall {
  name: string;
  arguments: any;
}

// Available tools
const TOOLS = [
  {
    type: "function",
    function: {
      name: "show_map",
      description: "Display a map of a specific location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The location to display on the map"
          }
        },
        required: ["location"]
      }
    }
  },
  // Additional tool definitions...
];
```

### Tool Call Handling

```typescript
// In AiSection component
switch (name) {
  case "show_map":
    setMessage("Here's the location you requested");
    setDisplayComponent('map');
    break;
  case "do_virtual_tour":
    setMessage("Let me show you a virtual tour of the property");
    setDisplayComponent('tour');
    break;
  // Additional cases...
}
```

## Styling

The project uses Tailwind CSS for styling, with some components using styled-components:

- Consistent color schemes across components
- Responsive design for different screen sizes
- Semi-transparent backgrounds for better integration
- Animation-friendly class structures

### Key Style Patterns

```tsx
// Tailwind example
<div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 backdrop-blur-md p-8 rounded-xl">
  {/* Content */}
</div>

// styled-components example
const PanoramaContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
`;
```

---

## Performance Considerations

- Audio handling is optimized to minimize latency
- Animations are hardware-accelerated where possible
- Component mounting/unmounting is managed efficiently
- Sound effects are throttled to prevent overlapping

## Accessibility

- Visual feedback accompanies audio responses
- Contrast ratios are maintained for readability
- Interactive elements have appropriate focus states
- Sound effects can be toggled off

---

*Technical documentation last updated: May 11, 2025*