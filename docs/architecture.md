# StellarVault - Architecture Overview

## Project Structure

### Applications (`apps/`)

#### Frontend (`apps/frontend`)
- **Framework**: Next.js 14 with TypeScript
- **Purpose**: Web interface for StellarVault
- **Key Features**:
  - Wallet integration (Freighter, Ledger, Trezor)
  - Asset management dashboard
  - Transaction interface
  - Portfolio analytics

#### Backend API (`apps/backend`)
- **Framework**: NestJS with TypeScript
- **Purpose**: RESTful API backend
- **Key Features**:
  - User authentication and authorization
  - Wallet management
  - Transaction handling
  - Soroban contract interactions
  - Rate limiting and caching

#### Smart Contracts (`apps/contracts`)
- **Language**: Rust (Soroban)
- **Purpose**: On-chain smart contracts
- **Key Contracts**:
  - VaultContract: Main vault functionality
  - TokenContract: Custom token management
  - PaymentContract: Payment processing

### Shared Packages (`packages/`)

#### UI Components (`packages/ui`)
- Reusable React components
- Button, Modal, Form, Card, etc.
- Shared styling and theming

#### Configuration (`packages/config`)
- ESLint configurations
- TypeScript base configurations
- Shared environment types

#### Types (`packages/types`)
- Shared TypeScript interfaces
- API response types
- Database models

#### Utilities (`packages/utils`)
- Helper functions
- Stellar SDK wrappers
- Validation utilities
- Date/time utilities

### Infrastructure (`infra/`)

#### Docker (`infra/docker`)
- Dockerfile.frontend
- Dockerfile.backend
- docker-compose.yml

#### CI/CD (`infra/ci`)
- GitHub Actions workflows
- Build configuration
- Deployment scripts

#### Scripts (`infra/scripts`)
- Database migration scripts
- Seed scripts
- Utility automation scripts

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                     │
│              (3000) User Interface & Wallet Integration      │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST
┌──────────────────────▼──────────────────────────────────────┐
│                    Backend API (NestJS)                       │
│              (3001) Business Logic & Data Layer               │
├──────────────────────┬──────────────────────────────────────┤
│  ├─ Auth Service                                              │
│  ├─ User Service                                              │
│  ├─ Wallet Service                                            │
│  ├─ Transaction Service                                       │
│  ├─ Soroban Contract Service                                  │
│  └─ Notification Service                                      │
└──────────────┬───────────────────────────┬──────────────────┘
               │                           │
    ┌──────────▼──────────┐    ┌──────────▼──────────┐
    │  PostgreSQL (5432)  │    │    Redis (6379)     │
    │   Data Persistence  │    │   Caching & Queue   │
    └─────────────────────┘    └─────────────────────┘

       Stellar Blockchain / Soroban Network
    ┌──────────────────────────────────────────────┐
    │  ├─ VaultContract (Asset Management)          │
    │  ├─ TokenContract (Token Standards)           │
    │  └─ PaymentContract (Transactions)            │
    └──────────────────────────────────────────────┘
```

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Zustand, Axios
- **Backend**: NestJS, Express, TypeORM, PostgreSQL
- **Smart Contracts**: Rust, Soroban SDK
- **Cache**: Redis
- **Build**: Turborepo, TypeScript, ESLint, Prettier
- **Testing**: Jest, Vitest, Testing Library
- **CI/CD**: GitHub Actions, Docker
- **Monitoring**: Sentry, DataDog

## Development Workflow

1. Create a new branch from `main` or `develop`
2. Make changes across monorepo
3. Run `npm run lint` and `npm run format` to fix code style
4. Run `npm run test` to ensure tests pass
5. Push changes and create a Pull Request
6. GitHub Actions will run linting, testing, and building
7. Once approved, merge to main for production deployment

## Database Schema

Key entities:
- **Users**: User accounts and profiles
- **Wallets**: User wallet addresses
- **Assets**: Tracked assets and balances
- **Transactions**: Transaction history
- **Contracts**: Deployed contract metadata

## API Endpoints

See [api-spec.md](./api-spec.md) for detailed API documentation.

## Smart Contract Specifications

See [smart-contracts.md](./smart-contracts.md) for detailed contract documentation.

## Deployment

### Development
```bash
docker-compose up
```

### Production
- Push to `main` branch
- GitHub Actions automatically builds and deploys
- Monitor deployments in GitHub Actions tab

## Environment Variables

See [.env.example](../.env.example) for all required environment variables.

## Contributing

1. Follow the development workflow above
2. Ensure all tests pass locally
3. Update documentation for significant changes
4. Follow commit message conventions

## Monitoring and Logging

- Application logs: Docker logs
- Error tracking: Sentry integration
- Performance: Datadog APM
- Health checks: `/health` endpoint on backend

## Security Considerations

- All API endpoints require authentication
- JWT tokens for session management
- Rate limiting on public endpoints
- Smart contracts audited before mainnet deployment
- Environment variables for sensitive data
- CORS configuration for cross-origin requests

## Support and Documentation

- Architecture: [This document](./architecture.md)
- API Specification: [api-spec.md](./api-spec.md)
- Smart Contracts: [smart-contracts.md](./smart-contracts.md)
- Setup Guide: [../README.md](../README.md)
