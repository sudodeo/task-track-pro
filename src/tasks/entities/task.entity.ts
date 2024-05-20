import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/entities/user/user.entity";
import { TaskStatus } from "../task.types";

@Entity("tasks")
export class Task {
  @ApiProperty({ description: "The id of the task" })
  @PrimaryGeneratedColumn()
  id: number = 0;

  @ApiProperty({ description: "The title of the task" })
  @Column()
  title: string = "";

  @ApiProperty({ description: "The description of the task" })
  @Column()
  description: string = "";

  @ApiProperty({ description: "The status of the task" })
  @Column({ default: TaskStatus.Open })
  status: string = TaskStatus.Open;

  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  user: User | null = null;

  constructor(
    id: number,
    title: string,
    description: string,
    status: string,
    user: User
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.user = user;
  }
}
