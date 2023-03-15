DROP DATABASE IF EXISTS kinopostgres;

CREATE DATABASE kinopostgres;
\connect kinopostgres

CREATE TABLE kino_user (
    id serial PRIMARY KEY,
    nickname varchar(64) NOT NULL
);

CREATE TABLE country (
    id serial PRIMARY KEY,
    name varchar(64),
    flag_path text
);

CREATE TABLE language (
    id serial PRIMARY KEY,
    name varchar(64)
);

CREATE TABLE person (
    id serial PRIMARY KEY,
    name varchar(64) NOT NULL,
    country_id integer REFERENCES country
);

CREATE TABLE genre (
    id serial PRIMARY KEY,
    name varchar(64) NOT NULL
);

CREATE TABLE award (
    id serial PRIMARY KEY,
    name varchar(64) NOT NULL,
    year integer CHECK (year > 1800)
);

CREATE TABLE film (
    id serial PRIMARY KEY,
    title text NOT NULL,
    description text,
    video_quality varchar(3) CHECK (video_quality IN ('SD', 'HD', 'FHD', 'QHD', '2K', '4K', '8K')),
    poster_path text,
    trailer_path text,
    production_year integer CHECK (production_year > 1800),
    production_country_id integer REFERENCES country,
    slogan text,
    director_id integer REFERENCES person,
    screenwriter_id integer REFERENCES person,
    producer_id integer REFERENCES person,
    operator_id integer REFERENCES person,
    composer_id integer REFERENCES person,
    artist_id integer REFERENCES person,
    editor_id integer REFERENCES person,
    budget numeric,
    marketing numeric,
    dvd_release date,
    age_limit integer CHECK( age_limit > 0),
    mpaa_rating varchar(5) CHECK ( mpaa_rating IN ('G', 'PG', 'PG-13', 'R', 'NC-17')),
    duration_min integer CHECK ( duration_min > 0)
);

CREATE TABLE film_user (
    film_id integer REFERENCES film,
    user_id integer REFERENCES kino_user,
    rating integer NOT NULL CHECK (rating BETWEEN 1 AND 10),
    review text,
    PRIMARY KEY (film_id, user_id)
);

CREATE TABLE film_country (
    film_id integer REFERENCES film,
    country_id integer REFERENCES country,
    fees numeric CHECK (fees > 0),
    viewers integer CHECK (viewers > 0),
    premiere_date date
);

CREATE TABLE film_genre (
    film_id integer REFERENCES film,
    genre_id integer REFERENCES genre,
    PRIMARY KEY (film_id, genre_id)
);

-- table of audio_tracks and subtitles to film
CREATE TABLE film_language (
    film_id integer REFERENCES film,
    language_id integer REFERENCES language,
    audio_track_path text,
    subtitle_path text,
    PRIMARY KEY (film_id, language_id),
    CHECK (audio_track_path IS NOT NULL OR subtitle_path IS NOT NULL)
);

CREATE TABLE film_person (
    film_id integer REFERENCES film,
    person_id integer REFERENCES person,
    dubbed boolean DEFAULT false,
    PRIMARY KEY (film_id, person_id)
);

CREATE TABLE film_award (
    film_id integer REFERENCES film,
    award_id integer REFERENCES award,
    nomination text,
    PRIMARY KEY (film_id, award_id, nomination)
);
