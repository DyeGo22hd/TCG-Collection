# TCG-Collection

## Description
This project will cocnentrate on designing a Website/App utilizing the TCGdex API to allow users to keep track of their Pokemon card collection. Users will be able to search, add, and give tags to their card collection and be able to organize them through many options such as Name, Set, Rarity, Type, Release Date, etc. Will also use PostgreSQL for managing the data for each user. 

## Language
Javascript - for both front end and backend

## Link to Api
https://tcgdex.dev/

## Working features as of December 18, 2024
- Login/Sign Up: Users can make or login to an existing account.
- Search Bar: At the moment can only search set names not specific card names, type, rarity etc. 
- Add/Remove Card: Can add cards to user collection or remove cards.
- Database: SQL and has 2 tables one for User_Data and one for Collection (can change the connection to other hosting services if needed)

## Needs Attention/ More Work
- Other promised search filters
- Being able to share collection
- Allow to prioritize/favorite cards
- Connect card with real-time card price (need to look for api for this)
- See other hosting services

## How to run
- Make sure you have all modules installed and proper packages
- Make sure you have Node.js and express
- cd to backend folder
- run by either: "npm start" or "npm run dev"
