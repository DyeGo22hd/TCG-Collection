const axios = require('axios');

// Function to search for cards by set name
const searchSet = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        // Fetch cards for the given set name
        const response = await axios.get(`https://api.tcgdex.net/v2/en/cards?set=${encodeURIComponent(query)}`);

        // Map and add '/high.png' to the existing image URL
        const cards = response.data.map(card => ({
            id: card.id,
            name: card.name,
            image: `${card.image}/high.png` // Append '/high.png' to the existing image URL
        }));

        res.status(200).json({ type: 'set', data: cards });
    } catch (error) {
        console.error('Error fetching set data:', error.message);
        res.status(500).json({ error: 'Failed to fetch set data' });
    }
};

module.exports = { searchSet };
