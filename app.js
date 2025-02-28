// PWA Installation
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.querySelector('.install-btn').style.display = 'block';
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Fetch Crypto Data
async function fetchCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        const data = await response.json();
        populateCryptoTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function populateCryptoTable(data) {
    const tbody = document.getElementById('cryptoList');
    tbody.innerHTML = '';
    
    data.forEach((coin, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <img src="${coin.image}" alt="${coin.name}" width="20">
                ${coin.name} (${coin.symbol.toUpperCase()})
            </td>
            <td>$${coin.current_price.toLocaleString()}</td>
            <td class="${coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}">
                ${coin.price_change_percentage_24h.toFixed(2)}%
            </td>
            <td>$${coin.market_cap.toLocaleString()}</td>
        `;
        tbody.appendChild(row);
    });
}

// Search Functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#cryptoList tr');
    
    rows.forEach(row => {
        const name = row.children[1].textContent.toLowerCase();
        row.style.display = name.includes(searchTerm) ? '' : 'none';
    });
});

// Auto Refresh
setInterval(fetchCryptoData, 30000);

// Initial Load
fetchCryptoData();