import { User } from "models";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import passport from "passport";
import { authenticate, localStrategy } from "../../lib/passport";
import { setLoginSession } from "../../lib/auth";

passport.use(localStrategy);
export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate("local", req, res);
      // session is the payload to save in the token, it may contain basic info about the user
      const session = { ...(user as User) };

      await setLoginSession(res, session);

      res.status(200).send({ done: true });
    } catch (error) {
      console.error(error);
      res.status(401).send({ message: "Email password combination not valid" });
    }
  });
