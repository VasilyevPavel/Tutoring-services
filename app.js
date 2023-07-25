require('@babel/register');
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const ssr = require('./src/middlewares/ssr');

const app = express();

const indexRoutes = require('./src/routes/index.routes');
const authRoutes = require('./src/routes/auth.routes');
const lessonsRouter = require('./src/routes/lessons.routes');
const teacherRouter = require('./src/routes/teacher.router');

const { PORT = 3000, COOKIE_SEKRET = 'secret' } = process.env;
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(ssr);
app.use(morgan('dev'));
app.use(express.json());
app.use(
  session({
    name: 'UserAuth',
    store: new FileStore(),
    secret: COOKIE_SEKRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 2,
      httpOnly: true,
    },
  }),
);

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/student/lessons', lessonsRouter);
app.use('/teacher', teacherRouter);

app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}`);
});
