import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RedirectUser, User } from "../models/index";

export function useGetUsers() {
  return useQuery(["users"], getUsers);
}
export function useGetUser() {
  return useQuery(["user"], getUser);
}

export function useSignupUser() {
  return useMutation(signupUser);
}

export function useLoginUser() {
  return useMutation(loginUser);
}

export async function getUsers(): Promise<User[]> {
  const res = await axios.get("/api/users");
  return res.data;
}

export async function getUser(): Promise<User> {
  const res = await axios.get("/api/user");
  return res.data;
}

export function signupUser(user: User) {
  return axios.post("/api/signup", user);
}
export function loginUser(user: User) {
  return axios.post("/api/login", user);
}

export function useUser({ redirectTo, redirectIfFound }: RedirectUser = {}) {
  const user = useGetUser();
  const router = useRouter();
  


  useEffect(() => {
    if (!redirectTo || !user.isSuccess) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user.data) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user.data)
    ) {
      router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, user.isSuccess, user.data, router]);

  return  user;
}
// // Mutate user and update it optimistically
// export function useMutate() {
//   const queryClient = useQueryClient();
//   return useMutation(signupUser, {
//     onMutate: async (newUser: User) => {
//       // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
//       await queryClient.cancelQueries(["users"]);

//       // Snapshot the previous value
//       const previousUsers = queryClient.getQueryData<User[]>(["users"]);

//       // Optimistically update to the new value
//       if (previousUsers) {
//         queryClient.setQueryData<User[]>(
//           ["users"],
//           [...previousUsers, newUser]
//         );
//       }
//       return { previousUsers };
//     },
//     // If the mutation fails, use the context returned from onMutate to roll back
//     onError: (err, variables, context) => {
//       if (context?.previousUsers) {
//         queryClient.setQueryData<User[]>(["users"], context.previousUsers);
//       }
//     },
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries(["users"]);
//     },
//   });
// }
