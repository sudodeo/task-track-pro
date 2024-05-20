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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Request } from "express";
import { CreateTaskDto, CreateTaskSchema } from "./dtos/create-task.dto";
import { UpdateTaskDto, UpdateTaskSchema } from "./dtos/update-task.dto";
import { Task } from "./entities/task.entity";
import { TaskService } from "./task.service";

@Controller("tasks")
@UseGuards(AuthGuard("jwt"))
@ApiTags("task")
@ApiUnauthorizedResponse({ description: "Unauthorized" })
@ApiInternalServerErrorResponse({ description: "Internal server error" })
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: "Create a new task" })
  @ApiCreatedResponse({ type: Task, description: "Task created" })
  @ApiBadRequestResponse({ description: "Bad request" })
  @Post()
  async createTask(@Body() body: CreateTaskDto, @Req() req: Request) {
    const result = CreateTaskSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }
    return this.taskService.createTask(result.data, req.user!);
  }

  @ApiOperation({ summary: "Get all tasks" })
  @ApiOkResponse({ type: [Task], description: "Tasks returned" })
  @Get()
  async getTasks(@Req() req: Request) {
    return this.taskService.getTasks(req.user!);
  }

  @ApiOperation({ summary: "Get a task by ID" })
  @ApiOkResponse({ type: Task, description: "Task returned" })
  @ApiNotFoundResponse({ description: "Task not found" })
  @Get(":id")
  async getTaskById(@Param("id") id: number, @Req() req: Request) {
    return this.taskService.getTaskById(id, req.user!);
  }

  @ApiOperation({ summary: "Update a task" })
  @ApiResponse({ description: "Task updated" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 404, description: "Task not found" })
  @Patch(":id")
  async updateTask(
    @Param("id") id: number,
    @Body() body: UpdateTaskDto,
    @Req() req: Request
  ) {
    const result = UpdateTaskSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }
    return this.taskService.updateTask(id, result.data, req.user!);
  }

  @ApiOperation({ summary: "Delete a task" })
  @ApiResponse({ description: "Task deleted" })
  @ApiResponse({ status: 404, description: "Task not found" })
  @Delete(":id")
  async deleteTask(@Param("id") id: number, @Req() req: Request) {
    return this.taskService.deleteTask(id, req.user!);
  }
}
