import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { User } from "./entities/user/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async register(username: string, password: string): Promise<void> {
    const user = this.userRepository.create({ username, password });
    await this.userRepository.save(user);
  }

  async validateUser(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.jwtService.sign(
        { username, sub: user.id },
        { secret: this.configService.getOrThrow<string>("JWT_SECRET") }
      );
    }
    throw new UnauthorizedException("Invalid credentials");
  }
}
