// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Values } from "models";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password }: Values = req.body;
  try {
    const result = await prisma.users.create({
      data: {
        email,
        password,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Unable to create a user." });
  }
}
