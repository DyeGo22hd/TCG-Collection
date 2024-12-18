-- Database: tcg_collection

-- DROP DATABASE IF EXISTS tcg_collection;

CREATE DATABASE tcg_collection
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE "User_Data" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE "Collection" (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "User_Data"(id) ON DELETE CASCADE,
    card_id VARCHAR(255) NOT NULL,
    card_name VARCHAR(255) NOT NULL,
    card_image TEXT NOT NULL
);