import {defineField, defineType} from "sanity";

export const pricingPeriod = defineType({
  name: "pricingPeriod",
  title: "Pricing period",
  type: "object",
  fields: [
    defineField({name: "label", title: "Label", type: "localizedString"}),
    defineField({name: "startDate", title: "Start date", type: "date", validation: (rule) => rule.required()}),
    defineField({name: "endDate", title: "End date", type: "date"}),
    defineField({name: "priceThb", title: "Price THB", type: "number", validation: (rule) => rule.required().min(0)}),
    defineField({name: "discountThb", title: "Discount THB", type: "number", initialValue: 0}),
    defineField({name: "notes", title: "Notes", type: "localizedString"})
  ],
  preview: {
    select: {
      title: "label.th",
      subtitle: "priceThb"
    }
  }
});
