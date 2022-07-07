const express = require("express");
const app = express();
const http = require("http");
app.set("port", process.env.PORT || 3000);
var server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

server.listen(app.get("port"), () => {
  console.log("listening on *:", app.get("port"));
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to our app");
});

io.on("connection", function (socket) {
  var index = 0;

  console.log(socket.id);
  setInterval(() => {
    socket.send(JSON.stringify({ message: "hello " + index }));
    socket.emit("numberChanged", { number: index });
    index++;
  }, 5000);
});
