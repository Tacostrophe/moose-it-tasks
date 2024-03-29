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
    country_id integer REFERENCES country ON DELETE SET NULL
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
    production_country_id integer REFERENCES country ON DELETE SET NULL,
    slogan text,
    director_id integer REFERENCES person ON DELETE SET NULL,
    screenwriter_id integer REFERENCES person ON DELETE SET NULL,
    producer_id integer REFERENCES person ON DELETE SET NULL,
    operator_id integer REFERENCES person ON DELETE SET NULL,
    composer_id integer REFERENCES person ON DELETE SET NULL,
    artist_id integer REFERENCES person ON DELETE SET NULL,
    editor_id integer REFERENCES person ON DELETE SET NULL,
    budget numeric,
    marketing numeric,
    dvd_release date,
    age_limit integer CHECK( age_limit > 0),
    mpaa_rating varchar(5) CHECK ( mpaa_rating IN ('G', 'PG', 'PG-13', 'R', 'NC-17')),
    duration_min integer CHECK ( duration_min > 0)
);

CREATE TABLE film_user (
    film_id integer REFERENCES film ON DELETE CASCADE,
    user_id integer REFERENCES kino_user ON DELETE CASCADE,
    rating integer NOT NULL CHECK (rating BETWEEN 1 AND 10),
    review text,
    PRIMARY KEY (film_id, user_id)
);

CREATE TABLE film_country (
    film_id integer REFERENCES film ON DELETE CASCADE,
    country_id integer REFERENCES country ON DELETE CASCADE,
    fees numeric CHECK (fees > 0),
    viewers integer CHECK (viewers > 0),
    premiere_date date
);

CREATE TABLE film_genre (
    film_id integer REFERENCES film ON DELETE CASCADE,
    genre_id integer REFERENCES genre ON DELETE CASCADE,
    PRIMARY KEY (film_id, genre_id)
);

-- table of audio_tracks and subtitles to film
CREATE TABLE film_language (
    film_id integer REFERENCES film ON DELETE CASCADE,
    language_id integer REFERENCES language ON DELETE CASCADE,
    audio_track_path text,
    subtitle_path text,
    PRIMARY KEY (film_id, language_id),
    CHECK (audio_track_path IS NOT NULL OR subtitle_path IS NOT NULL)
);

CREATE TABLE film_person (
    film_id integer REFERENCES film ON DELETE CASCADE,
    person_id integer REFERENCES person ON DELETE CASCADE,
    dubbed boolean DEFAULT false,
    PRIMARY KEY (film_id, person_id)
);

CREATE TABLE film_award (
    film_id integer REFERENCES film ON DELETE CASCADE,
    award_id integer REFERENCES award ON DELETE CASCADE,
    nomination text,
    PRIMARY KEY (film_id, award_id, nomination)
);
