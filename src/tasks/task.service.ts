import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../auth/entities/user/user.entity";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";
import { Task } from "./entities/task.entity";
import { TaskGateway } from "./task.gateway";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private taskGateway: TaskGateway
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      user,
    });

    await this.taskRepository.save(task);
    this.taskGateway.taskCreated(task);
    return task;
  }

  async getTasks(user: User): Promise<Task[]> {
    return this.taskRepository.find({ where: { user } });
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!task) {
      throw new NotFoundException("Task not found");
    }
    return task;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({
      id,
      user: { id: user.id },
    });
    if (result.affected === 0) {
      throw new NotFoundException("Task not found");
    }
    this.taskGateway.taskDeleted(id);
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    Object.assign(task, updateTaskDto);
    await this.taskRepository.save(task);
    this.taskGateway.taskUpdated(task);
    return task;
  }
}
