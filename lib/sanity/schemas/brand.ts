import {defineField, defineType} from "sanity";

export const brand = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    defineField({name: "name", title: "Name", type: "localizedString"}),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {source: "name.en"},
      validation: (rule) => rule.required()
    }),
    defineField({name: "logo", title: "Logo", type: "image", options: {hotspot: true}}),
    defineField({name: "logoText", title: "Logo text fallback", type: "string"}),
    defineField({name: "country", title: "Country", type: "localizedString"}),
    defineField({name: "description", title: "Description", type: "localizedString"}),
    defineField({name: "websiteUrl", title: "Website URL", type: "url"}),
    defineField({name: "featured", title: "Featured", type: "boolean", initialValue: false})
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "country.en",
      media: "logo"
    }
  }
});
