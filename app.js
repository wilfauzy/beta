// Wallet Connect (Example using Web3Modal)
document.getElementById('connectWallet').addEventListener('click', async () => {
    try {
        // Add actual wallet connection logic here
        alert('Wallet connection feature coming soon!');
    } catch (error) {
        console.error('Wallet connection error:', error);
    }
});

// Fetch Crypto Data
async function fetchCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        const data = await response.json();
        displayCryptoData(data);
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}

// Display Crypto Data
function displayCryptoData(data) {
    const container = document.getElementById('cryptoContainer');
    container.innerHTML = '';

    data.forEach(coin => {
        const card = document.createElement('div');
        card.className = 'crypto-card';
        card.innerHTML = `
            <div class="crypto-header">
                <img src="${coin.image}" alt="${coin.name}" width="30">
                <h3>${coin.name}</h3>
                <span>${coin.symbol.toUpperCase()}</span>
            </div>
            <div class="crypto-price">
                <p>$${coin.current_price.toLocaleString()}</p>
                <p class="${coin.price_change_percentage_24h < 0 ? 'negative' : 'positive'}">
                    ${coin.price_change_percentage_24h.toFixed(2)}%
                </p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Auto-refresh every 30 seconds
setInterval(fetchCryptoData, 30000);

// Initial load
fetchCryptoData();