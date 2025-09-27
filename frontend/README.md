# Dharma Connect Frontend

A React + Vite application for virtual spiritual experiences, temple exploration, and community connection.

## Features

- 🏛️ Virtual temple and pandal tours
- 📺 Live streaming of religious ceremonies
- 💬 Real-time chat during live events
- 🙏 Prayer requests and community features
- 💰 Secure donation system
- 👥 User profiles and role-based access
- 📱 Responsive design for all devices

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Radix UI** - Accessible components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

The app will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   └── ui/           # Base UI components (buttons, cards, etc.)
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and contexts
│   └── app/              # App-specific components
├── index.html            # Main HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env.local` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Contributing

1. Follow the existing code style
2. Use meaningful component and variable names
3. Add comments for complex logic
4. Test your changes thoroughly
