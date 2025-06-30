# OPPB - Offline Peer-to-Peer Payment Bridge

## Overview

OPPB is a modern offline-first digital payment application that combines the sophistication of popular payment apps like PhonePe and GPay with unique offline transaction capabilities. The system provides seamless payment processing through both online and offline channels, featuring a responsive mobile-first interface built with React and TypeScript.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives for accessible, unstyled components

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Authentication**: Replit Auth with OpenID Connect integration
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API endpoints with structured error handling

### Database Architecture
- **Primary Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **Connection Pooling**: Neon serverless pool for efficient connections
- **Schema Management**: Drizzle Kit for migrations and schema management

## Key Components

### Authentication System
- **Provider**: Replit Auth using OpenID Connect protocol
- **Session Storage**: PostgreSQL-backed sessions with configurable TTL
- **Security**: HTTP-only cookies with secure flags and CSRF protection
- **User Management**: Automatic user creation and profile management

### Payment Processing
- **Transaction Types**: Support for debit/credit transactions
- **Categories**: Offline payments, online payments, recharges, and payment requests
- **Status Tracking**: Pending, completed, and failed transaction states
- **Balance Management**: Real-time balance updates and validation

### Mobile-First UI
- **Design System**: Material Design 3.0 principles with custom branding
- **Responsive Layout**: Mobile-optimized with desktop compatibility
- **Component Library**: Comprehensive UI components with consistent styling
- **Accessibility**: WCAG 2.1 compliant with screen reader support

### Offline Capabilities
- **Payment Processing**: Bluetooth-based peer-to-peer transactions
- **QR Code System**: Dynamic QR code generation and scanning
- **Sync Mechanism**: Automatic synchronization when connectivity returns
- **Fallback Handling**: Graceful degradation for offline scenarios

## Data Flow

### Authentication Flow
1. User initiates login through Replit Auth
2. OpenID Connect handles authentication with secure tokens
3. Session created in PostgreSQL with encrypted user data
4. Client receives authentication status via API endpoints

### Payment Processing Flow
1. User initiates payment through QR scan or manual entry
2. System validates user balance and merchant information
3. Transaction record created with pending status
4. Payment processing (online/offline) based on connectivity
5. Transaction status updated and balance adjusted
6. Real-time UI updates via TanStack Query

### Data Synchronization
1. Offline transactions stored locally with timestamp
2. Background sync attempts when connectivity detected
3. Conflict resolution for simultaneous transactions
4. User notification for sync status and conflicts

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **express**: Web application framework
- **passport**: Authentication middleware

### UI Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant generation
- **lucide-react**: Consistent icon library

### Development Dependencies
- **vite**: Fast build tool and development server
- **typescript**: Type safety and enhanced developer experience
- **drizzle-kit**: Database schema management tools

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Neon serverless PostgreSQL with development credentials
- **Authentication**: Replit Auth integration for seamless development

### Production Build
- **Frontend**: Static assets built with Vite and optimized for performance
- **Backend**: Express server bundled with esbuild for production deployment
- **Database**: Production PostgreSQL instance with connection pooling
- **Environment**: Environment-specific configuration management

### Scalability Considerations
- **Database Connection Pooling**: Efficient connection management for high load
- **Static Asset Optimization**: CDN-ready builds with proper caching headers
- **API Rate Limiting**: Protection against abuse and overuse
- **Session Management**: Scalable session storage with TTL cleanup

## Changelog

```
Changelog:
- June 29, 2025. Initial setup
- June 29, 2025. Successfully migrated from Replit Agent to standard Replit environment with database setup, session security, and proper client/server separation
- June 29, 2025. Implemented complete OPPB payment app with PhonePe/GPay-style UI including:
  * Exact dashboard design with gradient balance card and 4x2 quick actions grid
  * Professional QR scanner with animated scanning interface
  * Send money flow with contact selection and number pad entry
  * Revolutionary offline payments with Bluetooth device discovery
  * Complete OPPB branding with purple gradients and Material Design 3
  * Mobile-first responsive design matching specification exactly
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```