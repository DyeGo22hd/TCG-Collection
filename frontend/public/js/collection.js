document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
        alert('You must be logged in to view your collection.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`/api/collection/${userId}`);
        const cards = await response.json();

        const container = document.getElementById('collection-results');
        container.innerHTML = ''; // Clear previous results

        if (cards.length === 0) {
            container.innerHTML = '<p>Your collection is empty.</p>';
            return;
        }

        cards.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = `
                <img src="${card.card_image}" alt="${card.card_name}" class="card-image" />
                <p>${card.card_name}</p>
            `;
            container.appendChild(cardDiv);
        });
    } catch (error) {
        console.error('Error fetching collection:', error.message);
        alert('Failed to load your collection.');
    }
});
document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');
    const collectionContainer = document.getElementById('collection-results');

    if (!userId) {
        alert('Please log in to view your collection.');
        window.location.href = 'login.html';
        return;
    }

    // Fetch the user's collection
    try {
        const response = await fetch(`/api/collection/${userId}`);
        const data = await response.json();

        // Display cards in the collection
        collectionContainer.innerHTML = '';
        data.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.innerHTML = `
                <img src="${card.card_image}" alt="${card.card_name}" />
                <p>${card.card_name}</p>
                <button class="remove-btn" data-card-id="${card.card_id}">Remove</button>
            `;
            collectionContainer.appendChild(cardElement);
        });

        // Add Remove Card functionality
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const cardId = e.target.getAttribute('data-card-id');

                try {
                    const removeResponse = await fetch('/api/collection/remove', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId, cardId }),
                    });

                    const result = await removeResponse.json();
                    if (removeResponse.ok) {
                        alert('Card removed successfully.');
                        e.target.parentElement.remove(); // Remove card from DOM
                    } else {
                        alert(`Error: ${result.error}`);
                    }
                } catch (error) {
                    console.error('Error removing card:', error);
                    alert('Failed to remove card.');
                }
            });
        });
    } catch (error) {
        console.error('Error fetching collection:', error);
        alert('Failed to load collection.');
    }
});
