import { io } from "socket.io-client";

export const socket = io("http://13.250.8.231:3000/", {
  transports: ["websocket"],
});
