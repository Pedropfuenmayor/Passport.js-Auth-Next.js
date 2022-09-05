import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../models/index";

export function useGetUsers() {
  return useQuery(["users"], getUsers);
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

export function signupUser(user: User) {
  return axios.post("/api/signup", user);
}
export function loginUser(user: User) {
  return axios.post("/api/login", user);
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
