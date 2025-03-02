const cryptoData = document.getElementById('crypto-data');

async function getCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();

        let tableRows = '';
        data.forEach(coin => {
            tableRows += `
                <tr>
                    <td>${coin.name}</td>
                    <td>$${coin.current_price}</td>
                    <td>${coin.price_change_percentage_24h}%</td>
                </tr>
            `;
        });
        cryptoData.innerHTML = tableRows;
    } catch (error) {
        console.error('Error fetching data:', error);
        cryptoData.innerHTML = '<tr><td colspan="3">Gagal mengambil data.</td></tr>';
    }
}

// Panggil fungsi untuk pertama kali
getCryptoData();

// Refresh data setiap 60 detik
setInterval(getCryptoData, 60000);
