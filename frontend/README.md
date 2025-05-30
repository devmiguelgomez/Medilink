# MediLink Frontend

This is the frontend application for the MediLink healthcare management platform. It's built with React, Vite, Material-UI, and Redux Toolkit.

## Features

- User authentication (login/register)
- Role-based access control (Patient, Doctor, Admin)
- Appointment scheduling and management
- Medical records management
- Electronic prescriptions
- User profile management
- Responsive design for all devices

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see backend README for setup)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd medilink/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add the following:
```
VITE_API_URL=http://localhost:5000
```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build files will be created in the `dist` directory.

## Project Structure

```
src/
├── app/              # Redux store configuration
├── components/       # Reusable components
├── features/         # Redux slices and features
├── pages/           # Page components
├── theme.js         # Material-UI theme configuration
├── App.jsx          # Main application component
└── main.jsx         # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
