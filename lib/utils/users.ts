import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return useMutation(postUser, {
    onMutate: async (newUser: User) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["users"]);

      // Snapshot the previous value
      const previousUsers = queryClient.getQueryData<User[]>(["users"]);

      // Optimistically update to the new value
      if (previousUsers) {
        queryClient.setQueryData<User[]>(
          ["users"],
          [...previousUsers, newUser]
        );
      }
      return { previousUsers };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData<User[]>(["users"], context.previousUsers);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
}
