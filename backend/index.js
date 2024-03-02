const app = require("./app");
// const db = require("./config/db");
// const UserModel = require("./model/user.model");
// require("dotenv").config();
// const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("Hello BLACKSPARROW DEVS      -Render Backend Reporting....");
// });

// app.listen(port, () => {
//   console.log(`server listenig on port http://localhost:${port}`);
// });



const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Define Socket.io event handling
io.on("connection", (socket) => {
  console.log("A client connected");

  // Handle messages from clients
  socket.on("QR", (msg) => {
    console.log("Received message from client:", msg);
    // Broadcast the message to all connected clients
    io.emit("QR", msg);
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});