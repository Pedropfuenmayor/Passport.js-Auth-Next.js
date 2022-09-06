import crypto, { BinaryLike } from "crypto";
import isEmail from "validator/lib/isEmail";
import prisma from "./prisma"
import { User } from "../models/index";
import { saveUser } from "./db";

export function hashUser({ email, password }: User) {
    // Here you should create the user and save the salt and hashed password (some dbs may have
    // authentication methods that will do it for you so you don't have to worry about it):
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    const user: User = {
      createdAt: new Date(),
      email,
      password: hashedPassword,
      salt,
    };
  
    return user;
  }
  
  export function validateUser(user: User) {
    isEmail(user.email);
    return user;
  }
  
  
  export function findUser(email: string) {
    return prisma.users.findUnique({
      where: {
        email,
      },
    });
  }
  
  export function createUser(user: User) {
    const validatedUser = validateUser(user);
    const hashedUser = hashUser(validatedUser);
    return saveUser(hashedUser);
  }

  export function validatePassword(user: User, password: string) {
    const inputHash = crypto
      .pbkdf2Sync(password, user.salt as BinaryLike, 1000, 64, "sha512")
      .toString("hex");
    const passwordsMatch = user.password === inputHash;
    return passwordsMatch;
  }
  