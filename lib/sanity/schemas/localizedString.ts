import {defineField, defineType} from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({name: "th", title: "Thai", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "en", title: "English", type: "string", validation: (rule) => rule.required()})
  ]
});
