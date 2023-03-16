import { sign, verify } from "jsonwebtoken";

import { configs } from "../configs";
import { ETokenType } from "../enums";
import { ApiError } from "../errors";
import { ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = sign(payload, configs.ACCESS_WORD, {
      expiresIn: "15m",
    });
    const refreshToken = sign(payload, configs.REFRESH_WORD, {
      expiresIn: "15d",
    });
    return { accessToken, refreshToken };
  }

  public checkToken(
    token: string,
    tokenType = ETokenType.access
  ): ITokenPayload {
    let secret = "";

    switch (tokenType) {
      case ETokenType.access:
        secret = configs.ACCESS_WORD;
        break;
      case ETokenType.refresh:
        secret = configs.REFRESH_WORD;
        break;
    }
    return verify(token, secret) as ITokenPayload;
    try {
    } catch (e) {
      throw new ApiError("Invalid token", 401);
    }
  }
}
export const tokenService = new TokenService();
