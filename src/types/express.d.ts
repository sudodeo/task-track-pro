import { User } from "../auth/entities/user/user.entity";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
