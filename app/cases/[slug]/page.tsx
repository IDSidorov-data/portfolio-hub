import React from "react";

import { getCaseSlugs, readCaseBySlug } from "@/lib/mdx";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

import CaseHero from '@/components/CaseHero';
import CaseReadingProgress from '@/components/CaseReadingProgress';
import CaseCTA from '@/components/CaseCTA';
import CaseSectionIsland from '@/components/CaseSectionIsland';
import Container from "@/components/Container";

const prettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
  defaultLang: "text",
};

function partitionContent(rendered: React.ReactNode) {
  const nodes = React.Children.toArray(rendered);
  const intro: React.ReactNode[] = [];
  const sections: Array<{ heading: React.ReactElement; body: React.ReactNode[] }> = [];

  let current: { heading: React.ReactElement; body: React.ReactNode[] } | null = null;

  nodes.forEach((node) => {
    if (React.isValidElement(node) && typeof node.type === 'string' && node.type === 'h2') {
      if (current) {
        sections.push(current);
      }
      current = { heading: node, body: [] };
      return;
    }

    if (current) {
      current.body.push(node);
    } else {
      intro.push(node);
    }
  });

  if (current) {
    sections.push(current);
  }

  return { intro, sections };
}

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

const toneCycle = ['neutral', 'cool', 'warm', 'iris'] as const;

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

  const { intro, sections } = partitionContent(rendered);

  return (
    <>
      <CaseReadingProgress />

      <section className="py-10 sm:py-16">
        <Container>
          <div className="mx-auto w-full max-w-[62rem]">
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
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="mx-auto w-full max-w-[62rem] space-y-8 sm:space-y-10">
            {intro.length > 0 && (
              <CaseSectionIsland tone="neutral" className="mx-auto w-full">
                <div className="case-article">
                  <div className="mx-auto w-full max-w-[62rem] space-y-4">{intro}</div>
                </div>
              </CaseSectionIsland>
            )}

            {sections.map((section, index) => {
              const tone = toneCycle[index % toneCycle.length];
              const clonedHeading = React.cloneElement(section.heading, {
                className:
                  'text-2xl font-semibold leading-tight text-slate-900 tracking-tight dark:text-white',
              });

              return (
                <CaseSectionIsland tone={tone} key={section.heading.props.id ?? index} className="mx-auto w-full">
                  <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {clonedHeading}
                  </header>
                  <div className="case-article">
                    <div className="mx-auto w-full max-w-[62rem] space-y-4">{section.body}</div>
                  </div>
                </CaseSectionIsland>
              );
            })}
            <CaseCTA result={frontmatter?.result} />
          </div>
        </Container>
      </section>
    </>
  );
}
