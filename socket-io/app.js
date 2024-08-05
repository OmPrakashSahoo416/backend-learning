// The server file

import express, { urlencoded } from "express";
import { Server } from "socket.io"; // It takes only http server so express server needs to be wrapped around http
import http from "http"



const app = express();



// to use the static css files 
app.use(express.static("public"))

// app.use(express.urlencoded({urlencoded:true}))


const httpserver = http.createServer(app)
const io = new Server(httpserver)
let counter = 0;
// const msg = [];

// on new connection event trigger 
io.on("connection", (socket) => {
    console.log("New connection socket id : " + socket.id)

    io.emit("welcomemessage", "Welcome to socket io server");
    io.emit("counter", counter);
    counter++;


    socket.on("thankyoumessage", (data) => {
        console.log("Message from client : " + data)
    })

    socket.on("message", data => {
        console.log(data)
        
        const message = data + " From : " + socket.id.toString()
        
        
        io.emit("messages", message)
    })
 

})





// app.listen(4000, () => console.log(`Server is running on port 4000`))
httpserver.listen(4000, () => console.log("server io running on port 4000"))
