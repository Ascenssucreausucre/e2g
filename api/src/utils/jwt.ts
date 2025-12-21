// utils/jwt.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function signJwt(payload: object, options?: jwt.SignOptions) {
  return jwt.sign(payload, JWT_SECRET, {
    ...(options && options),
  });
}
export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as T;
  } catch (err) {
    return null;
  }
}
