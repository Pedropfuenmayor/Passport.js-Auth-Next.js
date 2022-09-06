import { ReactNode } from "react";

export type Props = {
  children?: ReactNode;
};

export interface User {
  email: string;
  password: string;
  id?: number;
  salt?: string;
  createdAt?: Date;
}

export interface RedirectUser {
  redirectTo?: string;
  redirectIfFound?: string;
} 
