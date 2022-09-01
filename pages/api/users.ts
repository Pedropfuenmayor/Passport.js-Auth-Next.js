// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "models";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //GET
  if (req.method === "GET") {
    try {
      const result = await prisma.users.findMany();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Unable to create a user." });
    }
  }

  //POST
  if (req.method === "POST") {
    const { email, password }: User = req.body;
    try {
      const result = await prisma.users.create({
        data: {
          email,
          password,
        },
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "Unable to create a user." });
    }
  }
}
