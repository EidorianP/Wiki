const express = require('express');
const axios = require('axios');
const app = express();
const path = require("path");
const mysql = require('mysql');
const session = require('express-session');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'randomwiki'
});


app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static('css'));
app.use(express.static('js'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


app.get('/test', async (req, res) => {
    const getRandomPageTitle = async () => {
        const params = {
            action: 'query',
            format: 'json',
            list: 'random',
            rnnamespace: 0,
            srnamespace: 0,
            rnlimit: 1,
        };
        const response = await axios.get('https://fr.wikipedia.org/w/api.php', { params: params });

        return response.data.query.random[0].title;
    };

    const getExtract = async (title) => {
        const params = {
            action: 'query',
            format: 'json',
            prop: 'extracts',
            titles: title,
            explaintext: false,
            exsectionformat: 'plain',
            exlimit: 'max',
        };
        const response = await axios.get('https://fr.wikipedia.org/w/api.php', { params: params });
        const pageid = Object.keys(response.data.query.pages)[0];

        return response.data.query.pages[pageid].extract;
    };

    const renderPage = async (title, extract) => {
        const regex = /[\p{L}\d]+/gu;
        extract = extract.replace(regex, (match) => `<span class="gamewordfalse" style="--match-length: ${match.length};">${match.length}</span>`);
        res.render('gamepagepug', { title: title, extract: extract });
    };

    const retryIfConditionsNotMet = async () => {
        const title = await getRandomPageTitle();
        app.locals.extract = await getExtract(title);

        if (app.locals.extract.length < 600 || app.locals.extract.length > 1100) {
            console.log(`Extract length: ${app.locals.extract.length} Retrying...`);
            await retryIfConditionsNotMet();
        } else {
            await renderPage(title, app.locals.extract);
        }
    };

    await retryIfConditionsNotMet().catch((error) => {
        console.log(error);
        res.status(500).json({ message: 'Erreur lors de la requête' });
    });
});

app.get('/search', async (req, res) => {
    const searchQuery = req.query.query;
    const regex = new RegExp(searchQuery, "gi");

    console.log(app.locals);

    if (regex.test(app.locals.extract)) {
        console.log(`Le mot "${searchQuery}" a été trouvé dans le texte.`);
    } else {
        console.log(`Le mot "${searchQuery}" n'a pas été trouvé dans le texte.`);
    }

    res.send('okay');
});

//
app.all('/login', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    // Ensure the input fields exists and are not empty
    if (email && password) {

        connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
            if (error) throw error;

            if (results.length > 0) {
                console.log('bravo')
                req.session.loggedin = true;
                req.session.email = email;

                 // res.redirect('/home');
            } else {
                console.log('Bonjour')
                // res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
        console.log(email, password)
    }
    /*
       } else {
           res.render('login')
       } */
    res.render('login')
});

app.listen(3000);