let cart = [];

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    showSection('inicio');
    updateCartCount();
});

function addToCart(button) {
    const productItem = button.parentElement;
    const productId = productItem.getAttribute('data-id');
    const productName = productItem.getAttribute('data-name');
    const productPrice = parseFloat(productItem.getAttribute('data-price'));

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Producto añadido al carrito');
}

function redirectToProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    const products = [
        { id: '1', name: 'Base de Maquillaje', price: 20.00, image: 'https://via.placeholder.com/150' },
        { id: '2', name: 'Labial', price: 15.00, image: 'https://via.placeholder.com/150' },
        { id: '3', name: 'Sombras de Ojos', price: 18.00, image: 'https://via.placeholder.com/150' },
    ];

    const product = products.find(item => item.id === productId);
    if (product) {
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-name').setAttribute('data-id', product.id);
        document.getElementById('product-name').setAttribute('data-price', product.price);
    }
}

function addToCartFromDetails() {
    const productId = document.getElementById('product-name').getAttribute('data-id');
    const productName = document.getElementById('product-name').textContent;
    const productPrice = parseFloat(document.getElementById('product-name').getAttribute('data-price'));
    const quantity = parseInt(document.getElementById('quantity').value);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += quantity;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    window.location.href = 'checkout.html';
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
    updateCartItems();
}

function updateCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
        `;
        cartItems.appendChild(cartItem);
    });

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
}

function proceedToCheckout() {
    window.location.href = 'checkout.html';
}

function loadCheckoutItems() {
    const checkoutItems = document.getElementById('checkout-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    checkoutItems.innerHTML = '';

    cart.forEach(item => {
        const checkoutItem = document.createElement('div');
        checkoutItem.classList.add('checkout-item');
        checkoutItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
        `;
        checkoutItems.appendChild(checkoutItem);
    });

    const checkoutTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('checkout-total').textContent = checkoutTotal.toFixed(2);
}

function finalizePurchase() {
    alert('Compra realizada con éxito');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}

