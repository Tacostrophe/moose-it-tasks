/* eslint-disable no-console */
const express = require('express');
const filmRouter = require('./routes/film.routes');
const genreRouter = require('./routes/genre.routes');

const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(express.json());
app.use('/api/film/', filmRouter);
app.use('/api/genre/', genreRouter);

app.listen(PORT, () => (console.log(`server started on port ${PORT}`)));
