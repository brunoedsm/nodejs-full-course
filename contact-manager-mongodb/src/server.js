const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const middlewares = require('./middlewares');
const routes = require('./routes');

dotenv.config();

const db = mongoose.connection;
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/../views`);

app.use(middlewares);
app.use(routes);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

db.on('error', err => console.log('Error connecting to database.', err));
db.once('open', () => {
    console.log('Database connected!');
    app.listen(port, () => console.log(`Started at http://localhost:${port}`));
});