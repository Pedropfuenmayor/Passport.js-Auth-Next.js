// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import  Users  from "../../models/users";
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
      console.log(error)
      res.status(500).json({ message: "Unable to fetch users." });
    }
  }

  //POST
  if (req.method === "POST") {
    const { email, password }: Users = req.body;
    try {
      const user = new Users (email, password);
      console.log(user)

      // res.status(201).json(results);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Unable to create a user."});
    }
  }
}
