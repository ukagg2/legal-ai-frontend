# Legal AI Frontend

A modern React frontend for the Legal AI Platform, featuring authentication, document management, AI-powered Q&A, and document generation.

## Features

- 🔐 **Authentication**: Secure login/register with JWT tokens
- 💬 **AI Chat**: Interactive legal Q&A with AI assistant
- 📄 **Document Generation**: AI-powered legal document creation
- 📁 **Document Management**: Upload, organize, and search documents
- 👤 **User Profile**: Account management and settings
- 🎨 **Modern UI**: Beautiful, responsive design with Lucide icons

## Tech Stack

- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

## Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Development

The frontend is configured to proxy API calls to the backend at `http://localhost:8000`. Make sure your backend is running before testing the frontend.

### Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts (Auth)
│   ├── pages/          # Page components
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
```

### Key Features

#### Authentication
- JWT-based authentication
- Protected routes
- Automatic token management
- User session persistence

#### AI Chat Interface
- Real-time chat with AI assistant
- Message history
- Loading states
- Error handling

#### Document Management
- File upload with drag & drop
- File listing and management
- Download and delete functionality
- Progress indicators

#### Document Generation
- Multiple document types
- Form-based generation
- Copy to clipboard
- Download generated documents

## API Integration

The frontend communicates with the backend API endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/ask/` - AI Q&A
- `POST /api/generate-document/` - Document generation
- `POST /api/upload/` - File upload
- `GET /api/upload/files` - List uploaded files

## Styling

The application uses custom CSS with a modern design system:

- **Color Scheme**: Purple gradient theme (#667eea to #764ba2)
- **Typography**: Inter font family
- **Components**: Card-based layout with shadows
- **Responsive**: Mobile-first design
- **Icons**: Lucide React icon library

## Deployment

The frontend can be deployed to any static hosting service:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

3. **Configure API proxy** for production deployment

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Test all features before committing
4. Update documentation as needed 
