import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty({ description: "The id of the user" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "The username of the user" })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: "The hashed password of the user" })
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
