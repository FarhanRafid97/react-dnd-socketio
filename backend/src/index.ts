import express from "express";
import cors from "cors";

import { io, urlOrigin } from "./utils/socket";
import { Socket } from "socket.io";
(() => {
  const state = new Map();
  const app = express();
  app.use(cors({ credentials: true, origin: urlOrigin }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // const state = new Map();

  io.on("connection", (socket: Socket) => {
    socket.on("leave-room", (data: any) => {
      const oldData = state.get(data.roomId) as string[];
      if (!oldData) {
        return;
      }
      const newData = oldData.filter((d) => d != socket.id);

      state.set(data.roomId, newData);
    });
    socket.on("join_room", (data: any) => {
      socket.join(data.roomId);
    });

    socket.on("send_edit_task", (data: any) => {
      console.log(data);
      socket.broadcast.to(data.roomId).emit("receive_edit_task", data.data);
    });

    socket.on("add_new_task", (task) => {
      socket.broadcast.to(task.roomId).emit("new_task", task);
    });
  });
})();
