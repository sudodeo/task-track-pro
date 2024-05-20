import { ApiProperty } from "@nestjs/swagger";
import * as bcrypt from "bcrypt";
import { Task } from "src/tasks/entities/task.entity";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @ApiProperty({ description: "The id of the user" })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ description: "The username of the user" })
  @Column({ unique: true })
  username!: string;

  @ApiProperty({ description: "The hashed password of the user" })
  @Column()
  password!: string;

  @ApiProperty({ description: "When the user was created" })
  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @ApiProperty({ description: "When the user was last updated" })
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
