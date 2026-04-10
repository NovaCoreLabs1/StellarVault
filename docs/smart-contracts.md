# Smart Contracts Specification - StellarVault

## Overview

StellarVault uses Soroban smart contracts written in Rust. The contract suite handles:
- Vault operations (deposits, withdrawals)
- Token management
- Payment processing

## Contracts

### 1. VaultContract

**Purpose**: Main vault functionality for asset management.

**Functions**:

#### `initialize(admin: Address)`
Initialize the vault with an admin address.

```rust
pub fn initialize(env: Env, admin: Address) -> Result<(), VaultError>
```

#### `deposit(user: Address, asset: Address, amount: i128) -> Result<i128, VaultError>`
Deposit assets into the vault.

```rust
pub fn deposit(
    env: Env,
    user: Address,
    asset: Address,
    amount: i128,
) -> Result<i128, VaultError>
```

**Returns**: Vault shares issued to user

**Events**: `DepositEvent { user, asset, amount, shares }`

#### `withdraw(user: Address, shares: i128) -> Result<i128, VaultError>`
Withdraw assets from the vault.

```rust
pub fn withdraw(
    env: Env,
    user: Address,
    shares: i128,
) -> Result<i128, VaultError>
```

**Returns**: Asset amount withdrawn

**Events**: `WithdrawEvent { user, asset, amount, shares }`

#### `balance(user: Address) -> i128`
Get user's vault balance in shares.

```rust
pub fn balance(env: Env, user: Address) -> i128
```

#### `asset_balance(user: Address, asset: Address) -> i128`
Get user's balance for specific asset.

```rust
pub fn asset_balance(env: Env, user: Address, asset: Address) -> i128
```

#### `total_assets() -> i128`
Get total assets in vault.

```rust
pub fn total_assets(env: Env) -> i128
```

#### `total_shares() -> i128`
Get total shares issued.

```rust
pub fn total_shares(env: Env) -> i128
```

#### `share_price(asset: Address) -> i128`
Get current share price (in units of 1e7).

```rust
pub fn share_price(env: Env, asset: Address) -> i128
```

---

### 2. TokenContract

**Purpose**: Custom token management and standards compliance.

**Standards**: Stellar Asset Contract (SAC) compatible

**Functions**:

#### `mint(to: Address, amount: i128) -> Result<(), TokenError>`
Mint new tokens.

```rust
pub fn mint(env: Env, to: Address, amount: i128) -> Result<(), TokenError>
```

**Requirements**: Only admin can mint

**Events**: `MintEvent { to, amount }`

#### `burn(from: Address, amount: i128) -> Result<(), TokenError>`
Burn tokens.

```rust
pub fn burn(env: Env, from: Address, amount: i128) -> Result<(), TokenError>
```

**Events**: `BurnEvent { from, amount }`

#### `transfer(from: Address, to: Address, amount: i128) -> Result<(), TokenError>`
Transfer tokens between accounts.

```rust
pub fn transfer(
    env: Env,
    from: Address,
    to: Address,
    amount: i128,
) -> Result<(), TokenError>
```

**Events**: `TransferEvent { from, to, amount }`

#### `approve(owner: Address, spender: Address, amount: i128)`
Approve spender to spend tokens on behalf of owner.

```rust
pub fn approve(
    env: Env,
    owner: Address,
    spender: Address,
    amount: i128,
)
```

#### `allowance(owner: Address, spender: Address) -> i128`
Get approved allowance.

```rust
pub fn allowance(env: Env, owner: Address, spender: Address) -> i128
```

#### `balance(owner: Address) -> i128`
Get account balance.

```rust
pub fn balance(env: Env, owner: Address) -> i128
```

#### `decimals() -> u32`
Get token decimals (typically 7).

```rust
pub fn decimals(env: Env) -> u32
```

---

### 3. PaymentContract

**Purpose**: Handle payments and payment channels.

**Functions**:

#### `create_payment(from: Address, to: Address, amount: i128, asset: Address) -> Result<PaymentId, PaymentError>`
Create a payment request.

```rust
pub fn create_payment(
    env: Env,
    from: Address,
    to: Address,
    amount: i128,
    asset: Address,
) -> Result<PaymentId, PaymentError>
```

**Returns**: Unique payment ID

**Events**: `PaymentCreatedEvent { from, to, amount, asset, payment_id }`

#### `execute_payment(payment_id: PaymentId) -> Result<(), PaymentError>`
Execute a payment.

