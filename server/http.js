const express = require('express');
const { engine } = require('express-handlebars');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const indexRouter = require('../routes/index.js');

const app = express();

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Set Template Engine
app.engine('hbs', engine({
  layoutsDir: path.join(__dirname, '../views', 'layouts'),
  extname: 'hbs',
}));
app.set('view engine', 'hbs');

// Express Configuration
app.set('views', path.join(__dirname, '../views'));

// Routes
app.use('/', indexRouter);

const serverHttp = http.createServer(app);
const io = new Server(serverHttp);

module.exports = { serverHttp, io };
