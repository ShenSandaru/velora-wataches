# Velora Watches Project

Welcome to the Velora Watches web application repository! This project contains both the frontend and backend codebases. Please follow the instructions below to get started and collaborate effectively.

## Cloning the Repository

We recommend using the **GitHub Desktop** app for all git operations (clone, merge, push, etc.).

1. **Open GitHub in your browser and navigate to this repository.**
2. **Click the green `<>Code` button** and select `Open with GitHub Desktop`.
3. **Choose a location on your computer** to save the project and click `Clone`.

> Using GitHub Desktop makes it easy to manage branches, commits, merges, and pushes during development.

---

## Project Structure

```
BackEnd/    # Backend code (API, server, etc.)
FrontEnd/   # Frontend code (React app)
```

- For frontend setup and details, see [`FrontEnd/Velora_Watches/README.md`](FrontEnd/Velora_Watches/README.md)
- For backend setup, add a `README.md` in the `BackEnd/` directory.

---

## Getting Started

### Frontend

1. Open a terminal and navigate to the frontend directory:
   ```sh
   cd FrontEnd/Velora_Watches
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The app will be available at http://localhost:5173

### Backend

1. Open a terminal and navigate to the backend directory:
   ```sh
   cd BackEnd
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   ```sh
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your actual values (MongoDB URI, JWT secret, etc.)
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
   The API will be available at http://localhost:5000

> **⚠️ SECURITY NOTE:** Never commit your `.env` file to version control. If you've accidentally committed sensitive information, change your credentials immediately.

---

## Collaboration Guidelines

- Use **GitHub Desktop** for all git operations (clone, branch, commit, merge, push, pull, etc.).
- Always pull the latest changes before starting new work.
- Commit frequently with clear messages.
- Push your changes and create pull requests for review.

---

For any questions, contact the project maintainer.
