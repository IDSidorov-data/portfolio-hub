import { getCaseSlugs, readCaseBySlug } from "@/lib/mdx";
import Container from "@/components/Container";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  return getCaseSlugs().map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { frontmatter } = readCaseBySlug(params.slug);
  return {
    title: `${frontmatter.title} — Иван Сидоров`,
    description: frontmatter.tag,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.tag,
      type: "article",
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: { slug: string };
}) {
  const { content, frontmatter } = readCaseBySlug(params.slug);

  const { content: rendered } = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
  });

  return (
    <Container className="py-10 sm:py-16">
      <h1 className="text-3xl font-semibold mb-2">{frontmatter.title}</h1>
      <div className="mb-8 text-sm text-zinc-500">
        {frontmatter.tag} · {frontmatter.date}
      </div>
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        {rendered}
      </article>
    </Container>
  );
}
