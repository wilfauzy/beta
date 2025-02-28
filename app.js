const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

let deferredPrompt;

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('ServiceWorker registered');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Fetch crypto data
async function fetchCryptoData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        updateCryptoTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Update display
function updateCryptoTable(data) {
    const container = document.getElementById('crypto-table');
    container.innerHTML = data.map(coin => `
        <div class="crypto-item">
            <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
            <p>$${coin.current_price.toFixed(2)}</p>
            <p>24h: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
        </div>
    `).join('');
}

// Auto-refresh every 30 seconds
setInterval(fetchCryptoData, 30000);

// Initial load
fetchCryptoData();

// PWA Installation
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPromotion();
});

function showInstallPromotion() {
    const prompt = document.createElement('div');
    prompt.id = 'installPrompt';
    prompt.innerHTML = `
        <p>Install app for better experience!</p>
        <button onclick="installApp()">Install</button>
    `;
    document.body.appendChild(prompt);
    prompt.style.display = 'block';
}

function installApp() {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted install');
        }
        deferredPrompt = null;
    });
}