# Hotel Management System

A modern web-based hotel management system with menu management, order processing, and billing functionality.

## Features

- Beautiful and responsive UI
- Menu categorization (Starters, Main Course, Desserts, Beverages)
- Shopping cart functionality
- Order management
- Real-time bill calculation
- Order history tracking

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hotel-management
```

2. Install dependencies:
```bash
npm install
```

3. Create an `images` folder in the project root and add the following images:
- bruschetta.jpg
- caesar-salad.jpg
- grilled-salmon.jpg
- beef-tenderloin.jpg
- tiramisu.jpg
- lava-cake.jpg
- espresso.jpg
- red-wine.jpg
- hero-bg.jpg

4. Start MongoDB:
```bash
mongod
```

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Browse the menu items by category
3. Add items to your cart
4. Adjust quantities in the cart
5. Proceed to checkout
6. View order history

## API Endpoints

- GET `/api/menu` - Get all menu items
- GET `/api/orders` - Get all orders
- POST `/api/orders` - Create a new order
- PATCH `/api/orders/:id` - Update order status

## Technologies Used

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (Vanilla)
  - Font Awesome Icons

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 