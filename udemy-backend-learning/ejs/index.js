import express from "express"
import {dirname} from "path"
import { fileURLToPath } from "url";


const  __dirname = dirname(fileURLToPath(import.meta.url));



const app = express();

app.use(express.urlencoded({extended:true}))

app.get("/", (req, res, next) => {
  let today = new Date().getDay()
  console.log(today)
  let day = "weekday"
  if (today === 0 ) {
    day = "weekend"
  }
  const path = __dirname + "/views/index.ejs"
  res.render(path,{day:day});

})



app.listen(3000, (req, res) => {

  console.log("Server running ...")
})