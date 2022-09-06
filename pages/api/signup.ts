import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../models/index";
import { createUser } from "../../lib/user";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user: User = req.body;
  try {
    const results = await createUser(user);
    res.status(201).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to create a user." });
  }
}
