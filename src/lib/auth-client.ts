import { BetterAuthOptions, Session, User } from "better-auth";
import { createAuthClient } from "better-auth/react";
import { polarClient } from "@polar-sh/better-auth";

type AuthSession = {
    user: User;
    session: Session;
  };
  
//   type Auth = {
//     options: BetterAuthOptions & AuthSession;
//   };

  
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    plugins: [polarClient()]
});