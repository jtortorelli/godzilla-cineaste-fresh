import { parse } from "csv";

export default async function parseCSV(filename: string) {
  try {
    const fileContents = await Deno.readTextFile(filename);
    const results = parse(fileContents, { skipFirstRow: true });
    return results as Record<string, string>[];
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return undefined;
    } else {
      throw error;
    }
  }
}
