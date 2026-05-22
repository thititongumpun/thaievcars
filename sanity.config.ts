import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {schemaTypes} from "@/lib/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "xr8ncuc2";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "thaievcars";

export default defineConfig({
  name: "thaievcars",
  title: "ThaiEVCars",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes
  }
});
