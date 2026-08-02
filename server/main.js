const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const AppError = require("./utils/AppError");
const { WebSocketServer } = require("ws");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_DEVELOPMENT)
  .then(() => console.log("✅ MongoDB  Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
const app = express();

app.use(cors());
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

const users = new Map();
const rooms = new Map();
const userRooms = new Map();

server.on("upgrade", async (req, socket, head) => {
  try {
    const token = req.headers.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken"))
      .split("=")[1];

    if (!token) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }
    const verifyToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (!verifyToken) {
      throw new AppError("token not valid", 401);
    }
    const user = await User.findOne({ _id: verifyToken.user });

    if (!user) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
      ws.user = user;
      wss.emit("connection", ws, req);
    });
  } catch (error) {
    console.log(error);
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
  }
});

function broadcastRoomUsers(roomId) {
  const room = rooms.get(roomId);
  if (!room) return;
  const users = [...room].map((socket) => ({
    id: socket.user._id,
    name: socket.user.name,
  }));

  room.forEach((client) => {
    client.send(
      JSON.stringify({
        type: "room-users",
        paylod: {
          users,
        },
      }),
    );
  });
}
wss.on("connection", (socket, requests) => {
  console.log("connected to websocket server", [...wss.clients].length);
  socket.on("message", (binaryData) => {
    const data = JSON.parse(binaryData.toString());

    switch (data.type) {
      case "chat": {
        const roomId = userRooms.get(socket);
        const room = rooms.get(roomId);
        const message = data.paylod.message;
        room.forEach((client) => {
          client.send(
            JSON.stringify({
              type: "chat",
              paylod: {
                message,
              },
            }),
          );
        });
        break;
      }

      case "join-room": {
        const joinRoomId = data.paylod.roomId;
        let room = rooms.get(joinRoomId);
        if (!room) {
          room = new Set();
          rooms.set(joinRoomId, room);
        }
        room.add(socket);
        userRooms.set(socket, joinRoomId);
        socket.send(JSON.stringify({ type: "join-success" }));
        broadcastRoomUsers(joinRoomId);
        break;
      }

      case "leave-room": {
        const roomId = userRooms.get(socket);
        if (!roomId) return;
        const room = rooms.get(roomId);
        if (!room) return;
        room.delete(socket);
        userRooms.delete(socket);
        socket.send(
          JSON.stringify({
            type: "leave-success",
          }),
        );
        broadcastRoomUsers(roomId);
        socket.close();
        break;
      }
    }

    socket.on("close", () => {
      const roomId = userRooms.get(socket);
      if (!roomId) return;
      const room = rooms.get(roomId);
      if (!room) return;
      room.delete(socket);
      userRooms.delete(socket);
      console.log("close requests");
      broadcastRoomUsers(roomId);
    });
  });
});
app.get("/", (req, res) => {
  res.status(200).json({ message: "successfully conected to api" });
});

server.listen(5000, () => {
  console.log("app listen on port 5000");
});
