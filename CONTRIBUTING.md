# Contributing to StellarVault

Thank you for your interest in contributing to StellarVault! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Docker & Docker Compose
- Git
- GitHub CLI (for issue stuff)

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/NovaCoreLabs1/StellarVault.git
cd StellarVault

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start Docker services
docker-compose up -d

# Start development servers
npm run dev
```

## Development Workflow

### 1. Create a Feature Branch

```bash
# Create a new branch for your work
git checkout -b feature/issue-123

# Or for bug fixes
git checkout -b fix/issue-456

# Or for documentation
git checkout -b docs/update-api-spec
```

### 2. Make Your Changes

Follow the [code standards](#code-standards) while making changes.

```bash
# Edit files in your editor
code .

# Run tests frequently
npm run test

# Check your code
npm run lint
npm run format
npm run type-check
```

### 3. Commit Your Work

```bash
# Stage your changes
git add .

# Commit with a clear message linking to the issue
git commit -m "feat: Add feature description (#123)

- Detailed explanation of changes
- List key modifications
- Reference related issues"

# Push to your branch
git push origin feature/issue-123
```

### 4. Create a Pull Request

Create your PR on GitHub with:

**Title**: Clear, descriptive title
```
feat: Add feature name
fix: Fix bug description
docs: Update documentation
```

**Description**:
```markdown
## Description
Clear description of what changed and why.

## Related Issue
Closes #123

## Testing
- [x] Unit tests pass
- [x] Integration tests pass
- [x] Manual testing completed

## Checklist
- [x] Code follows style guide
- [x] Tests added/updated
- [x] Documentation updated
- [x] Self-review completed
```

### 5. Code Review

A maintainer will review your PR:
- Check code quality
- Verify tests pass
- Review against acceptance criteria
- Request changes or approve

Address any feedback and push updates.

### 6. Merge

Once approved:
```bash
# GitHub will merge your PR
# Issue automatically closes (with "Closes #123")
```

## Code Standards

### Naming Conventions

**Files**:
- Component files: `MyComponent.tsx`, `my-service.ts`
- Test files: `MyComponent.test.tsx`, `my-service.spec.ts`
- Utility files: `helpers.ts`, `validators.ts`

**Variables & Functions**:
- Use camelCase for variables: `const myVariable = ...`
- Use PascalCase for classes: `class MyClass {}`
- Use PascalCase for React components: `function MyComponent() {}`
- Use UPPER_SNAKE_CASE for constants: `const MAX_RETRIES = 3`

**Imports**:
```typescript
// 1. React/external libraries
import React from 'react';
import { SomeClass } from 'some-library';

// 2. Internal imports
import { MyComponent } from '@/components/MyComponent';
import { myHelper } from '@/utils/helpers';
```

### Code Style

All code is formatted with Prettier and linted with ESLint.

```bash
# Auto-format your code
npm run format

# Fix linting issues
npm run lint:fix

# Check before committing
npm run lint
npm run type-check
```

### TypeScript

Use strict TypeScript:

```typescript
// ✅ Good - types are explicit
interface User {
  id: string;
  email: string;
  name: string;
}

function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Avoid - implicit any
function processData(data: any) {
  // ...
}
```

### Comments & Documentation

```typescript
// Use single-line comments for brief notes
// Use multi-line for complex logic

/**
 * Clear function documentation
 * @param userId The user ID to fetch
 * @returns Promise with user data
 */
function getUser(userId: string): Promise<User> {
  // ...
}
```

### Testing

Write tests for new features:

```bash
# Run all tests
npm run test

# Run tests for specific package
npm run test --filter=@stellar-vault/backend

# Run with coverage
npm run test:coverage
```

**Test structure**:
```typescript
describe('MyComponent', () => {
  it('should render correctly', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('text')).toBeInTheDocument();
  });

  it('should handle user interaction', () => {
    const { getByRole } = render(<MyComponent />);
    fireEvent.click(getByRole('button'));
    expect(// assertion).toBe(true);
  });
});
```

## Project Structure

Understand where to make changes:

```
apps/
├── frontend/          # Next.js UI - Frontend work
├── backend/           # NestJS API - Backend work
└── contracts/         # Rust contracts - Contract work

packages/
├── ui/                # Shared components - UI work
├── types/             # Shared types - Type definitions
├── utils/             # Shared utilities - Helper functions
└── config/            # Shared configs - Configuration
```

## Commit Message Format

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance

**Example**:
```
feat(wallet): Add Freighter wallet integration

- Implement Freighter SDK integration
- Add wallet connection UI
- Handle transaction signing

