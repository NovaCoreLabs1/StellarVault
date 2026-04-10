# StellarVault 🚀

A production-ready Web3 application built on the Stellar ecosystem featuring smart contracts, a robust API backend, and a modern web interface.

**Organization**: NovaCore Labs  
**Repository**: [NovaCoreLabs1/StellarVault](https://github.com/NovaCoreLabs1/StellarVault)  
**Status**: Active Development

---

## 📋 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Docker & Docker Compose (for containerized development)
- Rust & Cargo (for smart contracts)
- Soroban CLI (for contract deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/NovaCoreLabs1/StellarVault.git
cd StellarVault

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your values

# Start development environment
docker-compose up

# In another terminal, run dev server
npm run dev

# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
```

### Development Commands

```bash
# Install dependencies
npm install

# Development mode (watch all packages)
npm run dev

# Build all packages
npm run build

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run format
npm run format:check

# Type checking
npm run type-check

# Clean build artifacts
npm run clean
```

---

## 📁 Project Structure

```
StellarVault/
├── apps/
│   ├── frontend/          # Next.js web application
│   ├── backend/           # NestJS API server
│   └── contracts/         # Soroban smart contracts (Rust)
├── packages/
│   ├── ui/                # Shared React components
│   ├── config/            # Shared configurations
│   ├── types/             # Shared TypeScript types
│   └── utils/             # Shared utilities
├── infra/
│   ├── docker/            # Dockerfile configurations
│   ├── ci/                # GitHub Actions workflows
│   └── scripts/           # Automation scripts
├── docs/
│   ├── architecture.md    # Architecture overview
│   ├── api-spec.md        # API documentation
│   └── smart-contracts.md # Smart contract specs
├── .github/
│   └── workflows/         # CI/CD pipelines
├── docker-compose.yml     # Development environment
├── turbo.json             # Turborepo configuration
└── .env.example           # Environment variable template
```

---

## 🏗️ Architecture

### Technology Stack

**Frontend**:
- Next.js 14
- React 18
- TypeScript
- Zustand (State Management)
- Axios (HTTP Client)
- Stellar JS SDK

**Backend**:
- NestJS
- Express
- PostgreSQL
- Redis
- TypeORM
- JWT Authentication

**Smart Contracts**:
- Rust
- Soroban SDK
- Stellar Network

**DevOps**:
- Turborepo (Monorepo)
- Docker & Docker Compose
- GitHub Actions
- ESLint & Prettier
- TypeScript

### Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│           Frontend (Next.js - Port 3000)        │
└────────────┬────────────────────────────────────┘
             │ HTTP/REST
┌────────────▼────────────────────────────────────┐
│          Backend API (NestJS - Port 3001)       │
├────────────────┬───────────────────────────────┤
│ Auth | Wallet  │ Transaction | Contract        │
│ User | Asset   │ Notification | Queue          │
└────────┬───────┴────────┬──────────────────────┘
         │                │
    ┌────▼────┐      ┌────▼────┐
    │PostgreSQL│      │  Redis  │
    │ Database │      │  Cache  │
    └──────────┘      └─────────┘

         Stellar Blockchain / Soroban
    ┌──────────────────────────────────────┐
    │ Smart Contracts (Rust - Soroban)    │
    │ ├─ VaultContract                    │
    │ ├─ TokenContract                    │
    │ └─ PaymentContract                  │
    └──────────────────────────────────────┘
```

For detailed architecture, see [docs/architecture.md](docs/architecture.md).

---

## 🔌 API Documentation

The backend provides RESTful APIs for:

- **Authentication**: User registration, login, token refresh
- **Wallet Management**: Add, manage, and track wallets
- **Assets**: Track and manage digital assets
- **Transactions**: Send, receive, and track transactions
- **Smart Contracts**: Invoke and monitor contract interactions
- **Notifications**: Real-time user notifications
- **Webhooks**: Event-driven integrations

Full API documentation: [docs/api-spec.md](docs/api-spec.md)

---

## ⛓️ Smart Contracts

The application uses three main smart contracts:

1. **VaultContract**: Core vault functionality (deposits, withdrawals, balance tracking)
2. **TokenContract**: Custom token management (mint, burn, transfer, approve)
3. **PaymentContract**: Payment processing and payment channels

For detailed contract specifications: [docs/smart-contracts.md](docs/smart-contracts.md)

---

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Test with Coverage
```bash
npm run test:coverage
```

### E2E Tests
```bash
npm run test:e2e
```

Test files are located alongside source files as `*.test.ts` or `*.spec.ts`.

---

## 🚀 Deployment

### Development
```bash
docker-compose up
npm run dev
```

### Production Build
```bash
npm run build
npm run start --filter=@stellar-vault/frontend
npm run start --filter=@stellar-vault/backend
```

### Docker Deployment
```bash
docker-compose -f docker-compose.yml up -d
```

### Kubernetes (Coming Soon)
- Helm charts for Kubernetes deployment
- Scalable infrastructure
- Auto-scaling and load balancing

---

## 🔐 Security

- JWT-based authentication
- CORS protection
- Rate limiting on API endpoints
- Environment variable isolation
- Smart contract audited for security
- Password hashing with bcrypt
- Input validation and sanitization

---

## 📊 Monitoring & Observability

- **Error Tracking**: Sentry integration (optional)
- **Application Metrics**: Performance monitoring
- **Database Monitoring**: Query performance tracking
- **Health Checks**: `/health` endpoint on backend
- **Logging**: Structured logging with levels (debug, info, warn, error)

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes
4. **Test** your changes (`npm run test`)
5. **Follow** code style (`npm run format && npm run lint`)
6. **Commit** with clear messages
7. **Push** to your branch
8. **Open** a Pull Request

### Code Standards

- **Linting**: ESLint configuration enforced
- **Formatting**: Prettier for consistent code style
- **Type Safety**: Strict TypeScript configuration
- **Testing**: Maintain 80%+ code coverage
- **Documentation**: Update docs for new features

See [GitHub Issues](https://github.com/NovaCoreLabs1/StellarVault/issues) for tasks and features to work on.

---

## 📚 Documentation

- **[Architecture](docs/architecture.md)** - System design and technology stack
- **[API Specification](docs/api-spec.md)** - Complete API reference with examples
- **[Smart Contracts](docs/smart-contracts.md)** - Contract specifications and functions

---

## 🐛 Issue Tracking

Track and contribute to development:

- [GitHub Issues](https://github.com/NovaCoreLabs1/StellarVault/issues)
- [Issue Board](https://github.com/NovaCoreLabs1/StellarVault/projects)
- [Discussions](https://github.com/NovaCoreLabs1/StellarVault/discussions)

---

## 📞 Support & Community

- **Discussions**: GitHub Discussions for questions and ideas
- **Issues**: Report bugs and request features via GitHub Issues
- **Documentation**: Check [docs/](docs/) for detailed information
- **Email**: support@stellarvault.io

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Stellar Development Foundation
- Soroban Smart Contract Platform
- NestJS Community
- Next.js Community
- All contributors and supporters

---

## 🗺️ Roadmap

### Phase 1: MVP (Current)
- ✅ Project setup and monorepo configuration
- ✅ Core smart contracts
- ⏳ Basic wallet integration
- ⏳ Transaction management
- ⏳ Simple UI interface

### Phase 2: Enhancement
- Advanced wallet features
- Multi-signature wallets
- DeFi integrations
- Enhanced UI/UX
- Mobile app

### Phase 3: Scale
- Payment gateway integration
- Advanced analytics
- API marketplace
- SDK distribution
- Enterprise features

---

**Built with ❤️ by [NovaCore Labs](https://novacorelabs.com)**