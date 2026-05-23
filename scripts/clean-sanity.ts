import {createClient} from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-22",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false
});

async function clean() {
  const types = ["brand", "carModel", "faqCategory", "faqItem", "referenceSource"];
  const ids: string[] = await client.fetch('*[_type in $types]._id', {types});
  console.log(`Found ${ids.length} documents to delete`);
  if (!ids.length) return;

  const tx = client.transaction();
  ids.forEach((id) => tx.delete(id));
  await tx.commit();
  console.log("Done — all documents deleted");
}

clean().catch((err) => { console.error(err); process.exit(1); });
