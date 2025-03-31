// Product filtering functionality
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('searchInput')) return;
    
    // Enhanced products data with categories
    const allProducts = [
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
            image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg',
            category: 'gpu'
        },
        {
            id: 3,
            name: 'Memoria RAM 32GB DDR5',
            price: 199,
            image: 'https://images.pexels.com/photos/2588757/pexels-photo-2588757.jpeg',
            category: 'ram'
        },
        {
            id: 4,
            name: 'SSD 1TB NVMe',
            price: 129,
            image: 'https://images.pexels.com/photos/2582928/pexels-photo-2582928.jpeg',
            category: 'storage'
        }
    ];

    const productsContainer = document.querySelector('.grid');
    
    // Filter and display products
    function displayProducts(productsToShow) {
        productsContainer.innerHTML = '';
        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-gray-200 dark:border-gray-700';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">${product.name}</h3>
                    <p class="text-indigo-600 dark:text-indigo-400 font-bold my-2">$${product.price}</p>
                    <div class="flex space-x-2">
                        <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '"')})" 
                                class="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition" 
                                data-i18n="addToCart">Añadir al carrito</button>
                        <a href="#" class="flex-1 border border-indigo-600 text-indigo-600 dark:text-indigo-400 py-2 rounded text-center hover:bg-indigo-50 dark:hover:bg-gray-700 transition" data-i18n="viewDetails">Ver detalles</a>
                    </div>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    }

    // Initial display
    displayProducts(allProducts);

    // Filter products function
    function filterProducts() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const category = document.getElementById('categoryFilter').value;
        const priceRange = document.getElementById('priceFilter').value;
        
        const filtered = allProducts.filter(product => {
            // Search filter
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            
            // Category filter
            const matchesCategory = !category || product.category === category;
            
            // Price filter
            let matchesPrice = true;
            if (priceRange) {
                const [min, max] = priceRange.split('-').map(Number);
                if (max) {
                    matchesPrice = product.price >= min && product.price <= max;
                } else {
                    matchesPrice = product.price >= min;
                }
            }
            
            return matchesSearch && matchesCategory && matchesPrice;
        });
        
        displayProducts(filtered);
    }

    // Event listeners for filters
    document.getElementById('filterBtn').addEventListener('click', filterProducts);
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterProducts();
    });
});