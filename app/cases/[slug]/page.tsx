import React from "react";

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
import CaseSectionIsland from '@/components/CaseSectionIsland';
import BackButton from '@/components/BackButton';

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

      <div className="py-10 sm:py-16">
        <Container>
          <div className="mb-6 flex justify-start">
            <BackButton />
          </div>
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

      <Container className="pb-14 sm:pb-20">
        <div className="mx-auto w-full px-4 sm:px-6 max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          <div className="space-y-8 sm:space-y-10">
          {intro.length > 0 && (
            <CaseSectionIsland tone="neutral">
              <div className="case-article">
                <div className="mx-auto max-w-[72ch] space-y-4">{intro}</div>
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
              <CaseSectionIsland tone={tone} key={section.heading.props.id ?? index}>
                <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {clonedHeading}
                </header>
                <div className="case-article">
                  <div className="mx-auto max-w-[72ch] space-y-4">{section.body}</div>
                </div>
              </CaseSectionIsland>
            );
          })}
        </div>
      </div>

        <CaseCTA result={frontmatter?.result} />
      </Container>
    </>
  );
}
