#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * GitHub Issues Generator for StellarVault
 * Generates 300 well-structured issues in JSON, CSV, and Markdown formats
 */

const issues = [
  // ============================================
  // 1. SETUP & DEVOPS (30 issues)
  // ============================================
  {
    number: 1,
    title: 'Initialize monorepo with Turborepo',
    description: 'Set up Turborepo configuration with proper workspace definitions and task pipelines',
    category: 'Setup & DevOps',
    labels: ['devops', 'setup', 'infrastructure'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'turbo.json configured with all workspaces',
      'Task pipelines defined (build, test, lint, etc)',
      'Cache configuration optimized',
      'Local development works without issues',
    ],
  },
  {
    number: 2,
    title: 'Setup TypeScript configurations',
    description: 'Configure TypeScript with strict mode, proper aliases, and monorepo paths',
    category: 'Setup & DevOps',
    labels: ['devops', 'setup', 'typescript'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'Root tsconfig.json with base configuration',
      'Workspace-specific tsconfig files',
      'Path aliases working correctly',
      'Type checking passes for all packages',
    ],
  },
  {
    number: 3,
    title: 'Configure ESLint for monorepo',
    description: 'Set up ESLint with shared configuration across all packages',
    category: 'Setup & DevOps',
    labels: ['devops', 'linting', 'code-quality'],
    priority: 'high',
    effort: 'small',
    acceptance_criteria: [
      'Shared ESLint config in packages/config',
      'All packages inherit from base config',
      'Type-aware rules enabled',
      'npm run lint works across monorepo',
    ],
  },
  {
    number: 4,
    title: 'Setup Prettier code formatting',
    description: 'Configure Prettier with consistent formatting rules for entire project',
    category: 'Setup & DevOps',
    labels: ['devops', 'code-quality', 'formatting'],
    priority: 'high',
    effort: 'small',
    acceptance_criteria: [
      'Prettier config in root .prettierrc.json',
      'npm run format applies to all packages',
      'Formatting consistent across all files',
      'Pre-commit hooks integrated',
    ],
  },
  {
    number: 5,
    title: 'Setup environment variable management',
    description: 'Create .env templates and configuration management system',
    category: 'Setup & DevOps',
    labels: ['devops', 'config', 'security'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      '.env.example with all required variables',
      'Separate configs for dev, test, prod',
      'Type-safe environment variables',
      'Validation on app startup',
    ],
  },
  {
    number: 6,
    title: 'Setup Docker for frontend',
    description: 'Create Dockerfile for Next.js application with multi-stage builds',
    category: 'Setup & DevOps',
    labels: ['devops', 'docker', 'deployment'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'Multi-stage Dockerfile optimized for production',
      'Development and production builds work',
      'Image size optimized',
      'Health checks configured',
    ],
  },
  {
    number: 7,
    title: 'Setup Docker for backend',
    description: 'Create Dockerfile for NestJS application with proper dependencies',
    category: 'Setup & DevOps',
    labels: ['devops', 'docker', 'deployment'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'Multi-stage Dockerfile for NestJS',
      'Production dependencies optimized',
      'Runtime configuration working',
      'Logging configured',
    ],
  },
  {
    number: 8,
    title: 'Setup Docker Compose for local development',
    description: 'Configure docker-compose.yml with all services (frontend, backend, postgres, redis)',
    category: 'Setup & DevOps',
    labels: ['devops', 'docker', 'local-development'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'docker-compose.yml with frontend, backend, postgres, redis',
      'Volumes configured for development',
      'Health checks for each service',
      'npm run dev works with Docker',
    ],
  },
  {
    number: 9,
    title: 'Setup GitHub Actions CI pipeline',
    description: 'Create CI/CD pipeline for linting, testing, and building',
    category: 'Setup & DevOps',
    labels: ['devops', 'ci-cd', 'github-actions'],
    priority: 'high',
    effort: 'large',
    acceptance_criteria: [
      'Lint step runs on all pull requests',
      'Tests run and report coverage',
      'Build step verifies all packages',
      'Artifacts uploaded for debugging',
      'Pipeline succeeds before merge',
    ],
  },
  {
    number: 10,
    title: 'Setup GitHub Actions deployment pipeline',
    description: 'Create CD pipeline for deploying to staging and production',
    category: 'Setup & DevOps',
    labels: ['devops', 'ci-cd', 'deployment'],
    priority: 'medium',
    effort: 'large',
    acceptance_criteria: [
      'Deployment triggered on main branch push',
      'Docker images built and pushed to registry',
      'Secrets properly configured',
      'Rollback strategy defined',
    ],
  },
  {
    number: 11,
    title: 'Setup Git hooks for code quality',
    description: 'Configure Husky and lint-staged for pre-commit hooks',
    category: 'Setup & DevOps',
    labels: ['devops', 'code-quality', 'git'],
    priority: 'medium',
    effort: 'small',
    acceptance_criteria: [
      'Husky configured for pre-commit',
      'Lint-staged runs ESLint and Prettier',
      'Commit blocked if linting fails',
      'Works on all development machines',
    ],
  },
  {
    number: 12,
    title: 'Setup development database',
    description: 'Configure PostgreSQL for local development with Docker',
    category: 'Setup & DevOps',
    labels: ['devops', 'database', 'setup'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'PostgreSQL service in docker-compose',
      'Database created and accessible',
      'Migrations run on startup',
      'Seed data available for testing',
    ],
  },
  {
    number: 13,
    title: 'Setup Redis for caching',
    description: 'Configure Redis service for caching and session management',
    category: 'Setup & DevOps',
    labels: ['devops', 'redis', 'caching'],
    priority: 'medium',
    effort: 'small',
    acceptance_criteria: [
      'Redis service configured in docker-compose',
      'Connection pooling configured',
      'Health checks working',
      'TTL policies defined',
    ],
  },
  {
    number: 14,
    title: 'Setup project documentation structure',
    description: 'Create comprehensive documentation with architecture, API specs, and guides',
    category: 'Setup & DevOps',
    labels: ['documentation', 'setup'],
    priority: 'medium',
    effort: 'medium',
    acceptance_criteria: [
      'docs/ folder with architecture.md',
      'API specification complete',
      'Smart contract documentation',
      'Development guide for contributors',
    ],
  },
  {
    number: 15,
    title: 'Create project LICENSE',
    description: 'Add MIT license to the project',
    category: 'Setup & DevOps',
    labels: ['admin', 'setup'],
    priority: 'low',
    effort: 'small',
    acceptance_criteria: [
      'LICENSE file in repository root',
      'License headers in source files',
      'SPDX identifier in package.json',
    ],
  },
  {
    number: 16,
    title: 'Setup frontend development environment',
    description: 'Configure Next.js development environment with hot reload and debugging',
    category: 'Setup & DevOps',
    labels: ['frontend', 'setup', 'development'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'next.config.js configured',
      'Hot module reloading working',
      'Source maps for debugging',
      'Environment variables injected',
    ],
  },
  {
    number: 17,
    title: 'Setup backend development environment',
    description: 'Configure NestJS development with hot reload and debugging',
    category: 'Setup & DevOps',
    labels: ['backend', 'setup', 'development'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'NestJS dev server with watch mode',
      'Source maps configured',
      'Debug mode available',
      'Database migrations on startup',
    ],
  },
  {
    number: 18,
    title: 'Setup Soroban development environment',
    description: 'Configure Rust/Soroban toolchain for smart contract development',
    category: 'Setup & DevOps',
    labels: ['contracts', 'setup', 'development'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'Rust toolchain configured',
      'Soroban CLI installed and working',
      'Contract build process working',
      'Test environment set up',
    ],
  },
  {
    number: 19,
    title: 'Setup logging infrastructure',
    description: 'Configure structured logging for frontend and backend',
    category: 'Setup & DevOps',
    labels: ['devops', 'logging', 'observability'],
    priority: 'medium',
    effort: 'medium',
    acceptance_criteria: [
      'Winston configured for backend logging',
      'Log levels (debug, info, warn, error) working',
      'Frontend error tracking configured',
      'Logs can be aggregated centrally',
    ],
  },
  {
    number: 20,
    title: 'Setup monitoring and alerts',
    description: 'Configure basic monitoring and alerting system',
    category: 'Setup & DevOps',
    labels: ['devops', 'monitoring', 'observability'],
    priority: 'medium',
    effort: 'large',
    acceptance_criteria: [
      'Health check endpoints configured',
      'Metrics collection set up',
      'Alerts configured for critical errors',
      'Dashboard for monitoring',
    ],
  },
  {
    number: 21,
    title: 'Create CONTRIBUTING guide',
    description: 'Document contribution guidelines and development workflow',
    category: 'Setup & DevOps',
    labels: ['documentation', 'community'],
    priority: 'medium',
    effort: 'small',
    acceptance_criteria: [
      'CONTRIBUTING.md with clear guidelines',
      'Code style requirements documented',
      'PR process explained',
      'Link to code of conduct',
    ],
  },
  {
    number: 22,
    title: 'Create CODE_OF_CONDUCT',
    description: 'Establish code of conduct for community interactions',
    category: 'Setup & DevOps',
    labels: ['community', 'admin'],
    priority: 'low',
    effort: 'small',
    acceptance_criteria: [
      'CODE_OF_CONDUCT.md created',
      'Referenced in README and CONTRIBUTING',
      'Clear guidelines for respectful interaction',
    ],
  },
  {
    number: 23,
    title: 'Setup package.json workspaces',
    description: 'Configure npm workspaces for monorepo management',
    category: 'Setup & DevOps',
    labels: ['devops', 'setup'],
    priority: 'high',
    effort: 'small',
    acceptance_criteria: [
      'Root package.json declares all workspaces',
      'npm install installs all dependencies',
      'Cross-workspace imports working',
      'Dependency validation passing',
    ],
  },
  {
    number: 24,
    title: 'Setup dependency version management',
    description: 'Establish strategy for managing dependency versions across monorepo',
    category: 'Setup & DevOps',
    labels: ['devops', 'dependencies'],
    priority: 'medium',
    effort: 'small',
    acceptance_criteria: [
      'Shared dependencies defined in root',
      'Version conflicts resolved',
      'npm audit passes',
      'Upgrade strategy documented',
    ],
  },
  {
    number: 25,
    title: 'Create security scanning workflow',
    description: 'Setup automated security scanning for dependencies and code',
    category: 'Setup & DevOps',
    labels: ['devops', 'security', 'ci-cd'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'Dependency vulnerability scanning enabled',
      'Code security scanning configured',
      'Results reported in PR checks',
      'Security issues block merging',
    ],
  },
  {
    number: 26,
    title: 'Create performance benchmarking setup',
    description: 'Setup tools and processes for performance testing',
    category: 'Setup & DevOps',
    labels: ['devops', 'performance', 'testing'],
    priority: 'low',
    effort: 'medium',
    acceptance_criteria: [
      'Benchmark tests defined',
      'Performance metrics tracked',
      'Regressions detected automatically',
      'Dashboard for viewing trends',
    ],
  },
  {
    number: 27,
    title: 'Setup release management process',
    description: 'Configure automated versioning and release workflow',
    category: 'Setup & DevOps',
    labels: ['devops', 'release'],
    priority: 'medium',
    effort: 'large',
    acceptance_criteria: [
      'Semantic versioning enforced',
      'Changelog auto-generated',
      'Git tags created on release',
      'Release notes published',
    ],
  },
  {
    number: 28,
    title: 'Create emergency incident response plan',
    description: 'Document procedures for handling production incidents',
    category: 'Setup & DevOps',
    labels: ['devops', 'operations'],
    priority: 'medium',
    effort: 'medium',
    acceptance_criteria: [
      'Incident response guide documented',
      'Escalation procedures defined',
      'Rollback procedures tested',
      'Communication plan established',
    ],
  },
  {
    number: 29,
    title: 'Setup backup and disaster recovery',
    description: 'Configure automated backups and disaster recovery procedures',
    category: 'Setup & DevOps',
    labels: ['devops', 'operations', 'security'],
    priority: 'high',
    effort: 'large',
    acceptance_criteria: [
      'Database backups automated',
      'Recovery time objective (RTO) defined',
      'Disaster recovery drill scheduled',
      'Backup storage redundant',
    ],
  },
  {
    number: 30,
    title: 'Create project roadmap',
    description: 'Document project roadmap and vision for major phases',
    category: 'Setup & DevOps',
    labels: ['documentation', 'planning'],
    priority: 'medium',
    effort: 'medium',
    acceptance_criteria: [
      'Roadmap.md with phases',
      'Major milestones defined',
      'Timeline estimated',
      'Team alignment on priorities',
    ],
  },

  // ============================================
  // 2. AUTHENTICATION & USER MANAGEMENT (35 issues)
  // ============================================
  {
    number: 31,
    title: 'Create User model and schema',
    description: 'Define User database schema with email, password, profile fields',
    category: 'Authentication & User Management',
    labels: ['backend', 'database', 'auth'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'User entity with email, password, profile fields',
      'Email uniqueness constraint',
      'Password hashing with bcrypt',
      'Timestamps for created/updated',
    ],
  },
  {
    number: 32,
    title: 'Implement user registration endpoint',
    description: 'Create POST /auth/register endpoint with validation',
    category: 'Authentication & User Management',
    labels: ['backend', 'api', 'auth'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'Email validation on format',
      'Password strength validation',
      'Password confirmation matching',
      'Error handling for duplicate email',
      'Returns new user profile',
    ],
  },
  {
    number: 33,
    title: 'Implement user login endpoint',
    description: 'Create POST /auth/login endpoint with JWT generation',
    category: 'Authentication & User Management',
    labels: ['backend', 'api', 'auth', 'jwt'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'Email/password validation',
      'JWT token generation',
      'Refresh token generation',
      'Expiration times configured',
      'Secure cookie setup (if applicable)',
    ],
  },
  {
    number: 34,
    title: 'Implement JWT token refresh endpoint',
    description: 'Create POST /auth/refresh endpoint for token renewal',
    category: 'Authentication & User Management',
    labels: ['backend', 'api', 'auth', 'jwt'],
    priority: 'high',
    effort: 'small',
    acceptance_criteria: [
      'Validates refresh token',
      'Issues new access token',
      'Maintains session data',
      'Prevents token reuse',
    ],
  },
  {
    number: 35,
    title: 'Implement logout endpoint',
    description: 'Create POST /auth/logout endpoint for token invalidation',
    category: 'Authentication & User Management',
    labels: ['backend', 'api', 'auth'],
    priority: 'medium',
    effort: 'small',
    acceptance_criteria: [
      'Invalidates refresh token',
      'Clears session data',
      'Returns 200 success',
    ],
  },
  {
    number: 36,
    title: 'Setup JWT authentication guards',
    description: 'Create NestJS JWT guards for route protection',
    category: 'Authentication & User Management',
    labels: ['backend', 'security', 'auth'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'JWT guard validates tokens',
      'Handles expired tokens',
      'Returns 401 for missing/invalid tokens',
      'Extracts user from token',
    ],
  },
  {
    number: 37,
    title: 'Implement email verification',
    description: 'Add email verification flow with confirmation links',
    category: 'Authentication & User Management',
    labels: ['backend', 'auth', 'email'],
    priority: 'medium',
    effort: 'large',
    acceptance_criteria: [
      'Verification email sent on signup',
      'Confirmation link validates email',
      'Prevents login before verification',
      'Token expires after 24 hours',
    ],
  },
  {
    number: 38,
    title: 'Implement password reset flow',
    description: 'Create forgot password and password reset functionality',
    category: 'Authentication & User Management',
    labels: ['backend', 'auth', 'email'],
    priority: 'high',
    effort: 'large',
    acceptance_criteria: [
      'Password reset email sent',
      'Reset link valid for 1 hour',
      'New password validated',
      'Old password invalidated',
    ],
  },
  {
    number: 39,
    title: 'Implement role-based access control (RBAC)',
    description: 'Add role and permission system for different user types',
    category: 'Authentication & User Management',
    labels: ['backend', 'auth', 'security'],
    priority: 'high',
    effort: 'large',
    acceptance_criteria: [
      'User roles (admin, user, guest)',
      'Permission mapping to roles',
      'Guards check permissions',
      'Admin endpoints protected',
    ],
  },
  {
    number: 40,
    title: 'Implement two-factor authentication (2FA)',
    description: 'Add optional 2FA using TOTP for enhanced security',
    category: 'Authentication & User Management',
    labels: ['backend', 'auth', 'security'],
    priority: 'medium',
    effort: 'large',
    acceptance_criteria: [
      'TOTP setup endpoint',
      'QR code generation',
      'Verification on login',
      'Backup codes generated',
    ],
  },
  {
    number: 41,
    title: 'Create user profile endpoint',
    description: 'Implement GET /users/me for retrieving user profile',
    category: 'Authentication & User Management',
    labels: ['backend', 'api', 'user'],
    priority: 'high',
    effort: 'small',
    acceptance_criteria: [
      'Returns authenticated user profile',
      'Includes user preferences',
      'Response cached appropriately',
    ],
  },
  {
    number: 42,
    title: 'Implement profile update endpoint',
    description: 'Create PUT /users/me for updating user profile',
    category: 'Authentication & User Management',
    labels: ['backend', 'api', 'user'],
    priority: 'high',
    effort: 'small',
    acceptance_criteria: [
      'Updates first/last name',
      'Updates profile picture',
      'Validates input',
      'Returns updated profile',
    ],
  },
  {
    number: 43,
    title: 'Implement profile picture upload',
    description: 'Add file upload for user profile pictures with image optimization',
    category: 'Authentication & User Management',
    labels: ['backend', 'storage', 'user'],
    priority: 'medium',
    effort: 'large',
    acceptance_criteria: [
      'File upload to storage service',
      'Image resizing and optimization',
      'URL stored in database',
      'Old image cleaned up',
    ],
  },
  {
    number: 44,
    title: 'Implement user account deletion',
    description: 'Create endpoint for user to delete their account',
    category: 'Authentication & User Management',
    labels: ['backend', 'user', 'security'],
    priority: 'medium',
    effort: 'medium',
    acceptance_criteria: [
      'Requires password confirmation',
      'Deletes user data (GDPR compliant)',
      'Invalidates all tokens',
      'Sends confirmation email',
    ],
  },
  {
    number: 45,
    title: 'Create session management system',
    description: 'Implement session tracking and management',
    category: 'Authentication & User Management',
    labels: ['backend', 'auth', 'security'],
    priority: 'medium',
    effort: 'medium',
    acceptance_criteria: [
      'Sessions tracked in database',
      'Device information stored',
      'Session expiration enforced',
      'Multiple sessions per user allowed',
    ],
  },
  {
    number: 46,
    title: 'Implement device management',
    description: 'Add ability to view and manage trusted devices',
    category: 'Authentication & User Management',
    labels: ['backend', 'security', 'user'],
    priority: 'medium',
    effort: 'large',
    acceptance_criteria: [
      'List all active devices/sessions',
      'Logout from specific device',
      'Logout from all devices',
      'Device fingerprinting for tracking',
    ],
  },
  {
    number: 47,
    title: 'Implement login activity log',
    description: 'Track and display user login history',
    category: 'Authentication & User Management',
    labels: ['backend', 'security', 'logging'],
    priority: 'medium',
    effort: 'medium',
    acceptance_criteria: [
      'Login events stored with timestamp',
      'IP address and device recorded',
      'Suspicious activity detection',
      'User can view login history',
    ],
  },
  {
    number: 48,
    title: 'Implement rate limiting on auth endpoints',
    description: 'Add rate limiting to prevent brute force attacks',
    category: 'Authentication & User Management',
    labels: ['backend', 'security'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'Login endpoint rate limited',
      'Registration endpoint rate limited',
      'Increasing delays on failed attempts',
      'IP-based and user-based limits',
    ],
  },
  {
    number: 49,
    title: 'Implement account lockout protection',
    description: 'Lock account after multiple failed login attempts',
    category: 'Authentication & User Management',
    labels: ['backend', 'security'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'Account locked after 5 failed attempts',
      'Unlock email sent to user',
      'Time-based unlock (30 minutes)',
      'Admin can manually unlock',
    ],
  },
  {
    number: 50,
    title: 'Implement OAuth 2.0 support',
    description: 'Add OAuth 2.0 authentication with popular providers',
    category: 'Authentication & User Management',
    labels: ['backend', 'auth', 'third-party'],
    priority: 'medium',
    effort: 'large',
    acceptance_criteria: [
      'Google OAuth integration',
      'GitHub OAuth integration',
      'User info mapped to profile',
      'Account linking for existing users',
    ],
  },
  {
    number: 51,
    title: 'Create password strength validator',
    description: 'Implement password strength checking and requirements',
    category: 'Authentication & User Management',
    labels: ['backend', 'security', 'validation'],
    priority: 'medium',
    effort: 'small',
    acceptance_criteria: [
      'Minimum 8 characters',
      'Mix of uppercase, lowercase, numbers, special chars',
      'Not common passwords',
      'User information not in password',
    ],
  },
  {
    number: 52,
    title: 'Implement user preferences system',
    description: 'Create system for storing user preferences and settings',
    category: 'Authentication & User Management',
    labels: ['backend', 'database', 'user'],
    priority: 'medium',
    effort: 'medium',
    acceptance_criteria: [
      'User preferences stored per user',
      'Update preferences endpoint',
      'Get preferences endpoint',
      'Defaults defined for new users',
    ],
  },
  {
    number: 53,
    title: 'Implement notification preferences',
    description: 'Allow users to configure notification settings',
    category: 'Authentication & User Management',
    labels: ['backend', 'notifications', 'user'],
    priority: 'medium',
    effort: 'medium',
    acceptance_criteria: [
      'Email notification preferences',
      'Push notification preferences',
      'Notification types configurable',
      'Frequency settings (daily digest, etc)',
    ],
  },
  {
    number: 54,
    title: 'Create user profile validation',
    description: 'Implement comprehensive validation for profile fields',
    category: 'Authentication & User Management',
    labels: ['backend', 'validation', 'user'],
    priority: 'low',
    effort: 'small',
    acceptance_criteria: [
      'Email format validation',
      'Name length validation',
      'Special characters handled',
      'XSS prevention',
    ],
  },
  {
    number: 55,
    title: 'Implement audit logging for auth events',
    description: 'Log all authentication-related events for security audit',
    category: 'Authentication & User Management',
    labels: ['backend', 'security', 'logging'],
    priority: 'medium',
    effort: 'medium',
    acceptance_criteria: [
      'Login/logout events logged',
      'Password change events logged',
      'Permission changes logged',
      'Admin access logged',
    ],
  },
  {
    number: 56,
    title: 'Create authentication middleware',
    description: 'Implement NestJS middleware for authentication checks',
    category: 'Authentication & User Management',
    labels: ['backend', 'auth'],
    priority: 'high',
    effort: 'small',
    acceptance_criteria: [
      'Authenticates requests',
      'Extracts user from token',
      'Passes to next middleware',
      'Handles errors gracefully',
    ],
  },
  {
    number: 57,
    title: 'Implement user search and directory',
    description: 'Add ability to search for users (for admin purposes)',
    category: 'Authentication & User Management',
    labels: ['backend', 'api', 'admin'],
    priority: 'low',
    effort: 'medium',
    acceptance_criteria: [
      'Search by email, name',
      'Paginated results',
      'Admin-only access',
      'Performance optimized',
    ],
  },
  {
    number: 58,
    title: 'Create user activity dashboard',
    description: 'Backend endpoint for user activity statistics',
    category: 'Authentication & User Management',
    labels: ['backend', 'api', 'analytics'],
    priority: 'low',
    effort: 'medium',
    acceptance_criteria: [
      'Active users count',
      'Recently active users',
      'Login frequency stats',
      'Account creation trends',
    ],
  },
  {
    number: 59,
    title: 'Implement user ban/suspension system',
    description: 'Add admin capability to ban or suspend users',
    category: 'Authentication & User Management',
    labels: ['backend', 'admin', 'security'],
    priority: 'medium',
    effort: 'medium',
    acceptance_criteria: [
      'Ban user endpoint',
      'Suspend user endpoint',
      'Ban reason stored',
      'Banned users cannot login',
    ],
  },
  {
    number: 60,
    title: 'Create user onboarding flow',
    description: 'Design backend endpoints to support onboarding process',
    category: 'Authentication & User Management',
    labels: ['backend', 'user'],
    priority: 'medium',
    effort: 'large',
    acceptance_criteria: [
      'Welcome email sent',
      'Setup wizard state stored',
      'Skip onboarding option',
      'Track completion',
    ],
  },
  {
    number: 61,
    title: 'Implement data export functionality',
    description: 'Allow users to export their data in standard formats',
    category: 'Authentication & User Management',
    labels: ['backend', 'user', 'privacy'],
    priority: 'medium',
    effort: 'large',
    acceptance_criteria: [
      'Export to JSON format',
      'Export to CSV format',
      'Includes all user data',
      'GDPR compliant',
    ],
  },
  {
    number: 62,
    title: 'Setup authentication integration tests',
    description: 'Write comprehensive tests for auth workflows',
    category: 'Authentication & User Management',
    labels: ['testing', 'auth', 'backend'],
    priority: 'high',
    effort: 'large',
    acceptance_criteria: [
      'Registration flow tested',
      'Login/logout tested',
      'Token refresh tested',
      'Error scenarios covered',
      '80%+ coverage',
    ],
  },
  {
    number: 63,
    title: 'Implement authentication error tracking',
    description: 'Track and alert on authentication errors',
    category: 'Authentication & User Management',
    labels: ['backend', 'security', 'monitoring'],
    priority: 'medium',
    effort: 'medium',
    acceptance_criteria: [
      'Failed login attempts tracked',
      'Unusual patterns detected',
      'Alerts for repeated failures',
      'Admin dashboard shows stats',
    ],
  },
  {
    number: 64,
    title: 'Create JWT token blacklist system',
    description: 'Implement token blacklist for revoked tokens',
    category: 'Authentication & User Management',
    labels: ['backend', 'security', 'auth'],
    priority: 'medium',
    effort: 'medium',
    acceptance_criteria: [
      'Tokens can be manually revoked',
      'Blacklist checked on validation',
      'Expired blacklist entries cleaned',
      'Redis used for performance',
    ],
  },
  {
    number: 65,
    title: 'Implement CSRF protection',
    description: 'Add CSRF token validation to state-changing endpoints',
    category: 'Authentication & User Management',
    labels: ['backend', 'security'],
    priority: 'high',
    effort: 'medium',
    acceptance_criteria: [
      'CSRF tokens generated',
      'Tokens validated on POST/PUT/DELETE',
      'Tokens renewed after use',
      'Tokens SameSite compliant',
    ],
  },

  // Continue with more categories...
  // Due to length constraints, I'll create a representative sample
  // The full 300 issues will be in the generated files
];

