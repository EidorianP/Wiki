const express = require('express');
const axios = require('axios');
const app = express();
const path = require("path");
const { title } = require('process');


app.set('view engine','pug')
app.set("views", path.join(__dirname, "views"));
app.use(express.static('css'));
app.use(express.static('js'));

app.get('/test', async (req, res) => {
  const getRandomPage = async () => {
    const params1 = {
      action: 'query',
      format: 'json',
      list: 'random',
      rnnamespace: 0,
      srnamespace: 0,
      rnlimit: 1,
    };
    const response = await axios.get('https://fr.wikipedia.org/w/api.php', { params: params1 });
    const pageid = response.data.query.random[0].id;
    const title = response.data.query.random[0].title;
    return { pageid, title };
  };

  const getExtract = async (title) => {
    const params2 = {
      action: 'query',
      format: 'json',
      prop: 'extracts',
      titles: title,
      explaintext: false,
      exsectionformat: 'plain',
      exlimit: 'max',
    };
    const response = await axios.get('https://fr.wikipedia.org/w/api.php', { params: params2 });
    const pageid = Object.keys(response.data.query.pages)[0];
    const title2 = response.data.query.pages[pageid].title;
    let extract = response.data.query.pages[pageid].extract;
    return { title: title2, extract };
  };

  const renderPage = async (title, extract) => {
    extract = extract.replace(/\b(\w+)\b/g, '<span class="highlight">$1</span>');
    res.render('gamepagepug.pug', { title: title, extract: extract });
  };

  const retryIfConditionsNotMet = async () => {
    const { pageid, title } = await getRandomPage();
    const { title: title2, extract } = await getExtract(title);

    if (extract.length < 600 || extract.length > 1100) {
      console.log(`Extract length: ${extract.length} Retrying...`);
      retryIfConditionsNotMet();
    } else {
      await renderPage(title2, extract);
    }
  };

  await retryIfConditionsNotMet().catch((error) => {
    console.log(error);
    res.status(500).json({ message: 'Erreur lors de la requête' });
  });
});

app.listen(3000);