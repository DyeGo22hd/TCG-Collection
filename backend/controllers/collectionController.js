const pool = require('../db');

// Add Card to Collection
const addCardToCollection = async (req, res) => {
    const { userId, cardId, cardName, cardImage } = req.body;

    if (!userId || !cardId || !cardName || !cardImage) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Insert into "Collection"
        await pool.query(
            `INSERT INTO "Collection" (user_id, card_id, card_name, card_image)
             VALUES ($1, $2, $3, $4)`,
            [userId, cardId, cardName, cardImage]
        );

        res.status(201).json({ message: 'Card added to collection successfully.' });
    } catch (error) {
        console.error('Error adding card to collection:', error.message);
        res.status(500).json({ error: 'Failed to add card to collection.' });
    }
};

// Get User's Collection
const getUserCollection = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query(
            `SELECT * FROM "Collection" WHERE user_id = $1`,
            [userId]
        );

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching user collection:', error.message);
        res.status(500).json({ error: 'Failed to fetch collection.' });
    }
};
// Remove Card from Collection
const removeCardFromCollection = async (req, res) => {
    const { userId, cardId } = req.body;

    if (!userId || !cardId) {
        return res.status(400).json({ error: 'User ID and Card ID are required.' });
    }

    try {
        await pool.query(
            `DELETE FROM "Collection" WHERE user_id = $1 AND card_id = $2`,
            [userId, cardId]
        );
        res.status(200).json({ message: 'Card removed from collection successfully.' });
    } catch (error) {
        console.error('Error removing card from collection:', error.message);
        res.status(500).json({ error: 'Failed to remove card from collection.' });
    }
};

module.exports = { addCardToCollection, getUserCollection, removeCardFromCollection };
