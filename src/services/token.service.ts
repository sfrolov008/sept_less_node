import { sign, verify } from "jsonwebtoken";

import { configs } from "../configs";
import { ETokenType } from "../enums";
import { EActionTokenType } from "../enums/action-token-type";
import { ApiError } from "../errors";
import { IActionTokenPayload, ITokenPair, ITokenPayload } from "../types";

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
    try {
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
    } catch (e) {
      throw new ApiError("Invalid token", 401);
    }
  }

  public generateActionToken(
    payload: IActionTokenPayload,
    tokenType: EActionTokenType
  ): string {
    let secret = "";
    switch (tokenType) {
      case EActionTokenType.activate:
        secret = configs.ACTIVATE_WORD;
        break;
      case EActionTokenType.forgot:
        secret = configs.FORGOT_WORD;
        break;
    }

    return sign(payload, secret, { expiresIn: "7d" });
  }

  public checkActionToken(token: string, tokenType: EActionTokenType) {
    try {
      let secret = "";

      switch (tokenType) {
        case EActionTokenType.forgot:
          secret = configs.FORGOT_WORD;
          break;
        case EActionTokenType.activate:
          secret = configs.ACTIVATE_WORD;
          break;
      }
      return verify(token, secret) as IActionTokenPayload;
    } catch (e) {
      throw new ApiError("Invalid token", 401);
    }
  }
}
export const tokenService = new TokenService();