Closes #123
```

## Acceptance Criteria

Before submitting a PR, verify:

- [ ] All tests pass locally
- [ ] No linting errors
- [ ] Code formatted correctly
- [ ] TypeScript compiles without errors
- [ ] PR links to related issue(s)
- [ ] Acceptance criteria from issue met
- [ ] Documentation updated
- [ ] No sensitive data in code

## Common Workflows

### Adding a New API Endpoint

1. Update Swagger/OpenAPI spec
2. Create service method
3. Create controller endpoint
4. Add validation with class-validator
5. Write tests
6. Update API documentation

```typescript
// Example backend endpoint
@Post('/api/v1/transactions/send')
@UseGuards(AuthGuard('jwt'))
async sendTransaction(
  @Body() dto: SendTransactionDto,
  @Request() req: any,
): Promise<TransactionResponse> {
  return this.transactionService.send(dto, req.user);
}
```

### Adding a Frontend Component

1. Create component file
2. Add TypeScript types
3. Implement component logic
4. Write tests
5. Add to component library if reusable

```typescript
// Example React component
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({
  label,
  onClick,
  variant = 'primary',
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
}
```

### Adding a Smart Contract Function

1. Write Rust code with proper error handling
2. Write unit tests
3. Document function signature
4. Update contract specification
5. Test integration with backend

```rust
pub fn deposit(
    env: Env,
    user: Address,
    asset: Address,
    amount: i128,
) -> Result<i128, VaultError> {
    // Implementation
}
```

## Getting Help

- **Questions**: Start a [GitHub Discussion](https://github.com/NovaCoreLabs1/StellarVault/discussions)
- **Issues**: Check [existing issues](https://github.com/NovaCoreLabs1/StellarVault/issues)
- **Documentation**: Read the [docs/](docs/) folder
- **Slack/Discord**: Join our community (link in README)

## Issue Selection

### Finding an Issue

1. Go to [Issues tab](https://github.com/NovaCoreLabs1/StellarVault/issues)
2. Filter by:
   - `good-first-issue` - Best for new contributors
   - `help-wanted` - High priority
   - Your area of expertise (frontend, backend, etc.)
3. Read the full issue and acceptance criteria
4. Ask clarifying questions if needed

### Assigning to Yourself

Comment on the issue:
```
I'd like to work on this issue.
```

A maintainer will assign it to you.

## Review Process

Your PR will be reviewed by:
- Code quality reviewers
- Domain experts
- Maintainers

**Review checklist**:
- Functionality works as described
- Code follows standards
- Tests are comprehensive
- Documentation is clear
- No security issues
- Performance is acceptable

## Merge & Deployment

Once approved:
- Your PR will be merged to main/develop
- Issue automatically closes
- GitHub Actions deploy changes
- Feature becomes available in next release

## Common Issues

### Build Failures

```bash
# Clean and reinstall
npm run clean
rm -rf node_modules
npm install
npm run build
```

### Linting Errors

```bash
# Auto-fix issues
npm run lint:fix
npm run format
```

### Test Failures

```bash
# Run tests with output
npm run test -- --verbose

# Run specific test file
npm run test -- MyComponent.test.tsx
```

### Git Conflicts

```bash
# Update branch
git fetch origin
git rebase origin/main

# Resolve conflicts in your editor
# Then continue
git rebase --continue
git push -f origin feature/my-feature
```

## Best Practices

### Documentation

- Document complex logic
- Update README for major changes
- Keep API spec current
- Add comments for non-obvious code

### Testing

- Write tests for new features
- Aim for 80%+ coverage
- Test edge cases
- Test error scenarios

### Performance

- Use Lighthouse for frontend
- Profile backend endpoints
- Optimize database queries
- Monitor bundle size

### Security

- No hardcoded secrets in code
- Validate all inputs
- Use environment variables
- Follow OWASP guidelines
- Run security scans

## Release Cycle

The project follows semantic versioning:

- **Major** (v2.0.0): Breaking changes
- **Minor** (v1.1.0): New features
- **Patch** (v1.0.1): Bug fixes

Releases happen:
- Regular: Every 2 weeks
- Hotfixes: As needed for critical bugs
- Stable: Once MVP features complete

## Recognition

Contributors are recognized in:
- [CONTRIBUTORS.md](CONTRIBUTORS.md)
- Release notes
- GitHub contributor graph
- Project documentation

## Contact

- **Email**: support@stellarvault.io
- **Discord**: [Join our server](link-coming-soon)
- **GitHub**: [Start a discussion](https://github.com/NovaCoreLabs1/StellarVault/discussions)

---

**Thank you for contributing to StellarVault! 🚀**

Your contributions help build the future of Web3 on Stellar!
