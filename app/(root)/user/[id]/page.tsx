import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import { notFound, redirect } from 'next/navigation';
import { AUTHOR_BY_GITHUB_ID_QUERY } from '@/sanity/lib/queries';
import React from 'react'
import Image from 'next/image';
const Page = async ({ params }: { params: { id: string } }) => {
    const githubId = (await params).id;
    const session = await auth();
    if(!session) redirect("/");
    
    console.log("Route GitHub ID:", githubId);
    
    const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { githubId: parseInt(githubId) });
    console.log("Found user:", user);
    
    if (!user) {
        notFound();
    }
    return (
        <>
            <section className='profile-container'>
              <div className='profile-card'>
                <div className='profile-title'>
                  <h3 className='text-24-black uppercase text-center line-clamp-1'>
                    {user.name}
                  </h3>
                </div>
                <Image 
                  src={user.image}
                  alt={user.name}
                  width={220}
                  height={220}
                  className='profile-image'
                />
                <p></p>
              </div>
              
            </section>
        </>
    );
}

export default Page