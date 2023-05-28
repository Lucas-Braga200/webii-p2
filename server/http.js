const express = require('express');
const { engine } = require('express-handlebars');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const helpers = require('../utils/helpers');
const bodyParser = require('body-parser');

const indexRouter = require('../routes/index');
const playRouter = require('../routes/play');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Static Files
app.use(express.static(path.join(__dirname, '../public')));

// Set Template Engine
app.engine('hbs', engine({
  layoutsDir: path.join(__dirname, '../views', 'layouts'),
  extname: 'hbs',
  helpers: helpers,
}));
app.set('view engine', 'hbs');

// Express Configuration
app.set('views', path.join(__dirname, '../views'));

// Routes
app.use('/', indexRouter);
app.use('/', playRouter);

const serverHttp = http.createServer(app);
const io = new Server(serverHttp);

module.exports = { serverHttp, io };
