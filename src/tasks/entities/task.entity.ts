import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/entities/user/user.entity";
import { TaskStatus } from "../task.types";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  title: string = "";

  @Column()
  description: string = "";

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
