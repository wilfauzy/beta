const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
let allCoins = [];

async function fetchCryptoData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        allCoins = data;
        displayCryptoData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayCryptoData(coins) {
    const cryptoList = document.getElementById('cryptoList');
    cryptoList.innerHTML = '';

    coins.forEach(coin => {
        const priceChangeClass = coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative';
        
        const cryptoCard = document.createElement('div');
        cryptoCard.className = 'crypto-card';
        cryptoCard.innerHTML = `
            <div class="crypto-header">
                <img src="${coin.image}" alt="${coin.name}" class="crypto-logo">
                <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
            </div>
            <div class="crypto-price">
                <p>$${coin.current_price.toLocaleString()}</p>
                <p class="${priceChangeClass}">${coin.price_change_percentage_24h.toFixed(2)}%</p>
            </div>
            <div class="crypto-market-cap">
                <p>Kap Pasar: $${coin.market_cap.toLocaleString()}</p>
            </div>
        `;
        
        cryptoList.appendChild(cryptoCard);
    });
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCoins = allCoins.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm) || 
        coin.symbol.toLowerCase().includes(searchTerm)
    );
    displayCryptoData(filteredCoins);
});

// Auto-refresh every 30 seconds
setInterval(fetchCryptoData, 30000);

// Initial load
fetchCryptoData();