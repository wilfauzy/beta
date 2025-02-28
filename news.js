const API_KEY = '44ec1a7c6769c099e4defd3756cac0400f57165c'; // Daftar di cryptopanic.com untuk mendapatkan API key
let currentPage = 1;
let currentCurrency = 'ALL';

async function fetchNews() {
    try {
        const currencyFilter = currentCurrency !== 'ALL' ? `&currencies=${currentCurrency}` : '';
        const response = await fetch(
            `https://cryptopanic.com/api/v1/posts/?auth_token=${API_KEY}${currencyFilter}&page=${currentPage}`
        );
        const data = await response.json();
        displayNews(data.results);
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Gagal memuat berita. Silakan coba kembali.</p>';
    }
}

function displayNews(newsItems) {
    const newsContainer = document.getElementById('newsContainer');
    
    newsItems.forEach(item => {
        const newsCard = document.createElement('article');
        newsCard.className = 'news-card';
        
        const date = new Date(item.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        newsCard.innerHTML = `
            <div class="news-meta">
                <span class="news-source">${item.source.title}</span>
                <span class="news-date">${date}</span>
            </div>
            <h3 class="news-title">${item.title}</h3>
            <p class="news-snippet">${item.meta.description || ''}</p>
            <a href="${item.url}" class="news-link" target="_blank" rel="noopener">
                Baca Selengkapnya <i class="fas fa-arrow-right"></i>
            </a>
        `;
        
        newsContainer.appendChild(newsCard);
    });
}

// Event Listeners
document.getElementById('currencyFilter').addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    currentPage = 1;
    document.getElementById('newsContainer').innerHTML = '';
    fetchNews();
});

document.getElementById('loadMore').addEventListener('click', () => {
    currentPage++;
    fetchNews();
});

// Initial load
fetchNews();