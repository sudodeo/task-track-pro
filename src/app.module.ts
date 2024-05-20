import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { TaskModule } from "./tasks/task.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.production"],
    }),
    DatabaseModule,
    TaskModule,
    AuthModule,
  ],
})
export class AppModule {}
