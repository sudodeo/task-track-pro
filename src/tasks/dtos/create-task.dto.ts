import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, MinLength } from "class-validator";
import { z } from "zod";
import { TaskStatus } from "../task.types";

export class CreateTaskDto {
  @ApiProperty({ example: "Task title", description: "The title of the task" })
  @IsString()
  @MinLength(5)
  title!: string;

  @ApiProperty({
    example: "Task description",
    description: "The description of the task",
  })
  @IsString()
  @MinLength(5)
  description!: string;

  @ApiProperty({ example: "open", description: "The status of the task" })
  @IsEnum(TaskStatus)
  status!: string;
}

export const CreateTaskSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(5),
  status: z.enum(Object.values(TaskStatus) as [string]),
});
