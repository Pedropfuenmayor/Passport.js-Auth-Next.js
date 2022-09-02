import { runInThisContext } from "vm";
import prisma from "../lib/prisma";
import { hashUser } from "../lib/user";

export default class Users {
  email: string;
  password: string;
  salt?: string;
  createdAt?: Date;
  id?: string;

  constructor(
    email: string,
    password: string,
    salt?: string,
    createdAt?: Date,
    id?: string
  ) {
    this.email = email;
    this.password = password;
    this.salt = salt;
    this.createdAt = createdAt;
    this.id = id;
  }

  createUser?() {
    const user = hashUser(this);
    return prisma.users.create({
      data: {
        email: user.email,
        password: user.password,
        salt: user.salt!,
        created_at: user.createdAt!,
      },
    });
  }
}
