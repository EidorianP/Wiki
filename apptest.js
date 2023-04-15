const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");
const mysql = require("mysql");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "randomwiki",
});

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.use(express.static("css"));
app.use(express.static("js"));
app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.get("/", async (req, res) => {
  const getRandomPageTitle = async () => {
    const params = {
      action: "query",
      format: "json",
      list: "random",
      rnlimit: 1,
      rnnamespace: 0,
      srnamespace: 0,
    };
    const response = await axios.get("https://fr.wikipedia.org/w/api.php", {
      params: params,
    });

    return response.data.query.random[0].title;
  };

  const getExtract = async (title) => {
    const params = {
      action: "query",
      format: "json",
      prop: "extracts",
      titles: title,
      explaintext: false,
      exsectionformat: "plain",
      exlimit: "max",
    };
    const response = await axios.get("https://fr.wikipedia.org/w/api.php", {
      params: params,
    });
    const pageid = Object.keys(response.data.query.pages)[0];

    return response.data.query.pages[pageid].extract;
  };

  const renderPage = async (title, extract) => {
    const regex = /[\p{L}\d]+/gu;
    extract = extract.replace(
      regex,
      (match, i) =>
        `<span class="gamewordfalse" style="--match-length: ${match.length};" id=${i}>${match.length}</span>`
    );

    res.render("gamepagepug", {
      title: title,
      extract: extract,
      email: req.session.email,
      username: req.session.username,
    });
  };

  const retryIfConditionsNotMet = async () => {
    const title = await getRandomPageTitle();
    app.locals.extract = await getExtract(title);

    if (app.locals.extract.length < 600 || app.locals.extract.length > 11100) {
      console.log(`Extract length: ${app.locals.extract.length} Retrying...`);
      await retryIfConditionsNotMet();
    } else {
      await renderPage(title, app.locals.extract);
    }
  };

  await retryIfConditionsNotMet().catch((error) => {
    console.log(error);
    res.status(500).json({ message: "Erreur lors de la requête" });
  });
});

app.post("/search", async (req, res) => {
  const searchQuery = req.query.query;

  const regex = new RegExp(`\\b${searchQuery}\\b`);

  // const regex = new RegExp(searchQuery, "gi");
  // console.log(app.locals);

  if (regex.test(app.locals.extract)) {
    const text = app.locals.extract;
    const words = text.trim().split(/[\s,']+/);
    console.log(words);
    let positions = [];
    words.forEach((word, i) => {
      if (word === searchQuery) {
        positions.push(i);
      }
    });
    console.log(positions);
    console.log(searchQuery);

    // let position = text.indexOf(searchQuery);
    // console.log(position);
    //console.log(`Le mot "${searchQuery}" a été trouvé dans le texte.`);
    const replacedExtract = replaceWordsInExtract(
      app.locals.extract,
      searchQuery
    );

    console.log({ position: positions, word: searchQuery });
    res
      .send({
        status: true,
        positions: positions,
        word: searchQuery,
      })
      .status(200);
    // res.render("gamepagepug", {
    //   title: "Game Page",
    //   extract: replacedExtract,
    //   email: req.session.email,
    //   username: req.session.username,
    // });
  } else {
    //console.log(`Le mot "${searchQuery}" n'a pas été trouvé dans le texte.`);
    res
      .send({
        status: false,
      })
      .status(200);
  }
});

function replaceWordsInExtract(extract, searchQuery) {
  const regex = new RegExp(searchQuery, "gi");
  return extract
    .replace(
      regex,
      (match) =>
        `<span class="gamewordtrue" style="--match-length: ${match.length};">${searchQuery}</span>`
    )
    .replace(
      /<span class="gamewordfalse" style="--match-length: (\d+);">(\d+)<\/span>/g,
      (match, length) =>
        `<span class="gamewordfalse" style="--match-length: ${length};">${searchQuery.length}</span>`
    );
}

//
app.get("/login", async (req, res) => {
  res.render("login");
});

app.get("/register", async (req, res) => {
  res.render("register");
});

app.post("/register/add", async (req, res) => {
  const { username, email, password, password_confirm } = req.body;

  connection.query('SELECT email FROM accounts WHERE email = ?', [email], async (error, results) => {

    if( results.length > 0 ) {
    console.log("email déjà utilisé");
    return res.render('register', {
        message: 'This email is already in use'
  
    })
}   else if(password !== password_confirm) {
  console.log("mdp déjà utilisé");
    return res.render('register', {
        message: 'Passwords do not match!'
    })
}

let hashedPassword = await bcrypt.hash(password, 8)

connection.query('INSERT INTO accounts SET?', {username: username, email: email, password: hashedPassword}, (error, response) => {
    if(error) {
        console.log(error)
    } else {
      res.redirect("/");
    }
})
 })
});

app.post("/login/check", (req, res) => {
  let session = req.session;
  let email = req.body.email;
  let password = req.body.password;

  if (email && password) {
    connection.connect((error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("MySQL connected!");
      }
    });

    connection.query(
      "SELECT * FROM accounts WHERE email = ? AND password = ?",
      [email, password],
      function (error, results, fields) {
        if (error) throw error;

        if (results.length > 0) {
          session.loggedin = true;
          session.email = email;
          session.username = results[0].username;
          console.log(req.session);

          res.redirect("/");
        } else {
          console.log("Incorrect Username and/or Password!");
        }

        res.end();
      },
      () => {
        console.log("Deuxième requête ok");
      }
    );
  }
});

app.listen(3000);
