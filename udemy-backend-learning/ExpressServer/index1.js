import express from "express";
import bodyParser from "body-parser"
import morgan from "morgan";

// to get the current directory path 
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

function customHTTPLogger(req, res, next) {
  console.log(`Request method : ${req.method} \nRequest URL : ${req.url}`)
  next()
}

// app use to body parser to encode the post value 
app.use(bodyParser.urlencoded({extended:true}))

// using morgan to log http requests string 
// app.use(morgan("dev"));

//using custom middleware
app.use(customHTTPLogger)

app.get("/", (req, res) => {


  // we are sending an actual file here 
  res.sendFile(__dirname + "/public/index.html");


  
});


app.post("/submit", (req, res) => {

  // after body parser we can get the req object using body 
  console.log(req.body);

  res.send(`<h1>${req.body.street} ${req.body.pet}</h1>`);
  


})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
