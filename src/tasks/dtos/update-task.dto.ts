import { z } from "zod";
import { TaskStatus } from "../task.types";

export const UpdateTaskDto = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  status: z.enum(Object.values(TaskStatus) as [string]).optional(),
});
