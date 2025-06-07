# React Vite E-commerce Project with Data Normalization

This is a complete React Vite project implementing data normalization patterns with Redux Toolkit and modern UI components.

## Features

✅ **Complete Data Normalization**

- Separate entity adapters for Products, Categories, Users, and Reviews
- Normalized state structure with references between entities
- Type-safe selectors for combining related data

✅ **Modern UI with Tailwind CSS**

- Responsive design that works on all devices
- Beautiful animations and hover effects
- Modern gradient backgrounds and glassmorphism effects

✅ **Performance Optimizations**

- Memoized selectors prevent unnecessary re-renders
- Component-level optimization with proper key props
- Efficient updates using entity adapters

✅ **Real-world Features**

- Category filtering with visual feedback
- Product detail view with reviews and ratings
- Loading states and error handling
- Mock data that demonstrates relationships

## Installation & Setup

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Run linter
yarn lint
```

## Project Structure

```
src/
├── components/          # React components
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
├── hooks/              # Custom hooks
├── data/               # Mock data
└── App.tsx             # Main app component
```

## Key Technologies

- **React 19** - Latest React with modern features
- **TypeScript** - Full type safety
- **Redux Toolkit** - State management with entity adapters
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

## Data Normalization Benefits

This project demonstrates how normalized data structures improve:

1. **Performance** - No duplicate data, efficient updates
2. **Consistency** - Single source of truth for each entity
3. **Maintainability** - Clear relationships between entities
4. **Scalability** - Easy to add new features and relationships

## Running the Project

1. Install dependencies: `yarn install`
2. Start development server: `yarn dev`
3. Open your browser to the URL shown in the terminal
4. Explore the normalized data structure in Redux DevTools

The application will load with sample data and demonstrate real-world e-commerce functionality with optimized state management.
