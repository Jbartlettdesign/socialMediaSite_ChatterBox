const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

//const fileUpload = require('express-fileupload');
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
///session
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'mySecret',
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));
/////////////////////////////////
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

//app.use(fileUpload());



sequelize.sync({force: false}).then (() => {
    app.listen(PORT, () => console.log('Now listening'));
});
