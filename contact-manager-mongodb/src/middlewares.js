const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const router = express.Router();

router.use(express.static(`${__dirname}/../public`));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(session({
    secret: 'very_secret_token',
    resave: true,
    saveUninitialized: true
}));

// Authentication middleware
router.use((req, res, next) => {
    const session = req.session;

    if (!session.auth && (req.url != '/login' && req.url != '/register')) {
        return res.redirect('/login');
    }

    return next();
});

module.exports = router;