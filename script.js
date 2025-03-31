// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Language Toggle Functionality
const languageToggle = document.getElementById('languageToggle');
const currentLanguage = localStorage.getItem('language') || 'es';

// Set initial language
updateContent(currentLanguage);
updateLanguageButton(currentLanguage);

languageToggle.addEventListener('click', () => {
    const currentLanguage = localStorage.getItem('language') || 'es';
    const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
    
    localStorage.setItem('language', newLanguage);
    updateContent(newLanguage);
    updateLanguageButton(newLanguage);
});

function updateContent(language) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translations[language][key];
    });
}

function updateLanguageButton(language) {
    const buttonText = languageToggle.querySelector('span');
    buttonText.textContent = language === 'es' ? 'EN' : 'ES';
}

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Enhanced products data with categories
const products = [
    {
        id: 1,
        name: 'Procesador Intel Core i9',
        price: 499,
        image: 'https://images.pexels.com/photos/1266982/pexels-photo-1266982.jpeg',
        category: 'cpu'
    },
    {
        id: 2,
        name: 'Tarjeta Gráfica RTX 4090',
        price: 1599,
        image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg'
    },
    {
        id: 3,
        name: 'Memoria RAM 32GB DDR5',
        price: 199,
        image: 'https://images.pexels.com/photos/2588757/pexels-photo-2588757.jpeg'
    }
];

// Load featured products on homepage
if (document.querySelector('main')) {
    const productsContainer = document.querySelector('.grid');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold">${product.name}</h3>
                <p class="text-blue-600 dark:text-blue-400 font-bold my-2">$${product.price}</p>
                <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '"')})" 
                        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" 
                        data-i18n="addToCart">Añadir al carrito</button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}