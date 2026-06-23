import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9一-鿿-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(100),
      slug: s.string().optional(),
      date: s.isodate(),
      updated: s.isodate().optional(),
      tags: s.array(s.string()).default([]),
      description: s.string().max(300),
      draft: s.boolean().default(false),
      cover: s.string().optional(),
      code: s.markdown(),
    })
    .transform((data, { meta }) => ({
      ...data,
      slug: data.slug || slugify(data.title),
      path: `/blog/${data.slug || slugify(data.title)}`,
    })),
});

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(100),
      slug: s.string().optional(),
      description: s.string().max(300),
      tags: s.array(s.string()).default([]),
      links: s
        .object({
          github: s.string().optional(),
          demo: s.string().optional(),
          docs: s.string().optional(),
        })
        .default({}),
      status: s.enum(["active", "completed", "archived"]).default("completed"),
      featured: s.boolean().default(false),
      date: s.isodate(),
      cover: s.string().optional(),
      code: s.markdown(),
    })
    .transform((data, { meta }) => ({
      ...data,
      slug: data.slug || slugify(data.title),
      path: `/projects/${data.slug || slugify(data.title)}`,
    })),
});

export default defineConfig({
  root: "src/content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    clean: true,
  },
  collections: { posts, projects },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["heading-link"],
          },
        },
      ],
    ],
  },
  markdown: {
    gfm: true,
  },
});
