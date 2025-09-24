import { getCaseSlugs, readCaseBySlug } from "@/lib/mdx";
import Container from "@/components/Container";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

import CaseHero from '@/components/CaseHero';
import CaseReadingProgress from '@/components/CaseReadingProgress';
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
    title: `${frontmatter.title} - case study`,
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
    <>
      <CaseReadingProgress />

      <div className="py-10 sm:py-16">
        <Container>
          <CaseHero
            slug={params.slug}
            title={frontmatter.title}
            summary={frontmatter.summary}
            role={frontmatter.role}
            duration={frontmatter.duration}
            status={frontmatter.status}
            tags={frontmatter.tags}
            links={frontmatter.links}
          />
        </Container>
      </div>

      <Container className="pb-12 sm:pb-16">
        <article className="prose prose-zinc dark:prose-invert max-w-none">
          {rendered}
        </article>

        <CaseCTA result={frontmatter?.result} />
      </Container>
    </>
  );
}


