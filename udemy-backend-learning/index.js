// import  {randomSuperhero}  from "superheroes"
import  inquirer  from "inquirer"
import * as qr from "qr-image"
import * as fs from "fs"
// import { image } from "qr-image";



// console.log(`My favourite supe is ${randomSuperhero()}`)

// console.log("Hello from hell!")

// const fs = require("node:fs")

// to write to the local file system using node 
// fs.writeFile("./message.txt","Hi changing the text", (err) => {
//   if (err) {
//     console.error(err);
//   }
//   console.log("File has been updated")
// })


// to read the contents of a file 
// console.log("Contents of the file : \n")
// fs.readFile("./message.txt", encoding="utf8",  (err, data) => {
//   if (err) console.error(err)
//   console.log(data)
// })
let enteredURL = "";
inquirer.prompt([{message:"Enter the URL"}]).then(answer => {
  enteredURL = answer[""].toString()
  const qr_image = qr.image(enteredURL,{type:"png"})
  qr_image.pipe(fs.createWriteStream("google.png"))
})




