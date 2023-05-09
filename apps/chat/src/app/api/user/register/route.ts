import { NextRequest, NextResponse } from "next/server";
import {
  UserDAL,
  UserLogic,
  RegisterCodeLogic,
  InvitationCodeLogic,
  AccessControlLogic,
} from "database";
import { ReturnStatus, ResponseStatus } from "@/app/api/typing.d";

const ifVerifyCode = !!process.env.NEXT_PUBLIC_EMAIL_SERVICE;

/**
 * Registered user
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest): Promise<Response> {
  try {
    const { email, password, code, code_type, phone, invitation_code } =
      await req.json();

    const userDal = new UserDAL();
    if (await userDal.exists(email)) {
      // User already exists.
      return NextResponse.json({ status: ResponseStatus.alreadyExisted });
    }

    /* Activation verification code */
    if (ifVerifyCode) {
      const registerCodeLogic = new RegisterCodeLogic();
      const success = await registerCodeLogic.activateCode(email, code.trim());

      if (!success)
        return NextResponse.json({ status: ResponseStatus.invalidCode });
    }

    const user = new UserLogic();
    await user.register(email, password);

    // If using an invitation code to register,
    // then determine the type of activation code and grant corresponding rights.
    if (invitation_code) {
      const invitationCode = new InvitationCodeLogic();

      const code = await invitationCode.acceptCode(
        email,
        invitation_code.toLowerCase()
      );
      // await user.newSubscription({
      //   startsAt: Date.now(),
      //   endsAt: Date.now() + 3 * 60 * 60 * 24 * 1000,
      //   plan: "pro",
      //   tradeOrderId: `club-code-${invitation_code.toLowerCase()}`,
      // });
    }

    // After registration, directly generate a JWT Token and return it.
    const accessControl = new AccessControlLogic();
    const token = await accessControl.newJWT(email);
    return NextResponse.json({
      status: ResponseStatus.Success,
      sessionToken: token,
    });
  } catch (error) {
    console.error("[REGISTER]", error);
    return new Response("[INTERNAL ERROR]", { status: 500 });
  }
}
