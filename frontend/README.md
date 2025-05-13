# AI Chat Frontend

A simple Next.js frontend for interacting with the OpenAI Chat API.

## Getting Started

First, make sure you have Node.js installed on your system.

### Installation

```bash
# Install dependencies
npm install
```

### Running the Development Server

```bash
# Start the frontend development server
npm run dev
```

This will start the Next.js development server on [http://localhost:3000](http://localhost:3000).

### Backend Server

Make sure the backend FastAPI server is running at http://localhost:8000 before trying to send messages. To start the backend server:

```bash
# From the root of the project
cd api
pip install -r requirements.txt
uvicorn app:app --reload
```

## Build and Deploy

To build the application for production:

```bash
npm run build
```

Then, you can start the production server:

```bash
npm run start
```

## Deploying on Vercel

This project is designed to be deployed on Vercel. Simply push to your GitHub repository and connect it to Vercel for automatic deployments.