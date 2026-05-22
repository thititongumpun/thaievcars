import {defineField, defineType} from "sanity";

export const referenceSource = defineType({
  name: "referenceSource",
  title: "Reference source",
  type: "document",
  fields: [
    defineField({name: "title", title: "Title", type: "localizedString"}),
    defineField({name: "description", title: "Description", type: "localizedString"}),
    defineField({name: "url", title: "URL", type: "url", validation: (rule) => rule.required()}),
    defineField({name: "category", title: "Category", type: "string", options: {list: ["official", "tools"]}}),
    defineField({name: "checkedAt", title: "Checked at", type: "date"})
  ],
  preview: {
    select: {title: "title.en", subtitle: "url"}
  }
});
