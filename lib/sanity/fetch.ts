import {sanityClient} from "./client";
import {hasSanityConfig} from "./env";

export async function fetchSanity<T>(query: string, params: Record<string, string> = {}, tags: string[] = ["sanity"]): Promise<T | undefined> {
  if (!hasSanityConfig()) return undefined;

  try {
    return await sanityClient.fetch<T>(query, params, {next: {revalidate: 300, tags}});
  } catch (error) {
    console.warn("Sanity fetch failed, falling back to seed data", error);
    return undefined;
  }
}
