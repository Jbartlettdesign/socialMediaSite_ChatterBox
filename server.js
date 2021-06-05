const express = require('express');
const routes = require('./controllers');
const sequalize = require('./config/connection');

const app = express();
//////////////allows us to access the any folders like public/stylesheets/style.css, its a middleware
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
//////////////////
/////handlebar
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
/////////////////////////////////
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

sequalize.sync({force: false}).then (() => {
    app.listen(PORT, () => console.log('Now listening'));
});
