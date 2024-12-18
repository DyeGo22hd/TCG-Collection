
//allows for getting the user collection from the database and outputs them
document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');
    const collectionContainer = document.getElementById('collection-results');
    //sees if the user is logged in if not go to the login page
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

        // Add Remove Card functionality from the collection and DB
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
