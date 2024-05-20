import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { TaskController } from "./task.controller";
import { TaskGateway } from "./task.gateway";
import { TaskService } from "./task.service";

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskService, TaskGateway],
  controllers: [TaskController],
})
export class TaskModule {}
