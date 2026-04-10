# API Specification - StellarVault Backend

## Base URL
```
Development: http://localhost:3001/api/v1
Production: https://api.stellarvault.io/api/v1
```

## Authentication
All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## Authentication Endpoints

### POST /auth/register
Create a new user account.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response** (201):
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### POST /auth/login
Authenticate user and get JWT token.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response** (200):
```json
{
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token",
  "expiresIn": 86400
}
```

### POST /auth/refresh
Refresh access token.

**Request Body**:
```json
{
  "refreshToken": "refresh_token"
}
```

**Response** (200):
```json
{
  "accessToken": "new_jwt_token",
  "expiresIn": 86400
}
```

---

## User Endpoints

### GET /users/me
Get current user profile.

**Response** (200):
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "profileImage": "url",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### PUT /users/me
Update user profile.

**Request Body**:
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "profileImage": "url"
}
```

**Response** (200): Updated user object

### DELETE /users/me
Delete user account.

**Response** (204): No content

---

## Wallet Endpoints

### GET /wallets
Get all user wallets.

**Response** (200):
```json
[
  {
    "id": "uuid",
    "address": "GXXXXXX...",
    "name": "Main Wallet",
    "balance": "1000.50",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### POST /wallets
Add new wallet.

**Request Body**:
```json
{
  "address": "GXXXXXX...",
  "name": "Trading Wallet"
}
```

**Response** (201): Wallet object

### GET /wallets/:id
Get specific wallet details.

**Response** (200): Wallet object

### PUT /wallets/:id
Update wallet.

**Request Body**:
```json
{
  "name": "Updated Wallet Name"
}
```

**Response** (200): Updated wallet object

### DELETE /wallets/:id
Remove wallet.

**Response** (204): No content

---

## Asset Endpoints

### GET /assets
Get all assets in user wallets.

**Query Parameters**:
- `walletId`: Filter by wallet
- `sortBy`: Sort field (balance, name)
- `order`: asc or desc

**Response** (200):
```json
[
  {
    "id": "uuid",
    "walletId": "uuid",
    "code": "USDC",
    "issuer": "GXXXXXX...",
    "balance": "500.00",
    "nativeBalance": "100.50"
  }
]
```

### GET /assets/:id
Get asset details.

**Response** (200): Asset object

---

## Transaction Endpoints

### GET /transactions
Get transaction history.

**Query Parameters**:
- `walletId`: Filter by wallet
- `from`: Start date (ISO 8601)
- `to`: End date (ISO 8601)
- `status`: pending, completed, failed
- `page`: Pagination
- `limit`: Items per page

**Response** (200):
```json
{
  "data": [
    {
      "id": "uuid",
      "walletId": "uuid",
      "type": "send",
      "asset": "USDC",
      "amount": "100.00",
      "recipient": "GXXXXXX...",
      "status": "completed",
      "hash": "tx_hash",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

### POST /transactions/send
Send assets to another wallet.

**Request Body**:
```json
{
  "walletId": "uuid",
  "asset": "USDC",
  "amount": "100.00",
  "recipient": "GXXXXXX...",
  "memo": "Payment for services"
}
```

**Response** (202):
```json
{
  "id": "uuid",
  "status": "pending",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### GET /transactions/:id
Get transaction details.

**Response** (200): Transaction object

---

## Smart Contract Endpoints

### GET /contracts
Get deployed contracts.

**Response** (200):
```json
[
  {
    "id": "uuid",
    "name": "Vault",
    "address": "CXXXXXX...",
    "network": "testnet",
    "version": "1.0.0",
    "status": "active"
  }
]
```

### POST /contracts/:id/invoke
Invoke smart contract function.

**Request Body**:
```json
{
  "function": "deposit",
  "params": {
    "amount": "1000.00",
    "asset": "USDC"
  }
}
```

**Response** (202):
```json
{
  "invocationId": "uuid",
  "status": "pending"
}
```

### GET /contracts/:id/state
Get contract state.

**Response** (200):
```json
{
  "totalDeposits": "50000.00",
  "totalUsers": 150,
  "lastUpdate": "2024-01-01T00:00:00Z"
}
```

---

## Notification Endpoints

### GET /notifications
Get user notifications.

**Query Parameters**:
- `unreadOnly`: boolean
- `type`: transaction, security, system

**Response** (200):
```json
[
  {
    "id": "uuid",
    "type": "transaction",
    "title": "Transaction Confirmed",
    "message": "Your transaction has been confirmed",
    "read": false,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### PUT /notifications/:id/read
Mark notification as read.

**Response** (200): Updated notification

### PUT /notifications/read-all
Mark all notifications as read.

**Response** (200): Count updated

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Invalid token"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Wallet not found"
}
```

### 429 Too Many Requests
```json
{
  "statusCode": 429,
  "message": "Too many requests",
  "retryAfter": 60
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "requestId": "uuid"
}
```

---

## Rate Limiting

- **Default**: 100 requests per 15 minutes per IP
- **Authenticated**: 1000 requests per hour per user
- **Public Endpoints**: 50 requests per 15 minutes

Rate limit info in response headers:
- `X-RateLimit-Limit`: Total requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Reset timestamp

---

## Pagination

All list endpoints support pagination:

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

**Response Format**:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

## Webhooks

Webhooks notify your application of events in real-time.

### Webhook Events
- `transaction.created`
- `transaction.completed`
- `transaction.failed`
- `wallet.created`
- `contract.invoked`

### Setting Up Webhooks
**POST /webhooks**:
```json
{
  "url": "https://your-domain.com/webhook",
  "events": ["transaction.completed", "transaction.failed"],
  "secret": "webhook_secret"
}
```

### Webhook Payload
```json
{
  "id": "webhook_id",
  "event": "transaction.completed",
  "timestamp": "2024-01-01T00:00:00Z",
  "data": {
    "transaction_id": "uuid",
    "status": "completed"
  },
  "signature": "hmac_signature"
}
```

---

## Changelog

### Version 1.0.0
- Initial API release
- Auth endpoints
- Wallet management
- Transaction history
- Contract interaction
