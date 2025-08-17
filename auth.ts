import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Profile } from "next-auth";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { GitHubProfile } from "./types/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],

  callbacks: {
    async signIn({
      user,
      profile,
    }: {
      user: User;
      profile?: Profile;  // generic Profile type
      account?: any;
      email?: any;
      credentials?: any;
    }) {
      const githubProfile = profile as GitHubProfile | undefined;

      if (!githubProfile?.id) {
        console.error("GitHub profile ID missing");
        return false;
      }

      try {
        const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          githubId: githubProfile.id,
        });

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            githubId: githubProfile.id,
            name: user.name,
            username: githubProfile.login,
            email: user.email,
            image: user.image,
            bio: githubProfile.bio || "",
          });
        }

        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },

    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT;
      account?: any;
      profile?: Profile;
    }) {
      const githubProfile = profile as GitHubProfile | undefined;

      if (account && githubProfile?.id) {
        try {
          const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            githubId: githubProfile.id,
          });
          token.id = user?._id;
        } catch (error) {
          console.error("Error fetching user for JWT:", error);
        }
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: any;
      token: JWT;
    }) {
      session.id = token.id as string;
      return session;
    },
  },
});
