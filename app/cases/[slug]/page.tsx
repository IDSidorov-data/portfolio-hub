import { getCaseSlugs, readCaseBySlug } from "@/lib/mdx";
import Container from "@/components/Container";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

import CaseMeta from '@/components/CaseMeta';
import CaseCTA from '@/components/CaseCTA';

const prettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
  defaultLang: "text",
};

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
    description: frontmatter.summary ?? "",
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.summary ?? "",
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
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeSlug],
        format: "mdx",
      },
    },
  });

  return (
    <Container className="py-10 sm:py-16">
      {/* Заголовок и описание */}
      <h1 className="text-3xl md:text-4xl font-bold">{frontmatter.title}</h1>
      <p className="case-summary mt-2 text-base md:text-lg opacity-80">
        {frontmatter.summary}
      </p>

      {/* ✅ блок с ролью, длительностью, статусом и тегами */}
      <CaseMeta
        role={frontmatter.role}
        duration={frontmatter.duration}
        status={frontmatter.status}
        tags={frontmatter.tags}
      />

      {/* Контент статьи */}
      <article className="prose prose-zinc dark:prose-invert max-w-none mt-8">
        {rendered}
      </article>

      <CaseCTA result={frontmatter?.result} />
    </Container>
  );
}
