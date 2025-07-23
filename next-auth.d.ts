// types/next-auth.d.ts

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
// types/auth.ts

export interface Profile {
  id?: string | number;
  name?: string;
  email?: string;
  image?: string;
  // generic properties all OAuth profiles may have
}

export interface GitHubProfile extends Profile {
  id: number;       // GitHub profile id is a number
  login: string;    // GitHub username/login
  bio?: string;
}