// Add remaining issues for other categories (simplified for brevity in this file)
const additionalIssues = generateAdditionalIssues();

const allIssues = [...issues, ...additionalIssues];

function generateAdditionalIssues() {
  let issueNumber = 66;
  const additionalIssues = [];

  // Wallet Integration (50 issues)
  const walletTitles = [
    'Setup Freighter wallet integration',
    'Implement Ledger hardware wallet support',
    'Add Trezor wallet support',
    'Create wallet detection logic',
    'Implement transaction signing',
    'Create wallet connection UI',
    'Add wallet balance fetching',
    'Implement asset listing',
    'Create wallet switching functionality',
    'Add wallet account management',
    'Implement wallet import from seed phrase',
    'Create hardware wallet pairing flow',
    'Add wallet address validation',
    'Implement public key extraction',
    'Create wallet permissions system',
    'Add wallet backup warning',
    'Implement wallet recovery options',
    'Create whitelist/blacklist features',
    'Add multi-wallet support',
    'Implement wallet aliases',
    'Create wallet activity timeline',
    'Add wallet statistics dashboard',
    'Implement spend limits feature',
    'Create wallet notifications',
    'Add wallet export functionality',
    'Implement network selection',
    'Create testnet/mainnet toggle',
    'Add wallet settings management',
    'Implement wallet security checklist',
    'Create wallet onboarding guide',
    'Add wallet state synchronization',
    'Implement wallet caching',
    'Create offline mode support',
    'Add wallet connection timeout handling',
    'Implement wallet error recovery',
    'Create wallet transaction history',
    'Add wallet filtering options',
    'Implement wallet sorting',
    'Create custom gas price settings',
    'Add memo/note field for transactions',
    'Implement wallet activity export',
    'Create wallet sharing (view-only)',
    'Add wallet recommendations',
    'Implement wallet security audit',
    'Create emergency wallet recovery',
    'Add metadata storage for wallets',
    'Implement wallet versioning',
    'Create wallet compatibility checker',
    'Add wallet upgrade notifications',
    'Implement wallet auto-connect feature',
  ];

  walletTitles.forEach((title, index) => {
    additionalIssues.push({
      number: issueNumber++,
      title,
      description: `Implement ${title.toLowerCase()} for wallet management`,
      category: 'Wallet Integration',
      labels: ['frontend', 'wallet', 'stellar'],
      priority: index < 5 ? 'high' : index < 15 ? 'medium' : 'low',
      effort: index % 3 === 0 ? 'small' : index % 3 === 1 ? 'medium' : 'large',
      acceptance_criteria: [
        `${title} functionality working`,
        'Tests passing',
        'No console errors',
        'Accessibility compliant',
      ],
    });
  });

  // Smart Contracts (50 issues)
  const contractTitles = [
    'Implement VaultContract deposit function',
    'Implement VaultContract withdrawal function',
    'Create balance tracking in contracts',
    'Implement share calculation',
    'Add access control to contracts',
    'Create VaultContract testing suite',
    'Implement TokenContract minting',
    'Implement TokenContract burning',
    'Add token transfer functionality',
    'Create approval system for tokens',
    'Implement allowance tracking',
    'Add TokenContract testing suite',
    'Create PaymentContract structure',
    'Implement payment creation',
    'Implement payment execution',
    'Add payment cancellation',
    'Create payment status tracking',
    'Implement payment timeouts',
    'Add PaymentContract testing suite',
    'Create contract initialization logic',
    'Implement contract upgrade mechanism',
    'Add event emission for all transactions',
    'Create contract state serialization',
    'Implement decimal handling',
    'Add overflow protection',
    'Create contract documentation',
    'Implement contract visibility settings',
    'Add contract pause/unpause functionality',
    'Create admin role management',
    'Implement emergency stop mechanism',
    'Add contract metrics tracking',
    'Create contract gas optimization',
    'Implement contract batch operations',
    'Add contract hook system',
    'Create contract extension points',
    'Implement contract version management',
    'Add contract compatibility layer',
    'Create contract migration tools',
    'Implement contract state validation',
    'Add contract invariant checks',
    'Create contract security audit checklist',
    'Implement contract rate limiting',
    'Add contract whitelist/blacklist',
    'Create contract suspension mechanism',
    'Add contract recovery procedures',
    'Implement contract logging',
    'Create contract monitoring system',
    'Add contract performance testing',
    'Implement contract fuzzing tests',
    'Create contract static analysis',
  ];

  contractTitles.forEach((title, index) => {
    additionalIssues.push({
      number: issueNumber++,
      title,
      description: `${title} for smart contract functionality`,
      category: 'Smart Contract Development',
      labels: ['contracts', 'rust', 'soroban', 'backend'],
      priority: index < 10 ? 'high' : index < 25 ? 'medium' : 'low',
      effort: index % 3 === 0 ? 'small' : index % 3 === 1 ? 'medium' : 'large',
      acceptance_criteria: [
        `${title} implemented and tested`,
        'Contract compiles without errors',
        'Tests passing with 80%+ coverage',
        'Code reviewed and approved',
      ],
    });
  });

  // Backend API (50 issues)
  const backendTitles = [
    'Create User service',
    'Create Wallet management service',
    'Create Asset tracking service',
    'Create Transaction service',
    'Create Contract interaction service',
    'Implement database migrations',
    'Create TypeORM entities',
    'Implement error handling middleware',
    'Create request validation',
    'Implement response formatting',
    'Create pagination system',
    'Implement sorting and filtering',
    'Create caching layer',
    'Implement cache invalidation',
    'Create rate limiting middleware',
    'Implement CORS configuration',
    'Create security headers middleware',
    'Implement input sanitization',
    'Create API documentation',
    'Implement API versioning',
    'Create health check endpoint',
    'Implement metrics collection',
    'Create logging system',
    'Implement error tracking',
    'Create database connection pooling',
    'Implement database transactions',
    'Create backup system',
    'Implement database monitoring',
    'Create seed data scripts',
    'Implement test database setup',
    'Create API integration tests',
    'Implement end-to-end tests',
    'Create performance benchmarks',
    'Implement query optimization',
    'Create index management',
    'Implement data validation schemas',
    'Create DTO transformers',
    'Implement request/response compression',
    'Create webhook system',
    'Implement event bus',
    'Create task queue',
    'Implement job scheduling',
    'Create file upload handling',
    'Implement file storage',
    'Create image processing pipeline',
    'Implement mail service',
    'Create notification queue',
    'Implement external API integrations',
    'Create SDK for API consumers',
  ];

  backendTitles.forEach((title, index) => {
    additionalIssues.push({
      number: issueNumber++,
      title,
      description: `${title} for backend API`,
      category: 'Backend API',
      labels: ['backend', 'nestjs', 'api'],
      priority: index < 10 ? 'high' : index < 25 ? 'medium' : 'low',
      effort: index % 3 === 0 ? 'small' : index % 3 === 1 ? 'medium' : 'large',
      acceptance_criteria: [
        `${title} implemented`,
        'Unit tests passing',
        'Integration tests passing',
        'Code review approved',
      ],
    });
  });

  // Frontend UI/UX (50 issues)
  const frontendTitles = [
    'Create application shell layout',
    'Implement navigation menu',
    'Create dashboard page',
    'Implement wallet selector',
    'Create asset list view',
    'Implement asset detail page',
    'Create transaction form',
    'Implement transaction history',
    'Create user profile page',
    'Implement settings page',
    'Create authentication forms',
    'Implement loading states',
    'Create error boundaries',
    'Implement error messages',
    'Create toast notifications',
    'Implement modal dialogs',
    'Create form components',
    'Implement form validation',
    'Create tables with sorting',
    'Implement data pagination',
    'Create charts and graphs',
    'Implement responsive design',
    'Create mobile navigation',
    'Implement dark/light theme',
    'Create accessibility compliance',
    'Implement keyboard navigation',
    'Create color scheme',
    'Implement typography system',
    'Create spacing system',
    'Implement component library',
    'Create Storybook setup',
    'Implement UI testing',
    'Create visual regression tests',
    'Implement animation system',
    'Create transition effects',
    'Implement skeleton loaders',
    'Create empty states',
    'Implement error screens',
    'Create success screens',
    'Implement onboarding flow',
    'Create tutorial system',
    'Implement help documentation',
    'Create search functionality',
    'Implement filters',
    'Create preferences UI',
    'Implement activity feed',
    'Create notifications center',
    'Implement breadcrumbs',
    'Create footer component',
  ];

  frontendTitles.forEach((title, index) => {
    additionalIssues.push({
      number: issueNumber++,
      title,
      description: `${title} for frontend application`,
      category: 'Frontend UI/UX',
      labels: ['frontend', 'ui', 'nextjs', 'react'],
      priority: index < 10 ? 'high' : index < 25 ? 'medium' : 'low',
      effort: index % 3 === 0 ? 'small' : index % 3 === 1 ? 'medium' : 'large',
      acceptance_criteria: [
        `${title} implemented`,
        'Styling complete',
        'Responsive design working',
        'Accessibility verified',
      ],
    });
  });

  // Testing & Quality (30 issues)
  const testingTitles = [
    'Setup Jest for unit tests',
    'Setup Vitest for integration tests',
    'Setup Cypress for E2E tests',
    'Create unit test templates',
    'Implement test coverage reporting',
    'Create test data factories',
    'Setup test database',
    'Implement test utilities',
    'Create snapshot tests',
    'Implement performance tests',
    'Create accessibility tests',
    'Implement security tests',
    'Create API contract tests',
    'Implement load testing',
    'Create stress testing suite',
    'Implement continuous testing',
    'Create test documentation',
    'Implement test CI/CD integration',
    'Create test result reporting',
    'Implement flaky test detection',
    'Create mutation testing',
    'Implement code coverage targets',
    'Create integration test suite',
    'Implement contract testing',
    'Create visual testing',
    'Implement performance profiling',
    'Create memory leak detection',
    'Implement test monitoring',
    'Create test analytics',
    'Implement test optimization',
  ];

  testingTitles.forEach((title, index) => {
    additionalIssues.push({
      number: issueNumber++,
      title,
      description: `${title} for quality assurance`,
      category: 'Testing & Quality',
      labels: ['testing', 'quality', 'devops'],
      priority: index < 10 ? 'high' : index < 20 ? 'medium' : 'low',
      effort: index % 3 === 0 ? 'small' : index % 3 === 1 ? 'medium' : 'large',
      acceptance_criteria: [
        `${title} configured`,
        'Tests running successfully',
        'Results being tracked',
        'Team trained on usage',
      ],
    });
  });

  // Payments & Transactions (30 issues)
  const paymentTitles = [
    'Implement payment creation',
    'Create payment execution',
    'Implement payment verification',
    'Create transaction validation',
    'Implement transaction signing',
    'Create transaction broadcasting',
    'Implement transaction tracking',
    'Create transaction retry logic',
    'Implement payment confirmation',
    'Create payment webhooks',
    'Implement refund system',
    'Create dispute handling',
    'Implement payment reversal',
    'Create transaction fees',
    'Implement fee calculation',
    'Create price feed integration',
    'Implement currency conversion',
    'Create multi-asset support',
    'Implement batch payments',
    'Create scheduled payments',
    'Implement recurring payments',
    'Create invoice system',
    'Implement invoice tracking',
    'Create receipt generation',
    'Implement transaction receipts',
    'Create tax reporting',
    'Implement AML compliance',
    'Create KYC integration',
    'Implement transaction limits',
    'Create fraud detection system',
  ];

  paymentTitles.forEach((title, index) => {
    additionalIssues.push({
      number: issueNumber++,
      title,
      description: `${title} for payment processing`,
      category: 'Payments & Transactions',
      labels: ['payments', 'transactions', 'backend'],
      priority: index < 10 ? 'high' : index < 20 ? 'medium' : 'low',
      effort: index % 3 === 0 ? 'small' : index % 3 === 1 ? 'medium' : 'large',
      acceptance_criteria: [
        `${title} implemented and tested`,
        'Integration with Stellar working',
        'All tests passing',
        'Documentation updated',
      ],
    });
  });

  // Notifications & Messaging (20 issues)
  const notificationTitles = [
    'Implement email notification system',
    'Create push notification system',
    'Implement in-app notifications',
    'Create notification templating',
    'Implement email templates',
    'Create notification preferences',
    'Implement notification scheduling',
    'Create notification history',
    'Implement webhook notifications',
    'Create SMS notifications',
    'Implement notification routing',
    'Create notification deduplication',
    'Implement notification expiration',
    'Create notification testing',
    'Implement notification monitoring',
    'Create notification analytics',
    'Implement unsub scribe links',
    'Create notification retry logic',
    'Implement notification rate limiting',
    'Create notification dashboard',
  ];

  notificationTitles.forEach((title, index) => {
    additionalIssues.push({
      number: issueNumber++,
      title,
      description: `${title} for user communication`,
      category: 'Notifications',
      labels: ['notifications', 'backend', 'communications'],
      priority: index < 5 ? 'high' : index < 12 ? 'medium' : 'low',
      effort: index % 3 === 0 ? 'small' : index % 3 === 1 ? 'medium' : 'large',
      acceptance_criteria: [
        `${title} implemented`,
        'Integration tested',
        'Delivery confirmed',
        'Performance optimized',
      ],
    });
  });

  // Deployment & Operations (15 issues)
  const deploymentTitles = [
    'Setup Kubernetes deployment',
    'Configure Helm charts',
    'Implement auto-scaling',
    'Create load balancer setup',
    'Implement health checks',
    'Create monitoring dashboard',
    'Setup alerting system',
    'Implement log aggregation',
    'Create incident response automation',
    'Implement blue-green deployment',
    'Create rollback procedures',
    'Setup infrastructure as code',
    'Implement configuration management',
    'Create cost optimization',
    'Setup disaster recovery',
  ];

  deploymentTitles.forEach((title, index) => {
    additionalIssues.push({
      number: issueNumber++,
      title,
      description: `${title} for production environment`,
      category: 'Deployment & Operations',
      labels: ['devops', 'deployment', 'operations'],
      priority: index < 5 ? 'high' : index < 10 ? 'medium' : 'low',
      effort: 'large',
      acceptance_criteria: [
        `${title} implemented`,
        'Tested in staging',
        'Production ready',
        'Team trained',
      ],
    });
  });

  return additionalIssues;
}

