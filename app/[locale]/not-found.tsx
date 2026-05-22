import {LinkButton} from "@/components/ui/link-button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-muted-foreground">The page or EV model you are looking for does not exist yet.</p>
      <LinkButton href="/" className="mt-6">Back home</LinkButton>
    </section>
  );
}
