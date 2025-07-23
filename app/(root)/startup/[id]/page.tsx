// /startup/124/
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import markdownit from 'markdown-it';
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const md = markdownit();

export const experimental_ppr = true;


const Page = async ({params} : {params: Promise<{ id: string }>}) => {
    const id = (await params).id;

    const post= await client.fetch(STARTUPS_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink-container pattern !min-h-[230px]">
        <p className="tag">{formatDate(post._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section-container space-y-6">
        <img 
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        ></img>
        <div className="space-y-5 met-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${post.author.id}`} className="flex gap-2 items-center mb-3">
              <Image 
              src={post.author.image}
                alt="Author Image"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg w-16 h-16"
              ></Image>
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <p className="text-30-bold">Pitch Details</p>
          {parsedContent ? (
            <article 
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}/>
          ) : (
            <p className="no-result">No details provided.</p>
          )}
        </div>

        <hr className="divider"></hr>
      </section>
      <Suspense fallback={<Skeleton className="view"/>}>
          <View id={id}/>
      </Suspense>
    </>
    
  );
}

export default Page;