```rust
pub fn execute_payment(env: Env, payment_id: PaymentId) -> Result<(), PaymentError>
```

**Events**: `PaymentExecutedEvent { payment_id }`

#### `cancel_payment(payment_id: PaymentId) -> Result<(), PaymentError>`
Cancel a pending payment.

```rust
pub fn cancel_payment(env: Env, payment_id: PaymentId) -> Result<(), PaymentError>
```

**Events**: `PaymentCancelledEvent { payment_id }`

#### `get_payment(payment_id: PaymentId) -> Result<Payment, PaymentError>`
Get payment details.

```rust
pub fn get_payment(env: Env, payment_id: PaymentId) -> Result<Payment, PaymentError>
```

**Returns**:
```rust
pub struct Payment {
    pub id: PaymentId,
    pub from: Address,
    pub to: Address,
    pub amount: i128,
    pub asset: Address,
    pub status: PaymentStatus, // Pending, Completed, Cancelled
    pub created_at: u64,
    pub executed_at: Option<u64>,
}
```

---

## Data Types

```rust
// Common error types
pub enum VaultError {
    InsufficientBalance,
    InvalidAmount,
    Unauthorized,
    ContractFailed,
}

pub enum TokenError {
    InsufficientBalance,
    InsufficientAllowance,
    Unauthorized,
}

pub enum PaymentError {
    InvalidPaymentId,
    InvalidStatus,
    InsufficientFunds,
    Unauthorized,
}

// Payment statuses
pub enum PaymentStatus {
    Pending = 0,
    Completed = 1,
    Cancelled = 2,
}
```

---

## Events

Contracts emit events for all significant state changes.

### Vault Events
```rust
pub struct DepositEvent {
    pub user: Address,
    pub asset: Address,
    pub amount: i128,
    pub shares: i128,
}

pub struct WithdrawEvent {
    pub user: Address,
    pub asset: Address,
    pub amount: i128,
    pub shares: i128,
}
```

### Token Events
```rust
pub struct MintEvent {
    pub to: Address,
    pub amount: i128,
}

pub struct BurnEvent {
    pub from: Address,
    pub amount: i128,
}

pub struct TransferEvent {
    pub from: Address,
    pub to: Address,
    pub amount: i128,
}
```

### Payment Events
```rust
pub struct PaymentCreatedEvent {
    pub from: Address,
    pub to: Address,
    pub amount: i128,
    pub asset: Address,
    pub payment_id: PaymentId,
}

pub struct PaymentExecutedEvent {
    pub payment_id: PaymentId,
}

pub struct PaymentCancelledEvent {
    pub payment_id: PaymentId,
}
```

---

## Testing

### Unit Tests
```bash
npm run test --filter=@stellar-vault/contracts
```

### Integration Tests
```bash
npm run test:e2e --filter=@stellar-vault/contracts
```

### Coverage
```bash
npm run test:coverage --filter=@stellar-vault/contracts
```

---

## Deployment

### Testnet
```bash
npm run publish:testnet --filter=@stellar-vault/contracts
```

### Mainnet
```bash
npm run publish:mainnet --filter=@stellar-vault/contracts
```

---

## Security Considerations

1. **Access Control**: Admin functions protected with signature verification
2. **Reentrancy**: No external calls in critical sections
3. **Overflow Protection**: i128 for all amounts to prevent overflow
4. **Rate Limiting**: Contracts include cooldown periods for sensitive operations
5. **Auditing**: All state changes logged as events

---

## Gas Optimization

1. **Minimal Storage**: Use efficient data structures
2. **Batch Operations**: Support batch deposits/withdrawals
3. **Lazy Evaluation**: Calculate share prices on-demand

---

## Upgrade Strategy

Smart contracts are immutable on-chain. To upgrade:

1. Deploy new contract with improved code
2. Migrate state to new contract
3. Update contract references in backend

---

## Integration with Backend

The backend communicates with smart contracts via Soroban RPC:

```typescript
// Example: Call vault deposit
const soroban = new SorobanRpc(SOROBAN_RPC_URL);
const result = await soroban.invoke({
  contractId: VAULT_CONTRACT_ID,
  method: 'deposit',
  parameters: [userAddress, assetId, amount],
});
```

---

## Monitoring

Monitor contract events for:
- Unusual deposit/withdrawal patterns
- Failed transactions
- State inconsistencies

Use Stellar Horizon API to track contract events.
