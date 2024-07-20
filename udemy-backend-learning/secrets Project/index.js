//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import e from "express";

import path from "path"
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = e();
const __dirname = dirname(fileURLToPath(import.meta.url))

// using bodyparser to get the password 
app.use(bodyParser.urlencoded({extended:true}))

let user = "";

// custom middleware to first check the password and then redirect to the secret page
function passChecker(req, res, next) {
  const password = req.body.password

  if (password === "ILoveProgramming") {
    user = "user";
  }
  next()
} 


// home route 
app.get("/", (req, res, next) => {
  
  
  res.sendFile(__dirname + "/public/index.html")
  
})
app.use(passChecker)

app.post("/check", (req, res, next) => {


  if (user === "") {
    res.sendFile(__dirname + "/public/index.html")
  } else {
    res.sendFile(__dirname + "/public/secret.html")
  }
})









app.listen(3000, (req, res) => {
  console.log("Server is walking ...")
})
