import { UserDAL } from "../dal";
import { sign, verify } from "../utils/jwt";

export class AccessControlLogic {
  constructor(
    private readonly userDAL = new UserDAL(),
  ) {}

  async newJWT(email: string): Promise<string | null> {
    // const token = md5.hash(`${email}:${new Date()}`);
    //
    // const sessionToken: SessionToken = {
    //   createdAt: Date.now(),
    //   isRevoked: false,
    //   userEmail: email,
    // };
    //
    // await this.sessionTokenDAL.create(token, sessionToken);
    // await this.sessionTokenDAL.setExpiration(token, 24 * 60 * 60);
    if (await this.userDAL.exists(email)) return sign({ email });
    return null;
  }

  validateJWT(token: string) {
    // const sessionToken = await this.sessionTokenDAL.read(token.trim());

    // if (!sessionToken) return null;
    // if (sessionToken.isRevoked) return null;

    // await this.sessionTokenDAL.setExpiration(token, 24 * 60 * 60);
    // return sessionToken.userEmail;
    return verify(token);
  }
}
