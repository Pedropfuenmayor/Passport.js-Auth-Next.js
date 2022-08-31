import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "models";

async function getUsers(): Promise<User[]> {
  const res = await axios.get("/api/users");
  return res.data;
}

function postUser(newUser: User) {
  return axios.post("/api/users", newUser);
}

export function useGetUsers() {
  return useQuery(["users"], getUsers);
}

export function usePostUser() {
    return useMutation(postUser);
}


