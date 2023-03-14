\connect kinopostgres

INSERT INTO kino_user (nickname)
VALUES
    ('user1'),
    ('user2'),
    ('user3');

INSERT INTO country (name)
VALUES
    ('США'),
    ('Россия'),
    ('Ирландия'),
    ('Германия'),
    ('Франция'),
    ('Великобритания'),
    ('Австралия'),
    ('Казахстан'),
    ('Беларусь');

INSERT INTO language (name)
VALUES
    ('английский'),
    ('русский');

INSERT INTO person (name, country_id)
VALUES
    ('Фрэнк Дарабонт', 5),
    ('Дэвид Тэттерсолл', 6),
    ('Томас Ньюман', 1),
    ('Ричард Фрэнсис-Брюс', 7),
    ('Теренс Марш', 6),
    ('Том Хэнкс', 1),
    ('Дэвид Морс', 1),
    ('Бонни Хант', 1),
    ('Всеволод Кузнецов', 8),
    ('Владимир Антоник', 9),
    ('Любовь Германова', 2);

INSERT INTO genre (name)
VALUES
    ('драма'),
    ('фэнтези'),
    ('ужасы'),
    ('комедия'),
    ('криминал');

INSERT INTO award (name, year)
VALUES
    ('оскар', 2000);

INSERT INTO film (
    title, description, video_quality, poster_path, trailer_path,
    production_year, production_country_id, slogan, director_id, 
    screenwriter_id, producer_id, operator_id, composer_id, artist_id, editor_id,
    budget, marketing, dvd_release, age_limit, mpaa_rating, duration_min
)
VALUES 
    ('Зеленая миля', 'В тюрьме для смертников появляется заключенный с божественным даром. Мистическая драма по роману Стивена Кинга',
     'FHD', 'path/to/poster', 'path/to/trailer',
     1999, 1, 'Пол Эджкомб не верил в чудеса. Пока не столкнулся с одним из них',
     1, 1, 1, 2, 5, 3, 4, 60000000, 30000000,
     '2001-02-13', 16, 'R', 189);

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
    (1, 1, 'path/to/en/audio_track', 'path/to/en/subtitles'),
    (1, 2, null, 'path/to/rus/subtitles');
    
INSERT INTO film_person (film_id, person_id, dubbed)
VALUES
    (1, 6, false),
    (1, 7, false),
    (1, 8, false),
    (1, 9, true),
    (1, 10, true),
    (1, 11, true);

INSERT INTO film_award (film_id, award_id, nomination)
VALUES
    (1, 1, 'Лучший фильм'),
    (1, 1, 'Лучшая мужская роль второго плана'),
    (1, 1, 'Лучший адаптированный сценарий'),
    (1, 1, 'Лучший звук');
