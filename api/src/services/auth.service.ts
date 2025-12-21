import { prisma } from "../prisma/client";
import { signJwt } from "../utils/jwt";
import bcrypt from "bcrypt";

export async function authLogin(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Invalid credentials");

  return signJwt({ userId: user.id });
}
