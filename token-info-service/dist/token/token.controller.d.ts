import { TokenService } from "./token.service";
export declare class TokenController {
    private readonly tokenInfoService;
    constructor(tokenInfoService: TokenService);
    getTokenInfo(apiKey: string): Promise<import("./interfaces/web3token.interface").Web3TokenInfo>;
}
