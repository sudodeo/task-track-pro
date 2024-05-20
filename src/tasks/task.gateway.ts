import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class TaskGateway {
  @WebSocketServer()
  server!: Server;

  taskCreated(task: any) {
    this.server.emit("taskCreated", task);
  }

  taskUpdated(task: any) {
    this.server.emit("taskUpdated", task);
  }

  taskDeleted(taskId: number) {
    this.server.emit("taskDeleted", taskId);
  }
}
