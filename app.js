const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const pgConnection = require("./db/pool");
const pgSession = require("connect-pg-simple")(session);
const app = express();

require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new pgSession({
      pool: pgConnection,
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
  })
);
app.use(passport.session());

require("./config/passport");

app.use("/", indexRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
