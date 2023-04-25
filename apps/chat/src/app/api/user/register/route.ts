import {NextRequest, NextResponse} from "next/server";
import {UserDAL, UserLogic, RegisterCodeLogic, InvitationCodeLogic, AccessControlLogic} from "database";
import {sendEmail} from "@/lib/email";
import {ReturnStatus, ResponseStatus} from "@/app/api/typing.d";


/**
 * 注册用户
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest): Promise<Response> {
  try {
    const {email, password, code, code_type, phone, invitation_code} =
      await req.json();


    const userDal = new UserDAL();
    if (await userDal.exists(email)) {
      // 用户已经存在
      return NextResponse.json({status: ResponseStatus.alreadyExisted});
    }

    // 激活验证码
    const registerCodeLogic = new RegisterCodeLogic()
    const success = await registerCodeLogic.activateCode(email, code.trim());

    if (!success)
      return NextResponse.json({status: ResponseStatus.invalidCode});

    const user = new UserLogic();
    await user.register(email, password);

    // 如果使用邀请码注册, 则判断激活码类型并给予相应权益
    if (invitation_code) {
      const invitationCode = new InvitationCodeLogic()

      const code = await invitationCode.acceptCode(
        email,
        invitation_code.toLowerCase(),
      );
      // await user.newSubscription({
      //   startsAt: Date.now(),
      //   endsAt: Date.now() + 3 * 60 * 60 * 24 * 1000,
      //   plan: "pro",
      //   tradeOrderId: `club-code-${invitation_code.toLowerCase()}`,
      // });
    }

    // 注册后 直接生成一个 JWT Token 返回
    const accessControl = new AccessControlLogic()
    const token = await accessControl.newSessionToken(email)
    return NextResponse.json({
      status: ResponseStatus.Success,
      sessionToken: token,
    });
  } catch (error) {
    console.error("[REGISTER]", error);
    return new Response("[INTERNAL ERROR]", {status: 500});
  }
}
