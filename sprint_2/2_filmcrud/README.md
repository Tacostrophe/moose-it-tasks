# filmCRUD

## Описание

filmCRUD - маленький сервер на nodeJS, который работает с упрощенной базой данных фильмов

## Требования к БД

таблица жанров:

- pk;

- название жанра.

таблица фильмов:

- pk;

- название;

- год выпуска.

у каждого фильма может быть несколько жанров

## Требования к js

Реализовать на nodeJS CRUD опреации для взаимодействия с жанрами с CRUD операции для взаимодействия с фильмами.

Тестировать свою работу можно через postman. В качестве результатов сервер просто возвращает данные в JSON формате.