# MathFun - Kids' Math Learning Application

## Overview

MathFun is a web-based educational application designed to make mathematics fun and engaging for children from Kindergarten to 4th Grade. The app provides interactive math exercises including addition, subtraction, counting, number recognition, shapes, multiplication, division, fractions, word problems, and time telling. It features a colorful, child-friendly interface with visual learning aids, progress tracking, and gamification elements like stars and rewards.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom child-friendly color palette
- **State Management**: TanStack Query for server state and React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Storage**: In-memory storage implementation with interface for database migration

### Data Storage Solutions
- **Primary Database**: PostgreSQL configured for production
- **Development Storage**: In-memory storage class for rapid development
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database schema management

## Key Components

### Exercise System
- **Exercise Types**: Addition, subtraction, counting, number recognition, shapes, multiplication, division, fractions, word problems, time telling
- **Difficulty Levels**: Progressive difficulty scaling (1-4 levels corresponding to grade levels K-4)
- **Visual Learning**: Interactive visual counters with themed objects (apples, stars, hearts), visual multiplication groups, fraction pies, analog clocks
- **Answer Options**: Multiple choice format with randomized incorrect answers
- **Grade Organization**: Activities organized by Elementary (K-2) and Advanced (3-4) sections

### Progress Tracking
- **User Progress**: Tracks completion rates and star ratings per exercise type
- **Session History**: Records individual exercise attempts with timing and accuracy
- **Achievement System**: Star-based rewards (1-5 stars) for completed exercises

### User Interface
- **Child-Friendly Design**: Rounded corners, bright colors, large buttons
- **Responsive Layout**: Mobile-first design with bottom navigation
- **Interactive Elements**: Hover effects, animations, and visual feedback
- **Accessibility**: Screen reader friendly with proper ARIA labels

## Data Flow

### Exercise Flow
1. User selects exercise type from home screen
2. System generates random exercise based on type and difficulty
3. Exercise displayed with visual aids and multiple choice options
4. User selects answer, system provides immediate feedback
5. Correct answers trigger success modal with stars
6. Progress automatically saved to database
7. User can continue to next exercise or return to home

### Progress Tracking Flow
1. Each exercise attempt recorded as session with timing and accuracy
2. User progress aggregated by exercise type
3. Star ratings calculated based on performance metrics
4. Parent dashboard displays comprehensive analytics and weekly progress

## External Dependencies

### UI Components
- **Radix UI**: Provides accessible, unstyled components
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel component

### Data Management
- **TanStack Query**: Server state management and caching
- **Drizzle ORM**: Type-safe database operations
- **Zod**: Runtime type validation and schema generation
- **React Hook Form**: Form handling with validation

### Development Tools
- **Vite**: Fast build tool with HMR
- **ESBuild**: Fast JavaScript bundler for production
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing with Autoprefixer

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public` directory
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Assets**: Static files served from build directory

### Environment Configuration
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **Development**: In-memory storage fallback for rapid prototyping
- **Production**: Full database with session management and persistence

### Deployment Targets
- **Replit**: Optimized for Replit environment with development banner
- **General**: Standard Node.js deployment with environment variables
- **Database**: Neon Database for serverless PostgreSQL hosting

## Recent Changes

### Extended Grade Support (January 2025)
- **Expanded Exercise Types**: Added multiplication, division, fractions, word problems, and time telling
- **Grade-Based Organization**: Activities now organized by Elementary (K-2) and Advanced (3-4) categories
- **Enhanced Difficulty Scaling**: Difficulty levels now correspond to grade levels K-4
- **Advanced Visual Elements**: Added visual multiplication groups, fraction pies, and analog clock displays
- **Updated Progress Tracking**: Enhanced parent dashboard to support all new exercise types

The application follows a monorepo structure with shared schemas and types, enabling rapid development while maintaining type safety across the full stack. The architecture supports both development (with in-memory storage) and production (with PostgreSQL) environments seamlessly.