DROP DATABASE IF EXISTS filmcrud_db;

CREATE DATABASE filmcrud_db;

\c filmcrud_db

CREATE TABLE genre (
    pk serial PRIMARY KEY,
    name varchar (63) NOT NULL
);

CREATE TABLE film (
    pk serial PRIMARY KEY,
    name varchar (63) NOT NULL,
    releaseYear integer CHECK (releaseYear > 1800)
);

CREATE TABLE film_genre (
    filmPk integer REFERENCES film ON DELETE CASCADE,
    genrePk integer REFERENCES genre ON DELETE CASCADE,
    PRIMARY KEY (filmPk, genrePk)
);