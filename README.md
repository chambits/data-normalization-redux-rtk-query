# NormalizedStore - E-commerce App with RTK Query

A modern React e-commerce application demonstrating **data normalization patterns** with **RTK Query** for server state management. This project showcases best practices for handling complex relational data in a React application.

## 🚀 Features

- **RTK Query Integration**: Automatic caching, background refetching, and optimistic updates
- **Data Normalization**: Efficient handling of relational data (Products, Categories, Users, Reviews)
- **Full CRUD Operations**: Create, read, update, and delete products
- **Real-time Updates**: UI automatically reflects data changes
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Built with Tailwind CSS and Lucide React icons
- **JSON Server**: Simple REST API for development

## 🏗️ Architecture

### Data Normalization Pattern

- **Entities**: Separate stores for Products, Categories, Users, and Reviews
- **Relationships**: ID-based references between entities
- **Selectors**: Memoized selectors for combining normalized data
- **Performance**: Efficient updates and minimal re-renders

### RTK Query Integration

- **API Slice**: Centralized API definitions with automatic cache management
- **Normalizers**: Transform API responses into normalized data structures
- **Optimistic Updates**: Instant UI feedback for better UX
- **Error Handling**: Built-in loading states and error management

## 📦 Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Redux Toolkit** - State Management
- **RTK Query** - Server State Management
- **Tailwind CSS** - Styling
- **Vite** - Build Tool
- **JSON Server** - Mock REST API
- **Lucide React** - Icons

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- Yarn or npm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/chambits/data-normalization-redux-rtk-query.git
cd data-normalization-redux-rtk-query
```

2. **Install dependencies**

```bash
yarn install
```

3. **Start development servers**

**Option 1: Separate terminals (Recommended)**

```bash
# Terminal 1: Start JSON Server (API)
yarn dev:api

# Terminal 2: Start React App
yarn dev:app
```

**Option 2: Individual commands**

```bash
# Start JSON Server on port 3001
yarn json-server

# In another terminal, start React app on port 5173
yarn dev
```

### Available Scripts

- `yarn dev` - Start Vite dev server (React app)
- `yarn dev:api` - Start JSON Server on port 3001
- `yarn dev:app` - Start React app on port 5173
- `yarn json-server` - Start JSON Server with watch mode
- `yarn build` - Build for production
- `yarn preview` - Preview production build

## 🌐 API Endpoints

JSON Server runs on `http://localhost:3001` with the following endpoints:

- `GET /products` - Get all products with embedded reviews and categories
- `GET /products/:id` - Get single product
- `POST /products` - Create new product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /categories` - Get all categories
- `GET /users` - Get all users
- `GET /reviews` - Get all reviews

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation with add product
│   ├── ProductCard.tsx # Product display with edit/delete
│   ├── ProductForm.tsx # Create/edit product form
│   ├── ProductGrid.tsx # Product listing
│   ├── CategoryFilter.tsx # Category filtering
│   ├── ErrorMessage.tsx # Error handling UI
│   └── LoadingSpinner.tsx # Loading states
├── store/              # Redux store configuration
│   ├── api/           # RTK Query setup
│   │   ├── apiSlice.ts # API definitions
│   │   └── normalizers.ts # Data transformation
│   ├── slices/        # Entity slices
│   │   ├── productsSlice.ts
│   │   ├── categoriesSlice.ts
│   │   ├── usersSlice.ts
│   │   └── reviewsSlice.ts
│   ├── selectors.ts   # Memoized selectors
│   └── store.ts       # Store configuration
├── types/             # TypeScript definitions
│   ├── index.ts       # Entity types
│   └── api.ts         # API types
├── hooks/             # Custom React hooks
├── data/              # Mock data (for reference)
├── db.json            # JSON Server database
└── App.tsx            # Main application
```

## 🎯 Key Concepts Demonstrated

### 1. Data Normalization

```typescript
// Normalized state structure
{
  products: { 1: { id: 1, name: "...", categoryId: 1, reviewIds: [1, 2] } },
  categories: { 1: { id: 1, name: "Electronics" } },
  reviews: { 1: { id: 1, text: "...", authorId: 1, productId: 1 } },
  users: { 1: { id: 1, name: "John Doe" } }
}
```

### 2. RTK Query with Normalization

```typescript
// API slice with automatic normalization
const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      transformResponse: (response) => normalizeProductsResponse(response),
    }),
  }),
});
```

### 3. Memoized Selectors

```typescript
// Combine normalized data efficiently
const selectProductWithDetails = createSelector(
  [selectProductById, selectAllCategories, selectAllReviews, selectAllUsers],
  (product, categories, reviews, users) => {
    // Combine related data
  }
);
```

## 🧪 Testing the Application

1. **Start both servers** (see Development Setup above)
2. **Open** `http://localhost:5173` in your browser
3. **View Products**: Browse the product catalog with category filtering
4. **Add Product**: Click "Add Product" in the header to create new products
5. **Edit Product**: Click the menu (⋮) on any product card to edit
6. **Delete Product**: Use the delete option in the product menu
7. **Real-time Updates**: Changes are immediately reflected across the UI
8. **Data Persistence**: All changes are saved to `db.json`

## 🤝 Contributing

Feel free to submit issues and pull requests to improve this example!

## 📄 License

This project is for educational purposes and demonstrates modern React development patterns.
