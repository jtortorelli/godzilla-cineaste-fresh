import { render } from "gfm";
import { extract } from "frontmatter";

export default async function parseMarkdown(filename: string) {
  const fileContents = await Deno.readTextFile(filename);
  const { attrs, body } = extract(fileContents);
  const renderedBody = render(body);

  return { attrs, renderedBody };
}
