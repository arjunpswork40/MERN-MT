/* eslint-disable no-undef */
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { connectDb } = require("./database/mongoConnector");
const { makeJsonResponse } = require("./utils/response");
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const { isAuthenticated } = require('./app/middlewares/auth/isAuthenticated')
const flash = require('connect-flash');
const { isExcludedUrl } = require('./utils/urlMatchCheck');
const cors = require('cors');

const app = express();
app.use(cors());
app.use((req, res, next) => {
  let activeMenu = '';
  if (req.originalUrl.startsWith('/admin')) {
    res.locals.request = req;
    activeMenu = req.path;
    res.locals.activeMenu = activeMenu;
  }
  next();
});

const indexRouter = require('./routes/index')
const stockRouter = require('./routes/stock/stockManageRoutes')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


const store = new MongoDBStore({
  uri: process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/ente-anagamaly',
  collection: 'sessions'
});

store.on('error', function (error) {
  console.log(error);
});



app.use(csrf());
app.use(function (req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
});
app.use(function (err, req, res, next) {
  const url = req.url;
  const isExcludedUrlCheck = isExcludedUrl(url)
  if (!isExcludedUrlCheck) {
    res.locals.csrfToken = '';
  }
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('uploads'));
app.use(express.static(path.join(__dirname, "public")));
app.use('/public', express.static(__dirname + '/public', {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

connectDb();
app.use("/", indexRouter);
app.use("/api",stockRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  const httpStatusCode = 403;
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const response = makeJsonResponse(err?.message, {}, {}, httpStatusCode, false);
  res.status(httpStatusCode).json(response);
});

const port = process.env.APP_PORT || 3000;

// List all routes
const routes = [];
app._router.stack.forEach(middleware => {
  if (middleware.route) {
    // Routes registered directly on the app object
    routes.push(middleware.route.path);
  } else if (middleware.name === 'router') {
    // Routes added using a router object
    middleware.handle.stack.forEach(handler => {
      const route = handler.route;
      routes.push(route.path);
    });
  }
});




console.log(routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
