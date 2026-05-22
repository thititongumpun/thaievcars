import {createClient} from "next-sanity";
import {sanityApiVersion, sanityDataset, sanityProjectId} from "./env";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: !process.env.SANITY_API_TOKEN,
  perspective: "published"
});
