import { NextRequest, NextResponse } from "next/server";
import { Register, UserDAL } from "dal";
import { sendEmail } from "@/lib/email";
import { sendPhone } from "@/lib/phone";
import { ResponseStatus } from "@/app/api/typing.d";

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  if (!email) return NextResponse.json({ status: ResponseStatus.notExist });
  const user = new UserDAL(email);
  if (!phone) {
    const codeData = await user.newRegisterCode("email");
    if (codeData.status === Register.ReturnStatus.Success) {
      await sendEmail([email], "", codeData.code + "");
    }
    return NextResponse.json({
      status: ResponseStatus.Success,
      code_data: codeData,
    });
  } else {
    const codeData = await user.newRegisterCode("phone", phone);
    if (codeData.status === Register.ReturnStatus.Success) {
      await sendPhone(phone, codeData.code + "");
    }
    return NextResponse.json({
      status: ResponseStatus.Success,
      code_data: codeData,
    });
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const { email, password, code, code_type, phone } = await req.json();
    const user = new UserDAL(email);

    if (code_type === "email") {
      if (await user.exists()) {
        // 用户已经存在
        return NextResponse.json({ status: ResponseStatus.alreadyExisted });
      }

      // 激活验证码
      const success = await user.activateRegisterCode(code.trim(), "email");
      if (!success) {
        return NextResponse.json({ status: ResponseStatus.invalidCode });
      }

      const new_user = await UserDAL.fromRegistration(email, password);
      if (!new_user) throw Error("new user is null");

      const token= await new_user.accessControl.newSessionToken();
      return NextResponse.json({
        status: ResponseStatus.Success,
        token,
        email
      });
    } else if (code_type === "phone") {
      if (!(await user.exists()) || !phone) {
        // 用户不存在或者手机号不存在
        return NextResponse.json({ status: ResponseStatus.notExist });
      }

      const success = await user.activateRegisterCode(
        code.trim(),
        "phone",
        phone,
      );
      if (success) return NextResponse.json({ status: ResponseStatus.Success });
      else return NextResponse.json({ status: ResponseStatus.invalidCode });
    }

    return NextResponse.json({}, { status: 404 });
  } catch (error) {
    console.error("[REGISTER]", error);
    return new Response("[INTERNAL ERROR]", { status: 500 });
  }
}
