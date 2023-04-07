const express = require('express');
const axios = require('axios');
const app = express();
const path = require("path");

app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "views"));
app.use(express.static('css'));
app.use(express.static('js'));

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
        const response = await axios.get('https://fr.wikipedia.org/w/api.php', {params: params});

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
        const response = await axios.get('https://fr.wikipedia.org/w/api.php', {params: params});
        const pageid = Object.keys(response.data.query.pages)[0];

        return response.data.query.pages[pageid].extract;
    };

    const renderPage = async (title, extract) => {
        const regex = /\b[\wàâçéèêëîïôûùüÿñ]+\b/gi;
        extract = extract.replace(regex, (match) => `<span class="highlight" style="--match-length: ${match.length};">${match.length}</span>`);
        res.render('gamepagepug', {title: title, extract: extract});
    };

    const retryIfConditionsNotMet = async () => {
        const title = await getRandomPageTitle();
        const extract = await getExtract(title);

        if (extract.length < 600 || extract.length > 1100) {
            console.log(`Extract length: ${extract.length} Retrying...`);
            await retryIfConditionsNotMet();
        } else {
            await renderPage(title, extract);
        }
    };

    await retryIfConditionsNotMet().catch((error) => {
        console.log(error);
        res.status(500).json({message: 'Erreur lors de la requête'});
    });
});

app.listen(3000);