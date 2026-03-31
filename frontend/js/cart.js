// Shopping Cart JavaScript

const API_URL = 'https://chadha-canvas-and-readymade-store.onrender.com/api';
const SHIPPING_COST = 100;

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartUI();
});

// Load cart from localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartTable = document.getElementById('cart-table');
    const cartSummary = document.getElementById('cart-summary');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        if (cartTable) cartTable.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        return;
    }

    if (emptyCart) emptyCart.style.display = 'none';
    if (cartTable) cartTable.style.display = 'table';
    if (cartSummary) cartSummary.style.display = 'block';

    cartItemsContainer.innerHTML = cart.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>
                <input type="number" class="quantity-input" value="${item.quantity}" 
                       min="1" onchange="updateQuantity('${item.id}', this.value)">
            </td>
            <td>₹${item.price * item.quantity}</td>
            <td>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
            </td>
        </tr>
    `).join('');
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(item => item.id == productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartUI();
    }
}

// Remove from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(item => item.id != productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartUI();
}

// Update cart totals
function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const shipping = cart.length > 0 ? SHIPPING_COST : 0;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = '₹' + subtotal;
    if (shippingEl) shippingEl.textContent = '₹' + shipping;
    if (totalEl) totalEl.textContent = '₹' + total;
}

// Proceed to checkout
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + SHIPPING_COST;

    const message = `
Order Summary:
Items: ${cart.map(item => `${item.name} (${item.quantity}x)`).join(', ')}
Subtotal: ₹${subtotal}
Shipping: ₹${SHIPPING_COST}
Total: ₹${total}

Please contact us to complete your order.
Email: info@chadhacanvas.com
Phone: +91-XXXXXXXXXX
    `;
    
    alert(message);
    localStorage.removeItem('cart');
    location.reload();
}
