const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const path = require('path');
const controllers = require('./controllers');
const sequelize = require('./config/connection');

const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

const sess = {
  secret: 'doordonotthereisnotry',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(controllers);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server now listening on port#${PORT}`));
});