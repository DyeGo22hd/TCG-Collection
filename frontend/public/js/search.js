// Function to fetch and display search results
const searchCards = async () => {
    const query = document.getElementById('search-bar').value.trim();

    if (!query) {
        alert('Please enter a set name to search.');
        return;
    }

    try {
        // Fetch results from the backend API
        const response = await fetch(`/api/search-set?query=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to fetch search results');

        const result = await response.json();
        console.log('API Response:', result); // Log the API response for debugging

        if (result.type === 'set') {
            displaySearchResults(result.data);
        } else {
            alert('Invalid data returned from the server.');
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while fetching search results.');
    }
};

let userCollection = []; // Array to store the user's collection temporarily

// Function to display search results
const displaySearchResults = (cards) => {
    const container = document.getElementById('search-results');
    container.innerHTML = ''; // Clear previous results

    if (!cards || cards.length === 0) {
        container.innerHTML = '<p>No cards found for this set.</p>';
        return;
    }

    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.dataset.id = card.id; // Store card ID for identification

        // Render the card
        cardDiv.innerHTML = `
            <img src="${card.image}" alt="${card.name}" class="card-image" />
            <p>${card.name}</p>
        `;

        // Add hover and click behavior
        cardDiv.addEventListener('click', () => handleCardClick(cardDiv, card));

        container.appendChild(cardDiv);
    });
};

const handleCardClick = async (cardDiv, card) => {
    const userChoice = confirm(`Do you want to add "${card.name}" to your collection?`);

    if (userChoice) {
        const userId = localStorage.getItem('userId'); // Retrieve logged-in user's ID

        if (!userId) {
            alert('You must be logged in to add cards to your collection.');
            return;
        }

        try {
            const response = await fetch('/api/collection/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    cardId: card.id,
                    cardName: card.name,
                    cardImage: card.image
                })
            });

            const data = await response.json();
            if (response.ok) {
                // Apply the blur effect and mark the card as added
                cardDiv.classList.add('blurred');
                console.log('Card added to collection:', data.message);
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error adding card:', error.message);
            alert('Failed to add card to collection.');
        }
    }
};


// Automatically trigger search if query exists in URL
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');

    if (query) {
        fetch(`/api/search-set?query=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(data => {
                if (data.type === 'set') {
                    displaySearchResults(data.data);
                }
            })
            .catch(err => console.error('Error fetching search results:', err));
    }
});


// Function to search cards when query comes from URL
const searchCardsFromURL = async (query) => {
    try {
        const response = await fetch(`/api/search-set?query=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to fetch search results');

        const result = await response.json();
        console.log('API Response:', result); // Debug log

        if (result.type === 'set') {
            displaySearchResults(result.data);
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while fetching search results.');
    }
};

function renderSearchResults(cards) {
    const container = document.getElementById('search-results');
    container.innerHTML = ''; // Clear previous results

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
            <p>${card.name}</p>
        `;
        container.appendChild(cardElement);
    });
}
