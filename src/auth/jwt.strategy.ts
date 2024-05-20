import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "./entities/user/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>("JWT_SECRET"),
    });
  }

  async validate(payload: any) {
    if (!payload || !payload.sub || !payload.username) {
      throw new UnauthorizedException("Invalid JWT payload");
    }
    
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });
    
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    return { id: payload.sub, username: payload.username };
  }
}
