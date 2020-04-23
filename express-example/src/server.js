const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs'); 

app.use(express.static(`${__dirname}/../public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    return res.send('Hello, express!!!');
});

app.get('/hello', (req, res) => {
    const { name } = req.query;
    return res.send(`Hello, ${name}`);
});

app.get('/hello/:name', (req, res) => {
    const { name } = req.params;

    // if (name === 'malaquias') {
    //     return res.status(404).send('Not Found');
    // }

    return res.render('index', { name });
});

app.get('/contacts', (req, res) => {
    const contacts = ['malaquias', 'alberto', 'zebedeu'];
    // return res.send(JSON.stringify(contacts));
    return res.json(contacts);
});

app.post('/', (req, res) => {
    console.log(req.body);
    const { name } = req.body;

    return res.json(`hello, ${name}`);
});

app.listen(port, () => console.log(`Started application at http://localhost:${port}`));