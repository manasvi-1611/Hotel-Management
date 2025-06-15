// Menu Data
const menuItems = [
    {
        id: 1,
        name: "Bruschetta",
        category: "starters",
        price: 8.99,
        image: "images/bruschetta.jpg",
        description: "Grilled bread rubbed with garlic and topped with tomatoes, olive oil, and herbs"
    },
    {
        id: 2,
        name: "Caesar Salad",
        category: "starters",
        price: 10.99,
        image: "images/caesar-salad.jpg",
        description: "Fresh romaine lettuce with classic Caesar dressing, croutons, and parmesan"
    },
    {
        id: 3,
        name: "Grilled Salmon",
        category: "main",
        price: 24.99,
        image: "images/grilled-salmon.jpg",
        description: "Fresh salmon fillet grilled to perfection with herbs and lemon"
    },
    {
        id: 4,
        name: "Beef Tenderloin",
        category: "main",
        price: 29.99,
        image: "images/beef-tenderloin.jpg",
        description: "Premium cut beef tenderloin with red wine reduction sauce"
    },
    {
        id: 5,
        name: "Tiramisu",
        category: "desserts",
        price: 8.99,
        image: "images/tiramisu.jpg",
        description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream"
    },
    {
        id: 6,
        name: "Lava Cake",
        category: "desserts",
        price: 9.99,
        image: "images/lava-cake.jpg",
        description: "Warm chocolate cake with molten center, served with vanilla ice cream"
    },
    {
        id: 7,
        name: "Espresso",
        category: "beverages",
        price: 3.99,
        image: "images/espresso.jpg",
        description: "Rich and aromatic single shot of espresso"
    },
    {
        id: 8,
        name: "Red Wine",
        category: "beverages",
        price: 7.99,
        image: "images/red-wine.jpg",
        description: "Premium house red wine by the glass"
    }
];

// Cart and Order Management
let cart = [];
let total = 0;
let orders = [];
let MenuItems = [];

// Initial menu data with existing images
const initialMenuItems = [
    {
        id: 1,
        name: "Margherita Pizza",
        price: 299,
        category: "main",
        image: "images/pizza.jpg",
        description: "Classic Italian pizza with tomato sauce and mozzarella"
    },
    {
        id: 2,
        name: "Chicken Biryani",
        price: 349,
        category: "main",
        image: "images/biryani.jpg",
        description: "Aromatic rice dish with tender chicken and spices"
    },
    {
        id: 3,
        name: "Chocolate Brownie",
        price: 199,
        category: "desserts",
        image: "images/brownie.jpg",
        description: "Warm chocolate brownie with vanilla ice cream"
    },
    // Add more items based on your images
];

// DOM Elements
const menuGrid = document.getElementById('menu-items');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTax = document.getElementById('cart-tax');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const ordersList = document.getElementById('orders-list');
const categoryButtons = document.querySelectorAll('.category-btn');

// Initialize the menu
async function initializeMenu() {
    try {
        // First try to fetch from backend
        const response = await fetch('http://localhost:3000/api/menu');
        if (response.ok) {
            menuItems = await response.json();
        } else {
            // If backend is not available, use initial data
            menuItems = initialMenuItems;
        }
        displayMenu(menuItems);
        setupCategoryFilters();
    } catch (error) {
        console.error('Error loading menu:', error);
        alert('Hotel Delight says: Failed to load menu items');
    }
}

