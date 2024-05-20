import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { z } from "zod";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";
import { TaskService } from "./task.service";

@Controller("tasks")
@UseGuards(AuthGuard("jwt"))
@ApiTags("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: "Create a new task" })
  @ApiResponse({ status: 201, description: "Task created" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Post()
  async createTask(
    @Body() body: z.infer<typeof CreateTaskDto>,
    @Req() req: Request
  ) {
    const result = CreateTaskDto.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }
    return this.taskService.createTask(result.data, req.user!);
  }

  @ApiOperation({ summary: "Get all tasks" })
  @ApiResponse({ status: 200, description: "Tasks returned" })
  @Get()
  async getTasks(@Req() req: Request) {
    return this.taskService.getTasks(req.user!);
  }

  @ApiOperation({ summary: "Get a task by ID" })
  @ApiResponse({ status: 200, description: "Task returned" })
  @ApiResponse({ status: 404, description: "Task not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Get(":id")
  async getTaskById(@Param("id") id: number, @Req() req: Request) {
    return this.taskService.getTaskById(id, req.user!);
  }

  @ApiOperation({ summary: "Update a task" })
  @ApiResponse({ status: 200, description: "Task updated" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 404, description: "Task not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Patch(":id")
  async updateTask(
    @Param("id") id: number,
    @Body() body: z.infer<typeof UpdateTaskDto>,
    @Req() req: Request
  ) {
    const result = UpdateTaskDto.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }
    return this.taskService.updateTask(id, result.data, req.user!);
  }

  @ApiOperation({ summary: "Delete a task" })
  @ApiResponse({ status: 200, description: "Task deleted" })
  @ApiResponse({ status: 404, description: "Task not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Delete(":id")
  async deleteTask(@Param("id") id: number, @Req() req: Request) {
    return this.taskService.deleteTask(id, req.user!);
  }
}
