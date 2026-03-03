const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
const bagCountElements = document.querySelectorAll('.bag-count');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// Simple Cart Count Logic
let cartCount = 0;
function updateCartCount() {
    cartCount++;
    bagCountElements.forEach(el => el.innerText = cartCount);
}

// Listen for clicks on cart icons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart') || e.target.parentElement.classList.contains('cart')) {
        e.preventDefault();
        updateCartCount();
    }
});

// API Integration for "Global Collection"
async function fetchGlobalProducts() {
    // Only fetch if on index.html or if api-container exists
    const apiContainer = document.getElementById('api-container');
    if (!apiContainer && !document.getElementById('api-products')) {
        // If not on a page that needs API products, skip
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            // Proceed to create section
        } else {
            return;
        }
    }

    try {
        const response = await fetch('https://fakestoreapi.com/products?limit=8');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function renderProducts(products) {
    const productContainers = document.querySelectorAll('.pro-container');
    // We'll add a new section for API products or replace one if needed
    // For this implementation, let's create a new section if it doesn't exist
    let apiSection = document.getElementById('api-products');

    if (!apiSection) {
        apiSection = document.createElement('section');
        apiSection.id = 'api-products';
        apiSection.classList.add('section-p1');
        apiSection.innerHTML = `
            <h2>Global Collection</h2>
            <p>Directly from the Global Market</p>
            <div class="pro-container" id="api-container"></div>
        `;
        document.querySelector('#banner').after(apiSection);
    }

    const container = document.getElementById('api-container');
    container.innerHTML = products.map(product => `
        <div class="pro">
            <img src="${product.image}" alt="${product.title}">
            <div class="des">
                <span>${product.category}</span>
                <h5>${product.title.length > 30 ? product.title.substring(0, 30) + '...' : product.title}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>$${product.price}</h4>
            </div>
            <a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a>
        </div>
    `).join('');
}

// Call the function on load
document.addEventListener('DOMContentLoaded', fetchGlobalProducts);
