import type { Metadata } from "next";
import { posts } from "@/lib/velite";
import { PostCard } from "@/components/blog/PostCard";
import { TagFilter } from "@/components/blog/TagFilter";
import { SearchBar } from "@/components/blog/SearchBar";

export const metadata: Metadata = {
  title: "博客",
  description: "技术思考与实践分享",
};

type SearchParams = Promise<{ tag?: string; q?: string }>;

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;

  // Filter out drafts, sort by date descending
  const published = posts
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Extract all unique tags
  const allTags = [...new Set(published.flatMap((p) => p.tags))].sort();

  // Filter by tag
  const selectedTag = sp.tag;
  const query = sp.q?.toLowerCase();
  let filtered = selectedTag
    ? published.filter((p) => p.tags.includes(selectedTag))
    : published;
  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  return (
    <div className="container-page py-12">
      {/* Search + Tags */}
      <div className="mx-auto max-w-2xl space-y-6 mb-12">
        <SearchBar />
        <TagFilter tags={allTags} selectedTag={selectedTag} />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-[rgb(var(--color-text-secondary))]">
            没有找到相关文章
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl grid gap-6">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