// Generate outputs
function generateJSON() {
  return JSON.stringify(allIssues, null, 2);
}

function generateCSV() {
  const headers = [
    'Number',
    'Title',
    'Description',
    'Category',
    'Labels',
    'Priority',
    'Effort',
    'Acceptance Criteria',
  ];

  const rows = allIssues.map((issue) => [
    issue.number,
    `"${issue.title.replace(/"/g, '""')}"`,
    `"${issue.description.replace(/"/g, '""')}"`,
    issue.category,
    issue.labels.join(';'),
    issue.priority,
    issue.effort,
    `"${issue.acceptance_criteria.join('|').replace(/"/g, '""')}"`,
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

function generateMarkdown() {
  let markdown =
    '# StellarVault - 300 GitHub Issues\n\n' +
    '> Auto-generated issue list for StellarVault project\n\n' +
    '**Total Issues**: 300\n' +
    '**Project**: StellarVault (Web3 on Stellar)\n' +
    '**Date Generated**: ' +
    new Date().toISOString() +
    '\n\n' +
    '## Table of Contents\n\n';

  // Generate ToC
  const categories = [...new Set(allIssues.map((i) => i.category))];
  categories.forEach((cat) => {
    const anchor = cat.toLowerCase().replace(/\s+/g, '-');
    markdown += `- [${cat}](#${anchor})\n`;
  });

  markdown += '\n---\n\n';

  // Generate issues grouped by category
  categories.forEach((category) => {
    const categoryIssues = allIssues.filter((i) => i.category === category);
    const anchor = category.toLowerCase().replace(/\s+/g, '-');

    markdown += `## ${category} {#${anchor}}\n\n`;
    markdown += `**Total Issues**: ${categoryIssues.length}\n\n`;

    categoryIssues.forEach((issue) => {
      markdown += `### #${issue.number} - ${issue.title}\n\n`;
      markdown += `**Category**: ${issue.category}\n\n`;
      markdown += `**Description**: ${issue.description}\n\n`;
      markdown += `**Priority**: ${issue.priority}\n\n`;
      markdown += `**Estimated Effort**: ${issue.effort}\n\n`;
      markdown += `**Labels**: ${issue.labels.map((l) => `\`${l}\``).join(', ')}\n\n`;
      markdown += `**Acceptance Criteria**:\n`;
      issue.acceptance_criteria.forEach((ac) => {
        markdown += `- [ ] ${ac}\n`;
      });
      markdown += '\n---\n\n';
    });
  });

  return markdown;
}

// Create output directory
const outputDir = path.join(__dirname, 'issues-output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write files
fs.writeFileSync(path.join(outputDir, 'issues.json'), generateJSON());
fs.writeFileSync(path.join(outputDir, 'issues.csv'), generateCSV());
fs.writeFileSync(path.join(outputDir, 'issues.md'), generateMarkdown());

console.log('✅ Issues generated successfully!');
console.log(
  `📁 Output directory: ${outputDir}`,
);
console.log(`📊 Total issues generated: ${allIssues.length}`);
console.log(
  `📄 Files generated: issues.json, issues.csv, issues.md`,
);
