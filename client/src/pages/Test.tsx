import React, { useRef, useState } from "react";

import { toast } from "react-toastify";

import Button from "@/ui/Button.js";

export default function Test() {
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[] | []>([]);
  const socketRef = useRef<WebSocket | null>(null);

  function joinRoom(roomId: string) {
    const socket = new WebSocket("ws://localhost:5000/");
    socketRef.current = socket;
    socketRef.current.onopen = () => {
      const message = {
        type: "join-room",
        paylod: {
          roomId,
        },
      };
      socketRef.current?.send(JSON.stringify(message));
    };
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "join-success":
          toast.success("successfully joined room");
          setCurrentRoom(roomId);
          break;
        case "room-users":
          console.log(data);
          setUsers(data.paylod.users);
          break;
        case "leave-success":
          socketRef.current?.close();
          setCurrentRoom(null);
          break;
        case "chat":
          setMessages((preMessage: string[]) => [
            ...preMessage,
            data.paylod.message as string,
          ]);
          console.log(data);
          break;
      }
    };
  }

  function leaveRoom(roomId: string) {
    const socket = socketRef.current;

    if (!socket) return;

    if (socket.readyState !== WebSocket.OPEN) return;

    socket.send(
      JSON.stringify({
        type: "leave-room",
      }),
    );
  }

  function handleSendMessage() {
    const socket = socketRef.current;

    if (!socket) return;

    if (socket.readyState !== WebSocket.OPEN) return;

    socket.send(
      JSON.stringify({
        type: "chat",
        paylod: {
          message,
        },
      }),
    );
  }
  return (
    <div className="h-screen bg-slate-800 text-slate-200 p-4">
      {currentRoom ? (
        <div className=" h-full w-full grid grid-cols-[1fr_3fr]">
          <div className="h-full border-l ">
            <p className="text-500 text-center font-medium">
              list of users join room
            </p>
            <ul className="space-y-2 mt-10">
              {users.map((user) => (
                <li key={user.id}>
                  <p>{user.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-full flex flex-col gap-2 ">
            <div className="flex items-center justify-between">
              <div></div>
              <button
                onClick={() => leaveRoom("abc123")}
                className="border border-border rounded-md px-2 py-1 cursor-pointer"
              >
                leave room
              </button>
            </div>

            <div className="bg-slate-700 flex-1 p-2 grid grid-rows-[1fr_auto]">
              <div>
                {messages.map((m) => (
                  <p>{m}</p>
                ))}
              </div>

              <div className="flex items-center gap-2  w-full">
                <input
                  type="text"
                  className="flex-1 border border-border rounded-md  p-1 h-full"
                  value={message}
                  placeholder="write message ... "
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={handleSendMessage}>send</Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button onClick={() => joinRoom("abc123")}>join room</Button>
      )}
    </div>
  );
}
