var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var jwt = require('jsonwebtoken');
var request = require('request');
var session = require('express-session');
var passport = require('passport');
var { Strategy } = require('passport-openidconnect');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'myGreatTestSecret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// set up passport for mimoto
passport.use('oidc-mimoto', new Strategy({
  issuer: 'https://mimoto-test.pie.azuma-health.tech/',
  authorizationURL: 'https://mimoto-test.pie.azuma-health.tech/connect/auth',
  tokenURL: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
  clientID: "e22e5c2e-549f-43e0-b5c2-8dde35140ab2",
  clientSecret: "6zqW76rtaKasd123yYmFouKKUOUPFfkNppU", // since this is server side, it is ok to use client/secret here
  callbackURL: 'http://localhost:3000/authorization-code/callback', 
  scope: 'urn:telematik:alter urn:telematik:display_name urn:telematik:email urn:telematik:geschlecht urn:telematik:geburtsdatum urn:telematik:given_name urn:telematik:versicherter openid'
}, (issuer,
  profile,
  context,
  idToken,
  accessToken,
  refreshToken,
  params,
  done) => {
    const decodedJwt = jwt.decode(idToken, { complete: true });
    const user = {
      id: decodedJwt.payload["ext-mimoto-original-sub-unique"],
      email: decodedJwt.payload["urn:telematik:claims:email"]
    }
    return done(null, user);
}));
passport.serializeUser((user, next) => {
  next(null, user);
});
passport.deserializeUser((obj, next) => {
  next(null, obj);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// this is used to start the full oidc auth code flow
app.use('/login-oidc-mimoto', passport.authenticate('oidc-mimoto'));

// this is used in the oidc auth code as callback endpoint
app.use('/authorization-code/callback',
  passport.authenticate('oidc-mimoto', { failureRedirect: '/error' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

// this is used to exchange for token
// how to test:
// (1) go to https://mimoto-react-examples.azuma-health.tech/oidc-live and click on login and continue untill you are redirected back and see the tokens
// (2) open http://localhost:3000/token-exchange?idToken=ID_token
// (3) you should be redirected to /profile and see email
app.get('/token-exchange',
  (req, res) => {
    var token = req.query.idToken;

    // (1) validate token (via API call) --> alternatively use JWKS directly (by prefetching from JWKS endpoint)
    var options = {
      'method': 'POST',
      'url': 'https://mimoto-test.pie.azuma-health.tech//connect/introspection',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        'token': token,
        'client_id': '03826e03-aeef-4e4c-ad02-78c245fd69a0', // ID + secret of introspection client, can be created in developer portal
        'client_secret': 'sImtpZCI6IkNFQjIwNTJFNjFBMkU0NjYyQkQwN0M4REI1Q0YzQkVGOTQ1MDMyQzYiLCJ4NXQiOiJ6cklGTG1HaTVHWXIwSHlOdGM4Nzc1UlFNc1kiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiJYMTEwN'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      
      if( JSON.parse(response.body)?.active !== true)
         throw new Error("Token not active"); // do proper error handling here

        // (2) extract claims
      const decodedJwt = jwt.decode(token, { complete: true });
      const user = {
        id: decodedJwt.payload["ext-mimoto-original-sub-unique"],
        email: decodedJwt.payload["urn:telematik:claims:email"]
      }

      // (3) finalize login
      req.login(user, function(err){
        if(err) return next(err);
        res.redirect('/profile');
      });
    });
  } 
);

function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login-oidc-mimoto')
}

app.use('/profile', ensureLoggedIn, (req, res) => {
  res.render('profile', { title: 'Express', user: req.user });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

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
