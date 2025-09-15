import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CASES_DIR = path.join(process.cwd(), "content", "cases");

export function getCaseSlugs() {
  return fs.readdirSync(CASES_DIR).filter((f) => f.endsWith(".mdx"));
}

export function readCaseBySlug(slug: string) {
  const file = path.join(CASES_DIR, `${slug}.mdx`);
  const src = fs.readFileSync(file, "utf8");
  const { content, data } = matter(src);
  return { content, frontmatter: data as any };
}