# Velora Watches Backend

This is the backend service for the Velora Watches e-commerce platform.

## Setup Instructions

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB

### Installation

1. Clone the repository (if not done already)
2. Install dependencies
```bash
npm install
```

### Environment Setup

1. Copy the example environment file
```bash
cp .env.example .env
```

2. Edit the `.env` file with your actual values:
   - Set your MongoDB connection string
   - Set a secure JWT secret
   - Configure other environment variables as needed

> **⚠️ SECURITY WARNING**: Never commit your `.env` file to Git! It contains sensitive information that should be kept private.

### Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Project Structure

- `src/` - Source code
  - `config/` - Configuration files
  - `controllers/` - Request handlers
  - `middleware/` - Custom middleware
  - `models/` - Database models
  - `routers/` - API routes
  - `services/` - Business logic
  - `utils/` - Helper functions
- `uploads/` - User uploaded files
- `tests/` - Test files

## Security Best Practices

1. **Environment Variables**:
   - Always use `.env.example` as a template with placeholders
   - Keep real credentials in `.env` (not in version control)
   - Rotate credentials that have been exposed

2. **Database Security**:
   - Use strong, unique passwords for database users
   - Restrict database permissions to only what's needed
   - Consider IP whitelist for database access

3. **API Security**:
   - All sensitive routes should require authentication
   - Use HTTPS in production
   - Validate all user inputs