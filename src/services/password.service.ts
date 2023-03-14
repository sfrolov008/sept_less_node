import { compare, hash } from "bcrypt";

class PasswordService {
  public async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }
  public async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}

export const passwordService = new PasswordService();
