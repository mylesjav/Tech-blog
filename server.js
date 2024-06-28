
const path = require("path");
const express = require("express");
const session = require("express-session");
const { engine } = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
require("dotenv").config();
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;

// Handlebars configuration
app.engine("handlebars", engine({ helpers }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Session configuration
const sess = {
  secret: process.env.SESS_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT:${PORT}`));
});
