// Tab Switching Functionality
const tabs = document.querySelectorAll('.gender-tab');
const contents = document.querySelectorAll('.gender-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(`${tabId}-content`).classList.add('active');
    });
});

// Cart Functionality
let cartCount = 0;
const cartButtons = document.querySelectorAll('.add-to-cart');
const cartCountElement = document.getElementById('cart-count');
const cartNotification = document.getElementById('cart-notification');

cartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.footwear-card');
        const id = card.getAttribute('data-id');
        const title = card.querySelector('.footwear-title').textContent;
        const price = card.querySelector('.footwear-price').textContent.split(' ')[0];
        const gender = card.getAttribute('data-gender');
        
        // In a real app, you would add this to your cart data structure
        console.log(`Added to cart: ${title} ($${price}) - ${gender}'s footwear`);
        
        // Update cart count
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Show notification
        cartNotification.classList.add('show');
        setTimeout(() => {
            cartNotification.classList.remove('show');
        }, 3000);
    });
});

// Like Functionality
let likedItems = 0;
const likeButtons = document.querySelectorAll('.like-btn');
const wishlistCount = document.getElementById('wishlist-count');
const likeNotification = document.getElementById('like-notification');

likeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = button.querySelector('i');
        const id = button.getAttribute('data-id');
        
        // Toggle liked state
        button.classList.toggle('liked');
        
        if (button.classList.contains('liked')) {
            // Add to wishlist
            likedItems++;
            icon.classList.remove('far');
            icon.classList.add('fas');
            
            // Show notification
            likeNotification.textContent = "Added to wishlist!";
            likeNotification.classList.add('show');
            setTimeout(() => {
                likeNotification.classList.remove('show');
            }, 3000);
        } else {
            // Remove from wishlist
            likedItems--;
            icon.classList.remove('fas');
            icon.classList.add('far');
            
            // Show notification
            likeNotification.textContent = "Removed from wishlist!";
            likeNotification.classList.add('show');
            setTimeout(() => {
                likeNotification.classList.remove('show');
            }, 3000);
        }
        
        // Update wishlist count
        wishlistCount.textContent = likedItems;
        
        // In a real app, you would update your wishlist data structure
        console.log(`Item ${id} ${button.classList.contains('liked') ? 'added to' : 'removed from'} wishlist`);
    });
});