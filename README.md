# BlueEdge - Comprehensive Real Estate Platform

BlueEdge is a full-featured real estate platform consisting of two main components:
1. An interactive AI assistant with rich visual components for client engagement
2. A comprehensive admin dashboard for real estate professionals

## Project Overview

### Client-Facing Application
The client-facing application provides an immersive user experience by combining conversational AI with dynamic visual components. Users can have natural voice conversations with an AI assistant that responds verbally while displaying relevant visual information.

### Admin Dashboard
The admin dashboard helps real estate professionals manage properties, track potential clients, monitor key metrics, and leverage AI-powered insights to make data-driven decisions.

## Features

### Client-Facing Application
- Real-time voice conversations with AI via WebRTC
- Dynamic visual components that update based on conversation context
- Interactive maps, 360° virtual tours, and investment charts
- Promotional vouchers, email confirmations, and loyalty point animations
- Responsive design that works across devices

### Admin Dashboard
- Comprehensive dashboard with key performance indicators
- Property management system
- Tenant tracking and management
- Potential client management and engagement tools
- AI-powered insights and analytics
- Occupancy and revenue tracking

## Technology Stack

- **Next.js**: React framework for building both applications
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling components
- **Recharts**: For data visualization
- **WebRTC**: For real-time communication in the client app
- **Radix UI**: For accessible component primitives in the admin dashboard

## Prerequisites

- Node.js (v16 or newer)
- npm (v7 or newer)
- Git
- Modern web browser with WebRTC support (for client application)

## Getting Started

### Main Client Application

1. **Clone the repository**
   ```bash
   git clone https://github.com/alsaeed/BlueEdge.git
   ```

2. **Navigate to the repository directory**
   ```bash
   cd BlueEdge
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### Admin Dashboard

1. **Clone the repository** (if not already done)
   ```bash
   git clone https://github.com/alsaeed/BlueEdge.git
   ```

2. **Navigate to the admin dashboard directory**
   ```bash
   cd BlueEdge/admin-dashboard
   ```

3. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the dashboard**
   
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Architecture

### Client Application

#### Main Components
- **App (page.tsx)**: Main application logic and WebRTC handling
- **AiSection**: Controls which visual component to display based on AI tool calls
- **Visual Components**: 
  - [`Panorama360`](/src/components/Panorama360.tsx): Interactive 360° view for virtual property tours
  - [`InvestmentChart`](/src/components/InvestmentChart.tsx): Financial projection visualization
  - [`Voucher`](/src/components/Voucher.tsx): Interactive promotional voucher display
  - [`EmailSent`](/src/components/EmailSent.tsx): Document delivery confirmation
  - [`PointsReward`](/src/components/PointsReward.tsx): Animated loyalty points counter
  - [`WaveAvatar`](/src/components/WaveAvatar.tsx): Visual representation of AI speaking

#### Data Flow
1. User voice is captured and sent to the AI via WebRTC
2. AI processes the input and sends back audio response
3. AI can trigger tool calls (function calls) during conversation
4. Tool calls are processed by the front-end to display appropriate visual components
5. Visual components animate into view with smooth transitions

### Admin Dashboard

#### Main Components
- **Dashboard Layout**: Consistent layout with sidebar navigation and header
- **Dashboard Page**: Overview of key metrics and charts
- **Properties Management**: CRUD operations for real estate properties
- **Tenant Management**: Tracking tenant information and relationships
- **Client Management**: Potential client engagement and tracking
- **Analytics**: Data visualization and insights

## Tool Functions (Client Application)

The AI assistant can trigger various functions:

- `show_map`: Displays a location on a map
- `do_virtual_tour`: Shows a 360° virtual tour
- `send_contract`: Displays email confirmation
- `give_voucher`: Shows a promotional voucher
- `show_property_investment`: Displays property investment projections
- `add_points`: Shows animated reward points

## Customization

### Visual Themes

Components in both applications use Tailwind CSS for styling and can be customized by modifying the class names or theme variables in the respective `globals.css` files.

### AI Configuration (Client Application)

The AI behavior can be modified by updating the instructions and available tools in the `config.ts` file.

## Troubleshooting

### Admin Dashboard Issues
- Ensure all dependencies are correctly installed
- Check browser console for any errors
- Verify that the correct Next.js version is being used

### Client Application Audio Issues
- Ensure your browser has permission to access the microphone
- Check that no other application is using the microphone
- Try using headphones to avoid feedback

### Visual Component Display
- Check browser console for errors
- Ensure the correct function calls are being triggered
- Verify that all required assets are available

## License

[MIT](LICENSE)

## Contributing

# Contributors

Team: BlueEdge

Members:
    Ali Saeed
    Ahmed Salem
    Aarif
    Mohammed Khedr
    Simon


Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

*This documentation is current as of May 11, 2025*
