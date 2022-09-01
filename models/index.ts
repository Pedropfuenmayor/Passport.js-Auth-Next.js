import { ReactNode } from "react";

export interface User {
    email: string;
    password: string;
    id?:number;
  }

  export type Props = {
    children?: ReactNode;
  };