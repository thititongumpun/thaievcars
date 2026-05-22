import {defineField, defineType} from "sanity";

export const faqCategory = defineType({
  name: "faqCategory",
  title: "FAQ category",
  type: "document",
  fields: [
    defineField({name: "name", title: "Name", type: "localizedString"}),
    defineField({name: "slug", title: "Slug", type: "slug", options: {source: "name.en"}, validation: (rule) => rule.required()}),
    defineField({name: "order", title: "Order", type: "number", initialValue: 0})
  ],
  preview: {
    select: {title: "name.en", subtitle: "order"}
  }
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "document",
  fields: [
    defineField({name: "question", title: "Question", type: "localizedString"}),
    defineField({name: "answer", title: "Answer", type: "localizedString"}),
    defineField({name: "category", title: "Category", type: "reference", to: [{type: "faqCategory"}]}),
    defineField({name: "relatedCar", title: "Related car", type: "reference", to: [{type: "carModel"}]})
  ],
  preview: {
    select: {title: "question.en", subtitle: "category.name.en"}
  }
});
