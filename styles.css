// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Crypto Data Fetching
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1';
const cryptoGrid = document.getElementById('cryptoGrid');
const loading = document.getElementById('loading');

async function fetchCryptoData() {
    try {
        loading.style.display = 'block';
        const response = await fetch(API_URL);
        const data = await response.json();
        displayCryptoData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        cryptoGrid.innerHTML = `<p class="error">Data stream interrupted. Attempting to reconnect...</p>`;
    } finally {
        loading.style.display = 'none';
    }
}

function displayCryptoData(data) {
    cryptoGrid.innerHTML = data.map(crypto => `
        <div class="crypto-card">
            <h3>${crypto.name} <span class="symbol">${crypto.symbol.toUpperCase()}</span></h3>
            <p>Price: $${crypto.current_price}</p>
            <p class="${crypto.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down'}">
                24h: ${crypto.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p>Market Cap: $${crypto.market_cap.toLocaleString()}</p>
            <p>Rank: #${crypto.market_cap_rank}</p>
        </div>
    `).join('');
}

// Initial load
fetchCryptoData();

// Auto-refresh every 30 seconds
setInterval(fetchCryptoData, 30000);

// PWA Service Worker (sw.js content)
// Create this as a separate file named sw.js