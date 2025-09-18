// lib/mdx.ts
import fs from "fs";               // ← обычный fs (НЕ promises)
import path from "path";
import matter from "gray-matter";

const CASES_DIR = path.join(process.cwd(), "content", "cases");

export function getCaseSlugs(): string[] {
  return fs
    .readdirSync(CASES_DIR)
    .filter((f: string) => f.endsWith(".mdx"));  // ← тип параметра
}

export function readCaseBySlug(
  slug: string
): { content: string; frontmatter: Record<string, any> } {
  const file = path.join(CASES_DIR, `${slug}.mdx`);
  const src = fs.readFileSync(file, "utf8");
  const { content, data } = matter(src);
  return { content, frontmatter: data as Record<string, any> };
}
