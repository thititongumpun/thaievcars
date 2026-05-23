import {revalidateTag} from "next/cache";
import {NextResponse} from "next/server";

const documentTypeTags: Record<string, string[]> = {
  brand: ["sanity", "brands", "cars"],
  carModel: ["sanity", "cars", "brands", "faq"],
  faqCategory: ["sanity", "faq"],
  faqItem: ["sanity", "faq", "cars"],
  referenceSource: ["sanity", "references"]
};

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const requestSecret = request.headers.get("x-revalidate-secret");

  if (!secret || requestSecret !== secret) {
    return NextResponse.json({ok: false, message: "Unauthorized"}, {status: 401});
  }

  const body = await request.json().catch(() => ({}));
  const documentType = typeof body._type === "string" ? body._type : undefined;
  const tags = documentType ? documentTypeTags[documentType] ?? ["sanity"] : ["sanity"];

  tags.map((tag) => revalidateTag(tag, "max"));

  return NextResponse.json({
    ok: true,
    revalidated: tags,
    documentType: documentType ?? null,
    at: new Date().toISOString()
  });
}
