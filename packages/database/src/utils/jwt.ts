import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

interface Payload extends JWTPayload {
  email: string;
}

export async function sign(payload: JWTPayload): Promise<string> {
  const iat = Math.floor(Date.now() / 1000); // Not before: Now
  const exp = iat + 7 * 24 * (60 * 60); // Expires: Now + 1 week
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));
}

export async function verify(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET!)
  );
  return payload;
}
