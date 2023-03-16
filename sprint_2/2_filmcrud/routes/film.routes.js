const makeCRUDRouter = require('./crud.routes');
const filmController = require('../controller/film.controller');

const router = makeCRUDRouter(filmController);

module.exports = router;
