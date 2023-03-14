\connect kinopostgres

INSERT INTO kino_user (nickname)
VALUES
    ('user1'),
    ('user2'),
    ('user3');

INSERT INTO country (name)
VALUES
    ('USA'),
    ('RUSSIA'),
    ('IRELAND'),
    ('GERMANY');

INSERT INTO language (name)
VALUES
    ('английский'),
    ('русский');

INSERT INTO person (name, country_id)
VALUES
    ();

INSERT INTO genre (name)
VALUES
    ('драма'),
    ('фэнтези'),
    ('ужасы'),
    ('комедия'),
    ('криминал');

INSERT INTO award (name, year)
VALUES
    ('оскар', 2020);

INSERT INTO film (
    title, description, video_quality, poster_path, trailer_path,
    production_year, production_country_id, slogan, director, 
    screenwriter, producer, operator, composer, editor budget, marketing,
    dvd_release, age_limit, mpaa_rating, duration_min
)
VALUES
    ;

INSERT INTO film_user (film_id, user_id, rating, review)
VALUES
    (1, 1, 9, 'review text 1'),
    (1, 2, 10, 'review text 2'),
    (1, 3, 9, 'review text 3');

INSERT INTO film_country (film_id, country_id, fees, viewers, premiere_date)
VALUES
    (1, 1, 136801374, 26000000, '1999-12-6');

INSERT INTO film_genre (film_id, genre_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 5);

INSERT INTO film_language (film_id, language_id, audio_track_path, subtitle_path)
VALUES
    ;
    
INSERT INTO film_person (film_id, person_id, dubbed)
VALUES

INSERT INTO film_award (film_id, award_id, nomination)
VALUES
