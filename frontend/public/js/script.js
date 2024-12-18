function redirectToLogin() {
    window.location.href = "login.html";
}

function searchCards() {
    const query = document.getElementById('search-bar').value.trim();

    if (query) {
        window.location.href = `/search.html?query=${encodeURIComponent(query)}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query) {
        fetch(`/api/search-set?query=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(data => {
                if (data.type === 'set') {
                    renderSearchResults(data.data);
                }
            })
            .catch(err => console.error('Error fetching search results:', err));
    }
});




