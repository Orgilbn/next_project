import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import { redirect } from 'next/navigation';
import { AUTHOR_BY_GITHUB_ID_QUERY } from '@/sanity/lib/queries';
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
    const id = (await params).id;
    const session = await auth();
    if(!session) redirect("/");
    const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id});
    
  return (
    <div>User Page: {user.name}</div>
  )
}

export default Page