/* eslint-disable class-methods-use-this */
const Controller = require('./base.controller');
const db = require('../db');

class FilmController extends Controller {
  async create(request, response) {
    const { name, releaseYear, genresPk } = request.body;
    if (super.containUndefined(name, releaseYear, genresPk)) {
      response.end('Wrong input');
      return;
    }

    const newFilm = await db.query(
      'INSERT INTO film (name, releaseYear) VALUES ($1, $2) RETURNING *;',
      [name, releaseYear],
    );
    const newFilmPk = newFilm.rows[0].pk;

    const createFilmGenreBonds = [];
    genresPk.forEach((genrePk) => {
      createFilmGenreBonds.push(
        db.query(
          'INSERT INTO film_genre (filmPk, genrePk) VALUES ($1, $2);',
          [newFilmPk, genrePk],
        ),
      );
    });
    await Promise.all(createFilmGenreBonds);

    const genres = await db.query(
      `SELECT genre.name AS name, genre.pk AS pk
      FROM genre
      LEFT JOIN film_genre ON genre.pk=film_genre.genrePk
      WHERE film_genre.filmPk=$1;`,
      [newFilmPk],
    );
    newFilm.rows[0].genres = genres.rows;
    response.json(newFilm.rows[0]);
  }

  async list(request, response) {
    const films = await db.query(
      'SELECT film.name AS name, film.pk AS pk, film.releaseYear AS releaseyear FROM film;',
    );
    // eslint-disable-next-line no-restricted-syntax
    for (const film of films.rows) {
      const genres = await db.query(
        `SELECT genre.name AS name, genre.pk AS pk
        FROM genre
        LEFT JOIN film_genre ON genre.pk=film_genre.genrePk
        WHERE film_genre.filmPk=$1;`,
        [film.pk],
      );
      film.genres = genres.rows;
    }
    response.json(films.rows);
  }

  async retrieve(request, response) {
    const { pk } = request.params;
    const film = await db.query(
      'SELECT * FROM film WHERE pk=$1',
      [pk],
    );
    const genres = await db.query(
      `SELECT genre.name AS name, genre.pk AS pk
      FROM genre
      LEFT JOIN film_genre ON genre.pk=film_genre.genrePk
      WHERE film_genre.filmPk=$1;`,
      [pk],
    );
    film.rows[0].genres = genres.rows;
    response.json(film.rows[0]);
  }

  async update(request, response) {
    const {
      pk, name, releaseYear, genresPk,
    } = request.body;
    if (super.containUndefined(pk, name, releaseYear, genresPk)) {
      response.end('Wrong input');
      return;
    }

    const updatedFilm = await db.query(
      'UPDATE film SET name=$1, releaseYear=$2 WHERE pk=$3 RETURNING *',
      [name, releaseYear, pk],
    );

    await db.query(
      'DELETE FROM film_genre WHERE filmPk=$1;',
      [pk],
    );

    const createFilmGenreBonds = [];
    genresPk.forEach((genrePk) => {
      createFilmGenreBonds.push(
        db.query(
          'INSERT INTO film_genre (filmPk, genrePk) VALUES ($1, $2);',
          [pk, genrePk],
        ),
      );
    });
    await Promise.all(createFilmGenreBonds);

    const genres = await db.query(
      `SELECT genre.name AS name, genre.pk AS pk
      FROM genre
      LEFT JOIN film_genre ON genre.pk=film_genre.genrePk
      WHERE film_genre.filmPk=$1;`,
      [pk],
    );

    updatedFilm.rows[0].genres = genres.rows;

    response.json(updatedFilm.rows[0]);
  }

  async destroy(request, response) {
    const { pk } = request.params;
    const film = await db.query('DELETE FROM film WHERE pk=$1', [pk]);
    response.json(film.rows[0]);
  }
}

module.exports = new FilmController();
