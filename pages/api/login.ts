import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import passport from "passport";
import { User } from "../../models/index";
import { authenticate, localStrategy } from "./utils";

passport.use(localStrategy);
export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user =  await authenticate("local", req, res);
      // session is the payload to save in the token, it may contain basic info about the user
      console.log(user)
    //   const session = { ...user };

      //   await setLoginSession(res, session)

      res.status(200).send({ done: true });
    } catch (error) {
      console.error(error);
      res.status(401).send(error.message);
    }
  });
