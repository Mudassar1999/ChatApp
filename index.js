// const express = require("express");
// const { createServer } = require("http");

// const app = express();

// const http = createServer(app);

// const PORT = process.env.PORT || 3000;
// http.listen(PORT, () => {
//   console.log(`Listening on Port ${PORT}`);
// });

// app.use(express.static(__dirname + "/public"));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// // Server Socket/IO

// const io = require("socket.io")(http);

// io.on("connection", (socket) => {
//   console.log("New User Connected");
//   socket.on('message',(msg)=>{
//     console.log(msg);
//     socket.broadcast.emit('message',msg);
//   })
// });
const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);

//middlewre
app.use(express.json());
var clients = {};

io.on("connection", (socket) => {
  console.log("connetetd");
  console.log(socket.id, "has joined");
  // socket.on("signin", (id) => {
  //   console.log(id);
  //   clients[id] = socket;
  //   console.log(clients);
  // });
  socket.on("message", (msg) => {
    console.log(msg);
    let targetId = msg.targetId;
    if (clients[targetId]) clients[targetId].emit("message", msg);
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log("server started");
});
