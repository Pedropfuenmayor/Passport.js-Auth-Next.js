import crypto, { BinaryLike } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import Local from "passport-local";
import isEmail from "validator/lib/isEmail";
import prisma from "../../lib/prisma";
import { User } from "../../models/index";

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

export function authenticate(
  method: string,
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(req, res);
  });
}

export function validatePassword(user: User, password: string) {
  const inputHash = crypto
    .pbkdf2Sync(password, user.salt as BinaryLike, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.password === inputHash;
  return passwordsMatch;
}

export const localStrategy = new Local.Strategy(async function (
  email,
  password,
  done
) {
  try {
    const isUser = await findUser(email);
    const isValidUser = validatePassword(isUser as User, password);
    console.log(isValidUser);
    if (isUser && isValidUser) {
      done(null, isUser);
    } else {
      done(new Error("Invalid email and password combination"));
    }
  } catch (error) {
    done(error);
  }
});
