const express = require("express");
const { createServer } = require("http");

const app = express();

const http = createServer(app);

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Server Socket/IO

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("New User Connected");
  socket.on('message',(msg)=>{
    console.log(msg);
    socket.broadcast.emit('message',msg);
  })
});
