import * as bcrypt from "bcrypt";
import { Task } from "src/tasks/entities/task.entity";
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  constructor(id: number, username: string, password: string, tasks: Task[]) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.tasks = tasks;
  }
}
