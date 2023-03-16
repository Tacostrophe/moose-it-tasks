const makeCRUDRouter = require('./crud.routes');
const genreController = require('../controller/genre.controller');

const router = makeCRUDRouter(genreController);

module.exports = router;
