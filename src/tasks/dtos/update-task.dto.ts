import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { z } from "zod";
import { TaskStatus } from "../task.types";

export class UpdateTaskDto {
  @ApiProperty({
    example: "Task title",
    description: "The title of the task",
    required: false,
  })
  @IsString()
  @MinLength(5)
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: "Task description",
    description: "The description of the task",
    required: false,
  })
  @IsString()
  @MinLength(5)
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: "open",
    description: "The status of the task",
    required: false,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: string;
}

export const UpdateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  status: z.enum(Object.values(TaskStatus) as [string]).optional(),
});
