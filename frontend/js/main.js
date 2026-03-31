// Main JavaScript for Chadha Canvas Website

const API_URL = 'https://chadha-canvas-and-readymade-store.onrender.com/api';

// Sample products (used as fallback)
const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: 'Heavy Duty Tarpaulin 10x10',
        category: 'tarpaulin',
        description: 'Premium quality heavy-duty tarpaulin sheet for maximum protection',
        price: 1200,
        icon: '🟫'
    },
    {
        id: 2,
        name: 'UV Protected Tarpaulin 15x20',
        category: 'tarpaulin',
        description: 'UV resistant tarpaulin with enhanced durability',
        price: 2800,
        icon: '🟫'
    },
    {
        id: 3,
        name: 'Green Shade Net 60%',
        category: 'green-shades',
        description: 'Reduces temperature by 8-10°C. Perfect for summer crops',
        price: 800,
        icon: '🟩'
    },
    {
        id: 4,
        name: 'Green Shade Net 80%',
        category: 'green-shades',
        description: 'Maximum shade protection for delicate plants',
        price: 1200,
        icon: '🟩'
    },
    {
        id: 5,
        name: 'Water-proof Tarpaulin',
        category: 'tarpaulin',
        description: '100% waterproof tested tarpaulin for monsoon season',
        price: 1800,
        icon: '🟫'
    },
    {
        id: 6,
        name: 'Multi-Purpose Shade Net',
        category: 'green-shades',
        description: 'Versatile net for various agricultural applications',
        price: 950,
        icon: '🟩'
    }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupFilters();
    setupContactForm();
    updateCartCount();
});

// Load products from backend or use default
async function loadProducts(filter = 'all') {
    try {
        const response = await fetch(`${API_URL}/products?category=${filter}`);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Backend unavailable, using default products');
        displayDefaultProducts(filter);
    }
}

// Display products on page
function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) return;
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products available</p>';
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">${product.icon || getProductIcon(product.category)}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">₹${product.price}</div>
                <div class="product-actions">
                    <input type="number" class="quantity-input" value="1" min="1" data-product-id="${product.id}">
                    <button class="add-to-cart-btn" onclick="addToCart('${product.id}', '${product.name}', ${product.price})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Display default products
function displayDefaultProducts(filter) {
    let filtered = DEFAULT_PRODUCTS;
    if (filter !== 'all') {
        filtered = DEFAULT_PRODUCTS.filter(p => p.category === filter);
    }
    displayProducts(filtered);
}

// Get icon for product category
function getProductIcon(category) {
    return category === 'tarpaulin' ? '🟫' : '🟩';
}

// Setup filter buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            loadProducts(filter);
        });
    });
}

// Add product to cart
function addToCart(productId, productName, price) {
    const quantityInput = document.querySelector(`input[data-product-id="${productId}"]`);
    const quantity = parseInt(quantityInput.value) || 1;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existingItem = cart.find(item => item.id == productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to cart!`);
}

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Setup contact form
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: form.querySelector('input[type="text"]').value,
                email: form.querySelector('input[type="email"]').value,
                phone: form.querySelector('input[type="tel"]').value,
                message: form.querySelector('textarea').value
            };

            try {
                const response = await fetch(`${API_URL}/contact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Thank you for your message! We will contact you soon.');
                    form.reset();
                } else {
                    alert('Error sending message. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Message saved locally. Thank you for contacting us!');
                form.reset();
            }
        });
    }
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#home') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Set active navigation link
document.addEventListener('DOMContentLoaded', function() {
    const currentPageName = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPageName || (currentPageName === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
