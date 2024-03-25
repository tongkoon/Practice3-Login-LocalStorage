import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";

export const secret = "TT-SECRET";
export const jwtAuthen = expressjwt({
  secret: secret,
  algorithms: ["HS256"],
});

export function generateToken(payload:string, secretKey: string): string {
  const token: string = jwt.sign(payload, secretKey, {
    issuer: "TT-LS"
  });
  return token;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function verifyToken(token: string,secretKey: string) : { valid: boolean; decoded?: any; error?: string } {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decodedPayload: any = jwt.verify(token, secretKey);
      return { valid: true, decoded: decodedPayload};
    } catch (error) {
      return { valid: false, error: JSON.stringify(error) };
    }
  }