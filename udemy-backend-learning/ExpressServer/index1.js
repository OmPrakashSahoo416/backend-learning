import express from "express";
import bodyParser from "body-parser"

// to get the current directory path 
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// app use to body parser to encode the post value 
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res) => {


  // we are sending an actual file here 
  res.sendFile(__dirname + "/public/index.html");
});


app.post("/submit", (req, res) => {

  // after body parser we can get the req object using body 
  console.log(req.body);

})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
