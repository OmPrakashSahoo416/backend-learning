const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const expressHandleBars = require("express-handlebars");
const engine = expressHandleBars.engine;
const passport = require("passport");
const expressSession = require("express-session");
const path = require("path");
// import { engine } from 'express-handlebars';
const connectDb = require("./config/db");
const morgan = require("morgan");

var MongoDBStore = require('connect-mongodb-session')(expressSession);

var store = new MongoDBStore({mongooseConnection:mongoose.connection});

connectDb();


dotenv.config({path:"./config/config.env"});

const PORT = process.env.PORT || 3000;



const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));
}
// session express
app.use(expressSession({
    secret: 'odisha_boy',
    resave: false,
    saveUninitialized: false,
    store:store
    
  }));




// handlebars to keep a single layout after persist after re routing also 
app.engine('.hbs', engine({defaultLayout:"main", extname: '.hbs'}));
app.set('view engine', '.hbs');

// passport 
require("./config/passport")(passport);


// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// routing 
app.use("/", require("./routes/index"))
app.use("/", require("./routes/auth"))

// set this path to static to use the codes styles and images and all 
app.use(express.static(path.join(__dirname, 'public')))







// app.engine('.hbs', exphbs({defaultLayout: false}));


app.listen(PORT,console.log(`Server is up and running in ${process.env.NODE_ENV} mode on port ${process.env.PORT} ...`));

