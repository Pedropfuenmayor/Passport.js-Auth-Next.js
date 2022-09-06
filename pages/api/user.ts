import { NextApiRequest, NextApiResponse } from "next";
import { getLoginSession } from "../../lib/auth";
import { findUser } from "../../lib/user";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getLoginSession(req);
    // if (!session)
    //   return res
    //     .status(500)
    //     .end({ message: "Authentication token is invalid, please log in" });
    const { email } = session;
    const user = (session && (await findUser(email))) ?? null;
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Authentication token is invalid, please log in" });
  }
}
