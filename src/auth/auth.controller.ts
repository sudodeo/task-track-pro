import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto, CreateUserSchema } from "./dtos/create-user.dto";
import { User } from "./entities/user/user.entity";

@Controller("auth")
@ApiTags("auth")
@ApiInternalServerErrorResponse({ description: "Internal server error" })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Register a new user" })
  @ApiCreatedResponse({ type: User, description: "User registered" })
  @ApiBadRequestResponse({ description: "Bad request" })
  @Post("register")
  async register(@Body() body: CreateUserDto) {
    const result = CreateUserSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }
    await this.authService.register(result.data.username, result.data.password);
  }

  @ApiOperation({ summary: "Login" })
  @ApiOkResponse({ type: String, description: "User logged in" })
  @ApiBadRequestResponse({ description: "Bad request" })
  @Post("login")
  async login(@Body() body: CreateUserDto) {
    const result = CreateUserSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }
    return this.authService.validateUser(
      result.data.username,
      result.data.password
    );
  }
}
