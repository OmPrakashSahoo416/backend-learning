const express = require("express");
const dotenv = require("dotenv");
const expressHandleBars = require("express-handlebars");
const engine = expressHandleBars.engine;
const path = require("path");
// import { engine } from 'express-handlebars';
const connectDb = require("./config/db");
const morgan = require("morgan");


connectDb();


dotenv.config({path:"./config/config.env"});

const PORT = process.env.PORT || 3000;



const app = express();



if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));
}

// handlebars to keep a single layout after persist after re routing also 
app.engine('.hbs', engine({defaultLayout:"main", extname: '.hbs'}));
app.set('view engine', '.hbs');

// routing 
app.use("/", require("./routes/index"))

// set this path to static to use the codes styles and images and all 
app.use(express.static(path.join(__dirname, 'public')))


// app.engine('.hbs', exphbs({defaultLayout: false}));


app.listen(PORT,console.log(`Server is up and running in ${process.env.NODE_ENV} mode on port ${process.env.PORT} ...`));

