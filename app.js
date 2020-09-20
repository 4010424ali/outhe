const express = require('express');
const dotenv = require('dotenv');
const cookieSeesion = require('cookie-session');
const passport = require('passport');

// Bring the route folder
const AuthRouter = require('./auth/auth-route');
const profileRoute = require('./auth/profile-route');

// Bring the Passport setup file
const passportSetup = require('./config/pasport_setup');

// Bring the Database file
const connectDB = require('./config/db');

// Bring the config file
const config = require('./config');

const app = express();

// Connect Database
connectDB();

// Load the confige vars
dotenv.config({ path: './config.env' });

// Cookie sesson middleware
app.use(
  cookieSeesion({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.sessionKeys.key],
  })
);

// Initialize the passport
app.use(passport.initialize());

// Control the Session
app.use(passport.session());

// Set view floder
app.set('views', './view');

// Set up view engine
app.set('view engine', 'ejs');

// Set the Public file to load the image and css
app.use(express.static(__dirname + '/view'));

app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

// Mount the Route
app.use('/auth', AuthRouter);
app.use('/profile', profileRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server is running on developemnt mode on ${PORT}`)
);
