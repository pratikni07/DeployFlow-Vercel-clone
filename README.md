# 🚀 VerbalClone - A Vercel-like Deployment Platform

VerbalClone is a lightweight deployment platform inspired by Vercel that enables automatic builds and deployments from GitHub repositories. It provides real-time build logs and instant deployment URLs for your projects.

## 🌟 Features

- **Automated Deployments**: Simply provide a GitHub URL and watch your project deploy automatically
- **Real-time Build Logs**: Monitor your build progress with WebSocket-powered live logs
- **Custom Subdomains**: Each deployment gets its own unique subdomain
- **S3-powered Hosting**: Built projects are served through S3 for reliable content delivery
- **Containerized Builds**: Secure and isolated build environment using Docker
- **Microservices Architecture**: Modular design with separate services for different concerns

## 🏗️ Architecture

The platform consists of four main services:

1. **API Server** (Port 9000)
   - Handles incoming deployment requests
   - Manages ECS tasks for builds
   - Coordinates WebSocket connections for logs
   - Generates unique project slugs

2. **Build Server**
   - Runs in a Docker container
   - Clones GitHub repositories
   - Executes build commands
   - Uploads built assets to S3

3. **S3 Reverse Proxy** (Port 8000)
   - Routes requests to appropriate S3 paths
   - Handles subdomain-based routing
   - Serves static assets from deployments

4. **Frontend**
   - User interface for deployments
   - Displays real-time build logs
   - Shows deployment URLs

## 🛠️ Technical Stack

- **Backend**: Node.js with Express
- **Build Environment**: Ubuntu with Node.js 20
- **Cloud Services**: AWS (ECS, S3)
- **Real-time Communications**: Socket.IO
- **State Management**: Redis
- **Container Technology**: Docker
- **Frontend**: React

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- Docker
- AWS Account with ECS and S3 access
- Redis instance


### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/verbalclone.git
cd verbalclone
```

2. Install dependencies for each service:
```bash
# API Server
cd api-server
npm install

# S3 Reverse Proxy
cd ../s3-reverse-proxy
npm install

# Frontend
cd ../frontend
npm install
```

3. Build the Docker image for the build server:
```bash
cd ../build-server
docker build -t verbalclone-builder .
```

4. Start the services:
```bash
# Start API Server
cd ../api-server
npm start

# Start S3 Reverse Proxy
cd ../s3-reverse-proxy
npm start

# Start Frontend
cd ../frontend
npm start
```


