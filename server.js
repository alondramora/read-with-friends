const express = require("express"); // helps us build out our API
const app = express(); // use using express
const mongoose = require("mongoose"); // talk to mongodb db using mongoose
const passport = require("passport"); // authentication, enables us to use different strategies for diff types of logins
const session = require("express-session"); // makes sure our users can stay logged in while moving across sessions, uses cookies stored on client
const MongoStore = require("connect-mongo")(session); // storing our session inside mongoDB so that the user stays logged in, (session) is running the function and session is the argument being passed in
const methodOverride = require("method-override"); // we've been using fetch apis but we can use this to override those methods to be what we want them to be
const flash = require("express-flash"); // helps us show all notifications like wrong password, same email already exists etc
const logger = require("morgan"); // logs in terminal what methods are being made and what the routes are etc
const connectDB = require("./config/database");  // connecting to our DB
const mainRoutes = require("./routes/main"); // route
const postRoutes = require("./routes/posts"); //route
// const commentRoutes = require("./routes/comments"); // routes for our comments
const path = require("path");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config, we are passing passport in as the argument, this runs a function that is exported from config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");
// app.set('views', path.join(__dirname, ''));

//Static Folder (css, js files, anything that we need for base app to run)
app.use(express.static("public"));

//Body Parsing to pull stuff out of the requests being made
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete. AKA if any requests come in with _method as query parameter lets override it with whatever comes after
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
