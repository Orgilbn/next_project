import { StartupCardType } from "@/types/startup";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: { searchParams: { query?: string } }) {
  const query = (await searchParams).query;
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      _id: "1",
      title: "Orgiliin super shit",
      description: "Hutsalgui aljaa hii",
      image: "https://images.squarespace-cdn.com/content/v1/6150da9bc04b0a138b3c0600/1634528500503-V7KPRTKGCRB73IY6IKB9/Stone-Circle.jpg",
      category: "Tech",
      author: {
        _id: "1",
        name: "Boojgoi"
    }}
  ];
  return (
    <div>
      <section className="pink-container pattern">
        <h1 className="heading">Pitch your Startup<br/>Connect with Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">Submit ideas, Vote on Pitches, and get Noticed in Virtual Compititors.</p>
        <SearchForm query={query} />
      </section>
      <section className="section-container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card-grid">
          {posts?.length > 0 ? 
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            )
          ): (
            <p className="no-results">No Startups Found</p>
          )}
        </ul>
      </section>
    </div>
  );
}
