import { EEmailActions, ESmsActions } from "../enums";
import { ApiError } from "../errors";
import { Token, User } from "../models";
import { ICredentials, ITokenPair, ITokenPayload, IUser } from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { smsService } from "./sms.service";
import { tokenService } from "./token.service";

export class AuthService {
  public async register(body: IUser): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hashPassword(password);
      await User.create({
        ...body,
        password: hashedPassword,
      });
      Promise.all([
        await smsService.sendSms("+380666179332", ESmsActions.WELCOME),
        await emailService.sendMail(
          "sfrolov008@gmail.com",
          EEmailActions.WELCOME
        ),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.comparePasswords(
        credentials.password,
        user.password
      );
      if (!isMatched) {
        throw new ApiError("Wrong email or password", 400);
      }

      const tokenPair = tokenService.generateTokenPair({
        _id: user._id,
        name: user.name,
      });

      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    tokenInfo: ITokenPair,
    jwtPayload: ITokenPayload
  ): Promise<ITokenPair> {
    try {
      const tokenPair = tokenService.generateTokenPair({
        _id: jwtPayload._id,
        name: jwtPayload.name,
      });

      await Promise.all([
        Token.create({ _user_id: jwtPayload._id, ...tokenPair }),
        Token.deleteOne({ refreshToken: tokenInfo.refreshToken }),
      ]);

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await User.findById(userId);

    const isMatched = await passwordService.comparePasswords(
      oldPassword,
      user.password
    );

    if (!isMatched) {
      throw new ApiError("Wrong old password", 400);
    }

    const hashedNewPassword = await passwordService.hashPassword(newPassword);
    await User.updateOne({ _id: user._id }, { password: hashedNewPassword });
  }
}
export const authService = new AuthService();
