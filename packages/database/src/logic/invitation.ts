import { InvitationCodeDAL, UserDAL } from "../dal";
import { CreateNewInvitationCodeParams, InvitationCodeType } from "../types";
import md5 from "spark-md5";

export class InvitationLogic {
  constructor(
    private readonly userDAL = new UserDAL(),
    private readonly invitationCodeDAL = new InvitationCodeDAL(),
  ) {}

  newCode({ code, email, type, limit = 0 }: CreateNewInvitationCodeParams) {
    if (!code) code = md5.hash(email + Date.now()).slice(0, 6);

    const createCode = this.invitationCodeDAL.create(
      code,
      {
        type,
        limit,
        inviterEmail: email,
        inviteeEmails: [],
      },
    );
  }
}
