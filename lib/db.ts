import { User } from "../models/index";
import prisma from "./prisma";

export function saveUser(user: User) {
    const { email, password, salt, createdAt } = user;
    return prisma.users.create({
      data: {
        email,
        password,
        salt: salt!,
        created_at: createdAt!,
      },
    });
  }