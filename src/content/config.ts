import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60).min(10),
      hero: image().optional(),
      heroImage: z.string(),
      heroAlt: z.string(),
      description: z.string().max(160),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      author: z.string(),
      authorImg: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
  blog: blogCollection,
};


const ecgBlogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60).min(10),
      hero: image().optional(),
      heroImage: z.string(),
      heroAlt: z.string(),
      description: z.string().max(160),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      author: z.string(),
      authorImg: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

export const ecgCollections = {
  ecgBlog: ecgBlogCollection,
};