import {defineField, defineType} from "sanity";

export const colorOption = defineType({
  name: "colorOption",
  title: "Color option",
  type: "object",
  fields: [
    defineField({name: "name", title: "Name", type: "localizedString"}),
    defineField({name: "hex", title: "Hex", type: "string"})
  ],
  preview: {
    select: {
      title: "name.th",
      subtitle: "hex"
    }
  }
});
