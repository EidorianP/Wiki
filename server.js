const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('./css'));

app.set('view engine','pug')

app.get("/",(req,res)=>{
    res.render('gamepagepug.pug')
})

app.listen(3000);