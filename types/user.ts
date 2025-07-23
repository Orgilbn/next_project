// types/auth.ts

export type GitHubProfile = {
  id: number;
  login: string;
  bio?: string;
  name?: string;
  email?: string;
  image?: string;
};


// Optional: If you want to define a "Sanity Author" user
export type AuthorUser = {
  _id: string;
  _type: "author";
  id: number;
  name: string;
  username: string;
  email: string;
  image: string;
  bio: string;
};
