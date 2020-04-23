const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const uniqid = require('uniqid');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/../views`);

app.use(express.static(`${__dirname}/../public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routes

// Contacts list        - GET       /
// Form update          - GET       /:id/edit
// Update               - POST      /:id/edit
// Delete               - GET       /:id/delete

let contacts = [];

app.get('/', (req, res) => {
    return res.render('index', { contacts });
});

app.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    const contact = contacts.find(contact => contact.id == id);

    return res.render('form', { contact });
});

app.post('/:id/edit', (req, res) => {
    let { id } = req.params;
    const { name, email, phone } = req.body;

    if (id == 0) {
        id = uniqid();
        contacts.push({ id, name, email, phone })
    } else {
        const index = contacts.findIndex(contact => contact.id == id);
        contacts[index] = { id, name, email, phone };
    }

    return res.redirect('/');
});

app.get('/:id/delete', (req, res) => {
    const { id } = req.params;
    contacts = contacts.filter(contact => contact.id != id);

    return res.redirect('/');
});

app.listen(port, () => console.log(`Started at http://localhost:${port}`));