var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressEjsLayouts = require('express-ejs-layouts')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api')
const {User} = require('./models/index');
const passportLocal = require('./passport/passport.local');
const passportGoogle = require('./passport/passport.google');
const authMiddleWare = require('./middlewares/auth.middleware')

var app = express();

app.use(session({
  secret: 'hoainam',
  resave: false,
  saveUninitialized: true,
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser( async function(id, done) {
  const user = await User.findByPk(id);
  done(null,user);
});

passport.use('local', passportLocal);
passport.use('google', passportGoogle);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter)
app.use('/users', usersRouter);
app.use('/auth', authRouter);
// app.use(authMiddleWare);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
