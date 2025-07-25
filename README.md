# YubYuYi - Durian Supply Chain Management System

A comprehensive supply chain management system for durian tracking from farm to consumer using Next.js, Node.js, and MongoDB.

## 🏗️ Architecture

- **Frontend**: Next.js 15.3.3 (React) - Port 3000
- **Backend**: Node.js/Express - Port 8000  
- **Database**: MongoDB 7.0 - Port 27017
- **Containerization**: Docker & Docker Compose

## 🚀 Quick Start for DevOps

### 1. Clone Repository

```bash
git clone https://github.com/Takinsen/YubYuYi.git
cd YubYuYi
```

### 2. Environment Configuration

Create environment files for production deployment:

#### Create `tan/.env` (Backend specific):
```bash
FRONTEND_URL = <Your_Deployment_Frontend_URL>
```

#### Create `mark/.env.local` (Frontend specific):
```bash
NEXT_PUBLIC_API_URL = <Your_Deployment_Backend_URL>
```

### 3. Production Deployment

#### Option A: Quick Deploy (Development/Testing)
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

#### Option B: Production Deploy with Custom Environment
```bash
# Build images
docker-compose build --no-cache

# Start services in production mode
docker-compose up -d

# Monitor startup
docker-compose logs -f mongodb
docker-compose logs -f backend  
docker-compose logs -f frontend
```

## 🔧 Configuration Details

### Database Initialization

The system automatically creates initial data on first startup:

- **Users**: 5 predefined users with different roles (farmer, house, transport, border, ministry)
- **Farms**: 2 sample farms with GAP certifications
- **Houses**: 1 sample trading house
- **Collections**: All necessary MongoDB collections with indexes

### Default Users for Testing

| Username | Password | Role | Description |
|----------|----------|------|-------------|
| durian | (hashed) | farmer | Farm management |
| durianhouse | (hashed) | house | Trading house operations |
| duriantransport | (hashed) | transport | Transportation tracking |
| durianchina | (hashed) | border | Border control |
| durianthai | (hashed) | ministry | Ministry oversight |

*Note: Passwords are 123456.*

### Port Configuration

| Service | Internal Port | External Port | Purpose |
|---------|---------------|---------------|---------|
| Frontend | 3000 | 3000 | Web interface |
| Backend | 8000 | 8000 | REST API |
| MongoDB | 27017 | 27017 | Database |

