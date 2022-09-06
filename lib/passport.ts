import { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import { User } from "models";
import Local from "passport-local";
import { findUser, validatePassword } from "./user";

export const localStrategy = new Local.Strategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const isUser = await findUser(email);
        const isValidUser = validatePassword(isUser as User, password);
        if (isUser && isValidUser) {
          done(null, isUser);
        } else {
          done(new Error("Invalid email and password combination"));
        }
      } catch (error) {
        done(error);
      }
    }
  );

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

  