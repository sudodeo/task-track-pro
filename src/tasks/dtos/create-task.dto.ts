import { z } from "zod";
import { TaskStatus } from "../task.types";

export const CreateTaskDto = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(Object.values(TaskStatus) as [string]),
});
