// script.js - Main JavaScript for ShopEase E-commerce Website

// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Product data (in a real app, this would come from an API)
const products = [
  {
    id: 'denim-jacket',
    title: 'Casual Denim Jacket',
    category: 'Jackets',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80',
    badge: 'New'
  },
  {
    id: 'leather-bag',
    title: 'Leather Crossbody Bag',
    category: 'Bags',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    badge: 'Sale'
  },
  {
    id: 'white-sneakers',
    title: 'White Sneakers',
    category: 'Footwear',
    price: 129.99,
    originalPrice: 129.99,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80'
  },
  {
    id: 'gold-watch',
    title: 'Gold-tone Watch',
    category: 'Watches',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    badge: '-30%'
  }
];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  initializePage();
  setupEventListeners();
  updateHeaderCounts();
});

// Initialize page elements
function initializePage() {
  // Initialize mobile menu toggle
  const mobileMenuToggle = document.createElement('div');
  mobileMenuToggle.className = 'mobile-menu-toggle';
  mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector('nav').prepend(mobileMenuToggle);

  // Initialize product ratings
  initProductRatings();

  // Initialize cart and wishlist from localStorage
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  if (!localStorage.getItem('wishlist')) {
    localStorage.setItem('wishlist', JSON.stringify([]));
  }
}

// Set up event listeners
function setupEventListeners() {
  // Mobile menu toggle
  document.querySelector('.mobile-menu-toggle').addEventListener('click', toggleMobileMenu);

  // Search functionality
  document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') performSearch();
  });
  document.querySelector('.search-bar button').addEventListener('click', performSearch);

  // Product interactions
  document.querySelectorAll('.product-action-btn .fa-heart').forEach(btn => {
    btn.addEventListener('click', handleWishlistClick);
  });

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', handleAddToCart);
  });

  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
}

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.querySelector('.main-menu');
  const icon = this.querySelector('i');
  
  menu.classList.toggle('active');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
}

// Search functionality
function performSearch() {
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  
  if (!searchTerm) {
    showAlert('Please enter a search term', 'error');
    return;
  }

  const matchedProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm) || 
    product.category.toLowerCase().includes(searchTerm)
  );

  if (matchedProducts.length === 0) {
    showAlert('No products found matching your search', 'error');
    return;
  }

  // Scroll to products section
  document.querySelector('.featured-products').scrollIntoView({ behavior: 'smooth' });

  // Highlight matching products
  highlightProducts(matchedProducts);
}

function highlightProducts(matchedProducts) {
  // Remove previous highlights
  document.querySelectorAll('.product-card').forEach(card => {
    card.classList.remove('highlight-match');
  });

  // Add new highlights
  matchedProducts.forEach(product => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      const cardTitle = card.querySelector('.product-title').textContent.toLowerCase();
      if (cardTitle.includes(product.id)) {
        card.classList.add('highlight-match');
        setTimeout(() => card.classList.remove('highlight-match'), 3000);
      }
    });
  });
}

// Product rating initialization
function initProductRatings() {
  document.querySelectorAll('.rating').forEach(ratingElement => {
    const productTitle = ratingElement.closest('.product-details').querySelector('.product-title').textContent;
    const productId = productTitle.toLowerCase().replace(/\s+/g, '-');
    const product = products.find(p => p.id === productId);
    
    if (product) {
      ratingElement.innerHTML = generateStarRating(product.rating);
    }
  });
}

function generateStarRating(rating) {
  const stars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let starsHTML = '';

  for (let i = 1; i <= 5; i++) {
    if (i <= stars) {
      starsHTML += '<i class="fas fa-star"></i>';
    } else if (i === stars + 1 && hasHalfStar) {
      starsHTML += '<i class="fas fa-star-half-alt"></i>';
    } else {
      starsHTML += '<i class="far fa-star"></i>';
    }
  }

  return `${starsHTML} <span>(${Math.floor(Math.random() * 50) + 10})</span>`;
}

// Wishlist functionality
function handleWishlistClick(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const productCard = this.closest('.product-card');
  const productId = getProductIdFromCard(productCard);
  
  if (this.classList.contains('far')) {
    // Add to wishlist
    this.classList.remove('far');
    this.classList.add('fas');
    this.style.color = 'var(--accent)';
    addToWishlist(productId);
  } else {
    // Remove from wishlist
    this.classList.remove('fas');
    this.classList.add('far');
    this.style.color = '';
    removeFromWishlist(productId);
  }
}

function addToWishlist(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (!wishlist.some(item => item.id === productId)) {
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateHeaderCounts();
    showAlert('Added to wishlist', 'success');
  }
}

function removeFromWishlist(productId) {
  wishlist = wishlist.filter(item => item.id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateHeaderCounts();
  showAlert('Removed from wishlist', 'success');
}

// Cart functionality
function handleAddToCart(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const productCard = this.closest('.product-card');
  const productId = getProductIdFromCard(productCard);
  
  addToCart(productId);
  
  // Visual feedback
  this.innerHTML = '<i class="fas fa-check"></i> Added';
  this.style.backgroundColor = 'var(--success)';
  
  setTimeout(() => {
    this.innerHTML = '<i class="fas fa-shopping-bag"></i> Add';
    this.style.backgroundColor = 'var(--cta)';
  }, 2000);
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateHeaderCounts();
  showAlert('Added to cart', 'success');
}

// Helper function to get product ID from card
function getProductIdFromCard(productCard) {
  const productTitle = productCard.querySelector('.product-title').textContent;
  return productTitle.toLowerCase().replace(/\s+/g, '-');
}

// Update header counts
function updateHeaderCounts() {
  const wishlistCount = document.querySelector('.header-icon:nth-child(1) .badge');
  const cartCount = document.querySelector('.header-icon:nth-child(2) .badge');
  
  wishlistCount.textContent = wishlist.length;
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Newsletter form handling
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = this.querySelector('input[type="email"]');
  const email = emailInput.value.trim();
  
  if (validateEmail(email)) {
    localStorage.setItem('subscribedEmail', email);
    showAlert('Thank you for subscribing!', 'success');
    emailInput.value = '';
  } else {
    showAlert('Please enter a valid email address', 'error');
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Alert notification system
function showAlert(message, type = 'error') {
  const alertBox = document.createElement('div');
  alertBox.className = `alert ${type}`;
  alertBox.textContent = message;
  document.body.appendChild(alertBox);
  
  setTimeout(() => {
    alertBox.classList.add('fade-out');
    setTimeout(() => alertBox.remove(), 500);
  }, 3000);
}