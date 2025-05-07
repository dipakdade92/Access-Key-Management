import { Controller, Get, Headers, HttpException, HttpStatus } from "@nestjs/common";
import { TokenService } from "./token.service";

@Controller('token')
export class TokenController {
    constructor(private readonly tokenInfoService: TokenService) {}

    @Get()
    async getTokenInfo(@Headers('x-api-key') apiKey: string) {
      if (!apiKey) {
        throw new HttpException('Missing API key', HttpStatus.BAD_REQUEST);
      }
  
      // Validate key with Redis
      const keyValid = await this.tokenInfoService.validateKey(apiKey);
      if (!keyValid) {
        throw new HttpException('Invalid or expired API key', HttpStatus.UNAUTHORIZED);
      }
  
      // Return mock token data
      return this.tokenInfoService.fetchTokenInfo(apiKey);
    }
}