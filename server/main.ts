import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import User from "./models/userModel";
import mongoose from "mongoose";
import AppError from "./utils/AppError";

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE_DEVELOPMENT || "")
  .then(() => console.log("✅ MongoDB  Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

const app = express();

app.use(cors());
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

interface UserInfo {
  _id: string;
  name: string;
}

interface ExtendedWebSocket extends WebSocket {
  user: UserInfo;
}

const users = new Map();
const rooms = new Map<string, Set<ExtendedWebSocket>>();
const userRooms = new Map<ExtendedWebSocket, string>();

server.on("upgrade", async (req, socket, head) => {
  try {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    const token = cookieHeader
      .split("; ")
      .find((row) => row.startsWith("accessToken"))
      ?.split("=")[1];

    if (!token) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    const verifyToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET || "");
    if (!verifyToken || typeof verifyToken === "string") {
      throw new AppError("token not valid", 401);
    }

    const user = await User.findOne({ _id: (verifyToken as { user: string }).user });

    if (!user) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
      (ws as ExtendedWebSocket).user = { _id: user._id.toString(), name: user.name || "" };
      wss.emit("connection", ws, req);
    });
  } catch (error) {
    console.log(error);
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
  }
});

function broadcastRoomUsers(roomId: string) {
  const room = rooms.get(roomId);
  if (!room) return;
  const usersArray = [...room].map((socket) => ({
    id: socket.user._id,
    name: socket.user.name,
  }));

  room.forEach((client) => {
    client.send(
      JSON.stringify({
        type: "room-users",
        payload: {
          users: usersArray,
        },
      })
    );
  });
}

wss.on("connection", (socket: ExtendedWebSocket) => {
  console.log("connected to websocket server", [...wss.clients].length);
  socket.on("message", (binaryData) => {
    const data = JSON.parse(binaryData.toString());

    switch (data.type) {
      case "chat": {
        const roomId = userRooms.get(socket);
        const room = rooms.get(roomId);
        const message = data.payload?.message;
        if (room) {
          room.forEach((client) => {
            client.send(
              JSON.stringify({
                type: "chat",
                payload: {
                  message,
                },
              })
            );
          });
        }
        break;
      }

      case "join-room": {
        const joinRoomId = data.payload?.roomId;
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
          })
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

app.get("/", (_req, res) => {
  res.status(200).json({ message: "successfully conected to api" });
});

server.listen(5000, () => {
  console.log("app listen on port 5000");
});