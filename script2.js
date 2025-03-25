// Sample cart data
let cartItems = [
    {
        id: 1,
        title: "Casual Denim Jacket",
        category: "Jackets",
        price: 89.99,
        originalPrice: 129.99,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
        rating: 4.5,
        reviews: 24,
        quantity: 1
    },
    {
        id: 2,
        title: "White Sneakers",
        category: "Footwear",
        price: 129.99,
        originalPrice: 129.99,
        image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
        rating: 5,
        reviews: 42,
        quantity: 1
    },
    {
        id: 3,
        title: "Leather Crossbody Bag",
        category: "Bags",
        price: 59.99,
        originalPrice: 79.99,
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        rating: 4,
        reviews: 18,
        quantity: 1
    }
];

// DOM elements
const cartContainer = document.getElementById('cartContainer');

// Render cart
function renderCart() {
    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added anything to your cart yet. Explore our collection and find something you love!</p>
                <a href="index.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        return;
    }

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    cartContainer.innerHTML = `
        <div class="cart-items">
            <div class="cart-header">
                <h2>Your Cart Items</h2>
                <span class="cart-count">${itemCount} ${itemCount === 1 ? 'item' : 'items'}</span>
            </div>
            
            ${cartItems.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-img-container">
                        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                    </div>
                    <div class="cart-item-details">
                        <div>
                            <h3 class="cart-item-title">${item.title}</h3>
                            <p class="cart-item-category">${item.category}</p>
                            <div class="rating">
                                ${renderRatingStars(item.rating)} (${item.reviews})
                            </div>
                            <div class="cart-item-price">
                                $${item.price.toFixed(2)}
                                ${item.originalPrice > item.price ? `<del>$${item.originalPrice.toFixed(2)}</del>` : ''}
                            </div>
                        </div>
                        <div class="cart-item-actions">
                            <div class="quantity-selector">
                                <button class="quantity-btn minus-btn"><i class="fas fa-minus"></i></button>
                                <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                                <button class="quantity-btn plus-btn"><i class="fas fa-plus"></i></button>
                            </div>
                            <button class="remove-btn">
                                <i class="fas fa-trash"></i> Remove
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal (${itemCount} ${itemCount === 1 ? 'item' : 'items'})</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span>Free</span>
            </div>
            <div class="summary-row">
                <span>Tax</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="summary-row summary-total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="checkout-btn">
                <i class="fas fa-lock"></i> Proceed to Checkout
            </button>
        </div>
    `;

    // Add event listeners
    addCartEventListeners();
}

// Render rating stars
function renderRatingStars(rating) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars.push('<i class="fas fa-star"></i>');
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars.push('<i class="fas fa-star-half-alt"></i>');
        } else {
            stars.push('<i class="far fa-star"></i>');
        }
    }
    
    return stars.join('');
}

// Add event listeners to cart elements
function addCartEventListeners() {
    // Quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.closest('.cart-item').dataset.id);
            const item = cartItems.find(item => item.id === itemId);
            const input = this.closest('.quantity-selector').querySelector('.quantity-input');
            
            if (this.classList.contains('plus-btn')) {
                item.quantity += 1;
            } else if (this.classList.contains('minus-btn')) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    removeItem(itemId);
                    return;
                }
            }
            
            input.value = item.quantity;
            renderCart();
        });
    });
    
    // Quantity inputs
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const itemId = parseInt(this.closest('.cart-item').dataset.id);
            const item = cartItems.find(item => item.id === itemId);
            let newQuantity = parseInt(this.value);
            
            if (isNaN(newQuantity) || newQuantity < 1) {
                newQuantity = 1;
            }
            
            item.quantity = newQuantity;
            renderCart();
        });
    });
    
    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.closest('.cart-item').dataset.id);
            removeItem(itemId);
        });
    });
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // In a real app, this would redirect to checkout
            alert('Proceeding to checkout!');
        });
    }
}

// Remove item from cart
function removeItem(itemId) {
    const itemElement = document.querySelector(`.cart-item[data-id="${itemId}"]`);
    
    if (itemElement) {
        itemElement.classList.add('removing');
        
        setTimeout(() => {
            cartItems = cartItems.filter(item => item.id !== itemId);
            renderCart();
            // In a real app, you would update localStorage or send to server here
        }, 300);
    }
}

// Initialize cart
renderCart();