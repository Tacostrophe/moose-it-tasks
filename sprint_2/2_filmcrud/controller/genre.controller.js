/* eslint-disable class-methods-use-this */
const Controller = require('./base.controller');
const db = require('../db');

class GenreController extends Controller {
  async create(request, response) {
    const { name } = request.body;
    if (super.containUndefined(name)) {
      response.end('Wrong input');
      return;
    }

    const newGenre = await db.query(
      'INSERT INTO genre (name) VALUES ($1) RETURNING *;',
      [name],
    );
    response.json(newGenre.rows[0]);
  }

  async list(request, response) {
    const genre = await db.query('SELECT * FROM genre');
    response.json(genre.rows);
  }

  async retrieve(request, response) {
    const { pk } = request.params;
    const genre = await db.query(
      'SELECT * FROM genre WHERE pk=$1',
      [pk],
    );
    response.json(genre.rows[0]);
  }

  async update(request, response) {
    const { pk, name } = request.body;
    if (super.containUndefined(pk, name)) {
      response.end('Wrong input');
      return;
    }

    const updatedGenre = await db.query(
      'UPDATE genre SET name=$1 WHERE pk=$2 RETURNING *',
      [name, pk],
    );
    response.json(updatedGenre.rows[0]);
  }

  async destroy(request, response) {
    const { pk } = request.params;
    const genre = await db.query(
      'DELETE FROM genre WHERE pk=$1',
      [pk],
    );
    response.json(genre.rows[0]);
  }
}

module.exports = new GenreController();
