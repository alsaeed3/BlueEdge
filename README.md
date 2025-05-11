# BlueEdge - Interactive AI Assistant with Visual Components

BlueEdge is a Next.js application that provides an interactive AI assistant experience with rich visual components. The system uses real-time audio communication to enable natural conversations with users while displaying contextually relevant visual information.

![BlueEdge](https://placeholder-for-project-screenshot.com)

## Overview

BlueEdge creates an immersive user experience by combining conversational AI with dynamic visual components. When users ask questions or request information, the AI assistant not only responds verbally but also displays relevant visual elements such as:

- Interactive maps
- Property virtual tours
- Investment projection charts
- Promotional vouchers
- Email confirmations
- Loyalty point animations

## Features

- Real-time voice conversations with AI
- Dynamic visual components that update based on conversation context
- WebRTC-based audio streaming
- Animated transitions between different visual states
- Sound effects for interactive elements
- Responsive design that works across devices

## Core Components

### AI Communication

The application uses WebRTC to establish a real-time communication channel with an AI model. This enables:

- Low-latency audio streaming
- Tool function calls triggered by conversation
- Event-based messaging for state synchronization

### Visual Components

The system includes several visual components that can be displayed in response to user queries:

- **Maps**: Shows locations when users ask about geographic information
- **Virtual Tours**: 360° panoramic views of properties
- **Investment Charts**: Displays property investment projections and financial data
- **Vouchers**: Promotional offers with interactive elements
- **Email Notifications**: Confirmation of sent documents
- **Points Reward**: Animated display of loyalty points with sound effects

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- Modern web browser with WebRTC support

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd blue-edge
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Click the session toggle button to start an AI conversation
2. Speak naturally to the AI assistant
3. The assistant will respond verbally and display relevant visual content
4. Visual components will animate smoothly between different states
5. Interact with displayed components as needed

## Architecture

### Main Components

- **App (page.tsx)**: Main application logic and WebRTC handling
- **AiSection**: Controls which visual component to display based on AI tool calls
- **Visual Components**: 
  - `Panorama360`: Interactive 360° view for virtual property tours
  - `InvestmentChart`: Financial projection visualization
  - `Voucher`: Interactive promotional voucher display
  - `EmailSent`: Document delivery confirmation
  - `PointsReward`: Animated loyalty points counter with sound effects
  - `WaveAvatar`: Visual representation of AI speaking

### Data Flow

1. User voice is captured and sent to the AI via WebRTC
2. AI processes the input and sends back audio response
3. AI can trigger tool calls (function calls) during conversation
4. Tool calls are processed by the front-end to display appropriate visual components
5. Visual components animate into view with smooth transitions
6. User can continue conversation while viewing the visual information

## API Integration

The application connects to:

- AI model API via WebRTC for conversation
- Map services for location display
- Optional backend services for data retrieval

## Tool Functions

The AI assistant can trigger various functions:

- `show_map`: Displays a location on a map
- `do_virtual_tour`: Shows a 360° virtual tour
- `send_contract`: Displays email confirmation
- `give_voucher`: Shows a promotional voucher
- `show_property_investment`: Displays property investment projections
- `add_points`: Shows animated reward points

## Customization

### Visual Themes

Components use Tailwind CSS for styling and can be customized by modifying the class names.

### AI Configuration

The AI behavior can be modified by updating the instructions and available tools in the `config.ts` file.

## Troubleshooting

### Audio Issues

If you experience audio problems:
- Ensure your browser has permission to access the microphone
- Check that no other application is using the microphone
- Try using headphones to avoid feedback

### Visual Component Display

If visual components aren't displaying:
- Check browser console for errors
- Ensure the correct function calls are being triggered
- Verify that all required assets are available

## License

[License Information]

## Contributing

[Contribution Guidelines]

---

*This documentation is current as of May 11, 2025*