// Display menu items
function displayMenu(items) {
    menuGrid.innerHTML = '';

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item';
        itemDiv.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p class="description">${item.description}</p>
                <p class="price">₹${item.price.toFixed(2)}</p>
                <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})">
                    <i class="fas fa-plus"></i> Add to Cart
                </button>
            </div>
        `;
        menuGrid.appendChild(itemDiv);
    });
}

// Setup category filters
function setupCategoryFilters() {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            initializeMenu();
        });
    });
}

// Add item to cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    total += price;
    updateCart();
    
    // Show notification
    alert('Hotel Delight says: Item added to cart!');
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price.toFixed(2)} x ${item.quantity}</p>
                <p>Total: ₹${itemTotal.toFixed(2)}</p>
            </div>
            <div>
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    cartTax.textContent = `₹${tax.toFixed(2)}`;
    cartTotal.textContent = `₹${total.toFixed(2)}`;
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Update item quantity
function updateQuantity(id, newQuantity) {
    if (newQuantity < 1) {
        cart = cart.filter(item => item.id !== id);
    } else {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity = newQuantity;
        }
    }
    updateCart();
    updateCartCount();
}

// Checkout process
async function checkout() {
    if (cart.length === 0) {
        alert('Hotel Delight says: Your cart is empty!');
        return;
    }

    try {
        const orderData = {
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            orderDate: new Date().toISOString(),
            _id: Date.now().toString()
        };

        // Get existing orders and add new order at the beginning of the array
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.unshift(orderData); // Add new order at the beginning
        localStorage.setItem('orders', JSON.stringify(existingOrders));

        // Clear cart after successful order
        cart = [];
        updateCart();
        updateCartCount();
        
        alert('Hotel Delight says: Order placed successfully!');
        
        // Update order history
        await viewOrderHistory();
    } catch (error) {
        console.error('Error during checkout:', error);
        alert('Hotel Delight says: Order placed successfully!');
        
        // Even if there's an error with the backend, we'll store the order locally
        const orderData = {
            _id: Date.now().toString(),
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            orderDate: new Date().toISOString()
        };
        
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.unshift(orderData); // Add new order at the beginning
        localStorage.setItem('orders', JSON.stringify(existingOrders));
        
        // Clear cart
        cart = [];
        updateCart();
        updateCartCount();
        
        // Update order history
        await viewOrderHistory();
    }
}

// Update orders display
function updateOrdersDisplay() {
    ordersList.innerHTML = '';
    orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        orderCard.innerHTML = `
            <h3>Order #${order.id}</h3>
            <p>Date: ${order.date}</p>
            <p>Status: ${order.status}</p>
            <p>Total: ₹${order.total.toFixed(2)}</p>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <p>${item.name} x ${item.quantity}</p>
                        <p>₹${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                `).join('')}
            </div>
        `;
        ordersList.appendChild(orderCard);
    });
}

// Event Listeners
checkoutBtn.addEventListener('click', checkout);

// Initialize the application
initializeMenu();
updateCart();
updateOrdersDisplay();

// Update the hero section background in your CSS
document.addEventListener('DOMContentLoaded', () => {
    // Set hero background
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/hero-bg.jpg')";
    }
    
    // Load menu items
    displayMenu(menuItems);
    
    // Add filter functionality
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Filter items
            const filteredItems = category === 'all' 
                ? menuItems 
                : menuItems.filter(item => item.category === category);
            
            displayMenu(filteredItems);
        });
    });
});

// Add this function to your existing script.js
async function viewOrderHistory() {
    try {
        // Get orders from local storage, filter out invalid orders, and sort by date
        const orders = JSON.parse(localStorage.getItem('orders') || '[]')
            .filter(order => order && order.items && order.items.length > 0) // Filter out invalid orders
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        
        const ordersSection = document.getElementById('orders');
        const ordersList = document.createElement('div');
        ordersList.className = 'orders-list';

        if (orders.length === 0) {
            ordersList.innerHTML = '<p>No orders found</p>';
        } else {
            orders.forEach(order => {
                if (!order.items || order.items.length === 0) return; // Skip empty orders
                
                const orderElement = document.createElement('div');
                orderElement.className = 'order-item';
                
                const orderDate = new Date(order.orderDate).toLocaleString();
                let itemsHtml = '';
                order.items.forEach(item => {
                    if (!item || !item.name || !item.quantity) return; // Skip invalid items
                    itemsHtml += `
                        <div class="order-item-detail">
                            <span>${item.name} x ${item.quantity}</span>
                            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `;
                });

                if (itemsHtml === '') return; // Skip if no valid items

                orderElement.innerHTML = `
                    <div class="order-header">
                        <h4>Order ID: ${order._id}</h4>
                        <p>Date: ${orderDate}</p>
                    </div>
                    <div class="order-items">
                        ${itemsHtml}
                    </div>
                    <div class="order-total">
                        <strong>Total: ₹${order.total.toFixed(2)}</strong>
                    </div>
                `;
                ordersList.appendChild(orderElement);
            });
        }

        // Clear previous orders and add new ones
        const existingOrdersList = ordersSection.querySelector('.orders-list');
        if (existingOrdersList) {
            existingOrdersList.remove();
        }
        ordersSection.appendChild(ordersList);
    } catch (error) {
        console.error('Error fetching order history:', error);
        alert('Hotel Delight says: Unable to load order history');
    }
}

function closeOrderHistory() {
    const modal = document.querySelector('.order-history-modal');
    if (modal) {
        modal.remove();
    }
}
