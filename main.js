const express   = require('express');
const mongoose  = require('mongoose');
const connectDB = require('./config/db.js');
const dotenv    = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const app     = express();
const PORT    = 3000 || process.env.PORT;

// To store session in mongoDB
const MongoStore = require('connect-mongo')(session);

//Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config();
//Routes
const authRoutes = require('./routes/auth.js');
const testRoutes = require('./test/routes/post.js');

connectDB();


/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = new MongoStore({
  mongooseConnection : mongoose.connection,
  collection         : 'sessions'
})

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
app.use(passport.initialize());
app.use(passport.session());

//Router
app.use('/api/user' , authRoutes);
app.use('/post' , testRoutes);




app.listen(PORT , () => console.log(`Server runnig on port ${PORT}`))
