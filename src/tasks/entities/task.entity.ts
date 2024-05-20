import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../auth/entities/user/user.entity";
import { TaskStatus } from "../task.types";

@Entity("tasks")
export class Task {
  @ApiProperty({ description: "The id of the task" })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ description: "The title of the task" })
  @Column()
  title!: string;

  @ApiProperty({ description: "The description of the task" })
  @Column()
  description!: string;

  @ApiProperty({ description: "The status of the task" })
  @Column({ default: TaskStatus.Open })
  status!: string;

  @ApiProperty({ description: "When the task was created" })
  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @ApiProperty({ description: "When the task was last updated" })
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  user!: User;
}
