const db = require('../db');

// Fetch all data from User_Data
const getUserData = async () => {
    const result = await db.query('SELECT * FROM "User_Data"'); 
    return result.rows;
};
//Fetch all data from Collection
const getCollectionData = async () => {
    const result = await db.query('SELECT * FROM "Collection"'); 
    return result.rows;
};

module.exports = { getUserData, getCollectionData };
