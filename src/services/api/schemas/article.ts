import { z } from "zod";

export const articleIdSchema = z.uuid();

export const articleSchema = z.object({
  id: articleIdSchema,
  title: z.string().min(1),
  content: z.string(),
  publishedAt: z.iso.datetime({ offset: true }),
});

export const articleListSchema = z.array(articleSchema);

export type Article = z.infer<typeof articleSchema>;
