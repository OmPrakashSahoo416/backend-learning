// client side is behaving like a socket which will connect to the io server 


const socket = io("http://localhost:4000/")



// to receiver data from the server 
socket.on("welcomemessage", (data) => {
    console.log("From server : ", data)
    

    // to send data to the server 
    socket.emit("thankyoumessage", "Thanks");
})


socket.on("counter", data => {
    document.getElementById("counter").innerText = data
})

document.getElementById("form").addEventListener("submit",(e) => {
    e.preventDefault();
    const message = document.getElementById("message").value;
    // console.log(message)
    // console.log(message)
    socket.emit("message", message)
    document.getElementById("message").value = "";
})


socket.on("messages", data => {
    // msg.push(data);
    document.getElementById("messages").innerHTML += `<li>${data}</li>`
    
})






