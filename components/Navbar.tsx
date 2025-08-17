import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { client } from "@/sanity/lib/client";

const NavBar = async () => {
    const session = await auth();
    
    let githubId = null;
    if (session?.id) {
        // Get the GitHub ID from the user document
        const user = await client.fetch(`*[_type == "author" && _id == $id][0]{ githubId }`, { id: session.id });
        githubId = user?.githubId;
    }
  return (
    <nav>
      <header className="px-5 py-3 bg-white shadow-md">
        <nav className="flex-between">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={144}
                height={30}
              />
            </Link>
            <div className="flex flex-row items-center gap-5">
                {session && session?.user ? (
                    <>
                        <Link href="startup/create">
                            <span >Create</span>
                        </Link>
                        <form action={async () => {
                            "use server";
                            await signOut();
                        }}>
                            <button type="submit">Logout</button>
                        </form>
                        <span>{session?.user?.name}</span>
                        <Link href={`/user/${githubId}`}>
                            <span>{session?.user?.name}</span>
                        </Link>
                    </>
                ):
                    <form action={async() => {
                        "use server";
                        await signIn('github')
                    }}>
                        <button type="submit" className="text-30-bold"> Login </button>
                    </form>

                }
            </div>
        </nav>
      </header>
    </nav>
  );
};

export default NavBar;
