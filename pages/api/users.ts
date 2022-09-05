// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { User } from "../../models/index";

export default async function users(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //GET
  try {
    const result = await prisma.users.findMany();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch users." });
  }
}
