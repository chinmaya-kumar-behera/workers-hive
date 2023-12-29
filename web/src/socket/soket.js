import socketIo from "socket.io-client";

export const socket = socketIo.connect("http://localhost:5000");
