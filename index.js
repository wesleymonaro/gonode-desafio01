const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

const checkParams = (req, res, next) => {
  const { nome } = req.params;
  if (!nome) {
    res.redirect('/');
  } else {
    next();
  }
};

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/major/:nome?', checkParams, (req, res) => {
  const { nome } = req.params;
  res.render('major', { nome });
});

app.get('/minor/:nome?', checkParams, (req, res) => {
  const { nome } = req.params;
  res.render('minor', { nome });
});

app.post('/check', (req, res) => {
  const { nome, dtNascimento } = req.body;

  const idade = moment().diff(moment(dtNascimento, 'YYYY-MM-DD'), 'years');

  if (idade >= 18) {
    res.redirect(`/major/${nome}`);
  } else {
    res.redirect(`/minor/${nome}`);
  }
});


app.listen(3000);
