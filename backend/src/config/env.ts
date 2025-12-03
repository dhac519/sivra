import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET as string,
jwtExpiresIn: (process.env.JWT_EXPIRES_IN as string) || "1d",
};
