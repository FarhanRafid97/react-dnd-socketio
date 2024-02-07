import { Server } from "socket.io";
import { server } from "./server";

export const urlOrigin = "http://localhost:3000";

export const io = new Server(server, {
  cors: {
    origin: urlOrigin,
    credentials: true,
    methods: ["GET", "POST"],
  },
});
