import { prisma } from "../prisma/client";
import { signJwt } from "../utils/jwt";
import bcrypt from "bcrypt";

export async function authLogin(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("No user found with this email");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Invalid password");

  return signJwt({ userId: user.id });
}
