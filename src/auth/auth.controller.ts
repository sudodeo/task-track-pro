import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { z } from "zod";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User registered" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Post("register")
  async register(@Body() body: z.infer<typeof CreateUserDto>) {
    const result = CreateUserDto.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }
    await this.authService.register(result.data.username, result.data.password);
  }

  @ApiOperation({ summary: "Login" })
  @ApiResponse({ status: 200, description: "User logged in" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Post("login")
  async login(@Body() body: z.infer<typeof CreateUserDto>) {
    const result = CreateUserDto.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }
    return this.authService.validateUser(
      result.data.username,
      result.data.password
    );
  }
}
