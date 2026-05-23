import {defineField, defineType} from "sanity";

export const carModel = defineType({
  name: "carModel",
  title: "Car model",
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
    defineField({name: "brand", title: "Brand", type: "reference", to: [{type: "brand"}], validation: (rule) => rule.required()}),
    defineField({name: "images", title: "Images", type: "array", of: [{type: "image", options: {hotspot: true}}]}),
    defineField({name: "externalImageUrls", title: "External image URLs", type: "array", of: [{type: "url"}]}),
    defineField({name: "spinImages", title: "360 spin images", type: "array", of: [{type: "image", options: {hotspot: true}}]}),
    defineField({name: "externalSpinImageUrls", title: "External 360 spin image URLs", type: "array", of: [{type: "url"}]}),
    defineField({name: "shortDescription", title: "Short description", type: "localizedString"}),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {list: ["on-sale", "discontinued"]},
      initialValue: "on-sale"
    }),
    defineField({name: "isNewArrival", title: "New arrival", type: "boolean", initialValue: false}),
    defineField({
      name: "bodyType",
      title: "Body type",
      type: "string",
      options: {list: ["hatchback", "sedan", "suv", "mpv", "pickup"]}
    }),
    defineField({
      name: "wheelsExterior",
      title: "Wheels and exterior",
      type: "object",
      fields: [
        defineField({name: "wheelSizeInch", title: "Wheel size inch", type: "number"}),
        defineField({name: "tireSize", title: "Tire size", type: "string"}),
        defineField({name: "availableColors", title: "Colors", type: "array", of: [{type: "colorOption"}]}),
        defineField({name: "sunroofType", title: "Sunroof type", type: "localizedString"})
      ]
    }),
    defineField({
      name: "variants",
      title: "Variants",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        {
          type: "object",
          fields: [
            defineField({name: "id", title: "Variant ID", type: "string", validation: (rule) => rule.required()}),
            defineField({name: "name", title: "Name", type: "localizedString", validation: (rule) => rule.required()}),
            defineField({name: "saleStartYear", title: "Sale start year", type: "number"}),
            defineField({name: "saleEndYear", title: "Sale end year", type: "number"}),
            defineField({
              name: "status",
              title: "Variant status",
              type: "string",
              options: {list: ["on-sale", "discontinued"]},
              initialValue: "on-sale"
            }),
            defineField({name: "images", title: "Variant images", type: "array", of: [{type: "image", options: {hotspot: true}}]}),
            defineField({name: "externalImageUrls", title: "Variant external image URLs", type: "array", of: [{type: "url"}]}),
            defineField({
              name: "detail",
              title: "Variant detail",
              type: "object",
              fields: [
                defineField({name: "th", title: "Thai", type: "text", rows: 4}),
                defineField({name: "en", title: "English", type: "text", rows: 4})
              ]
            }),
            defineField({
              name: "specs",
              title: "Specs",
              type: "object",
              fields: [
                defineField({name: "rangeKm", title: "Range km", type: "number"}),
                defineField({name: "batteryKwh", title: "Battery kWh", type: "number"}),
                defineField({name: "batteryType", title: "Battery type", type: "string", options: {list: ["NMC", "LFP", "NCA", "LFMP"]}}),
                defineField({name: "motorHp", title: "Motor hp", type: "number"}),
                defineField({name: "torqueNm", title: "Torque Nm", type: "number"}),
                defineField({name: "zeroToHundredSec", title: "0-100 sec", type: "number"}),
                defineField({name: "topSpeedKmh", title: "Top speed km/h", type: "number"}),
                defineField({name: "drivetrain", title: "Drivetrain", type: "string", options: {list: ["FWD", "RWD", "AWD"]}}),
                defineField({name: "seating", title: "Seats", type: "number"}),
                defineField({name: "cargoL", title: "Cargo L", type: "number"}),
                defineField({name: "weightKg", title: "Weight kg", type: "number"}),
                defineField({
                  name: "dimensions",
                  title: "Dimensions",
                  type: "object",
                  fields: [
                    defineField({name: "lengthMm", title: "Length mm", type: "number"}),
                    defineField({name: "widthMm", title: "Width mm", type: "number"}),
                    defineField({name: "heightMm", title: "Height mm", type: "number"})
                  ]
                }),
                defineField({name: "ipRating", title: "IP rating", type: "string"}),
                defineField({name: "frontSuspension", title: "Front suspension", type: "string"}),
                defineField({name: "rearSuspension", title: "Rear suspension", type: "string"})
              ]
            }),
            defineField({
              name: "charging",
              title: "Charging",
              type: "object",
              fields: [
                defineField({name: "acMaxKw", title: "AC max kW", type: "number"}),
                defineField({name: "dcMaxKw", title: "DC max kW", type: "number"}),
                defineField({name: "dcTenToEightyMin", title: "DC 10-80 min", type: "number"}),
                defineField({name: "connectorTypes", title: "Connector types", type: "array", of: [{type: "string"}]}),
                defineField({name: "v2lSupport", title: "V2L support", type: "boolean"}),
                defineField({name: "homeChargerRequired", title: "Home charger required", type: "boolean"})
              ]
            }),
            defineField({name: "pricingPeriods", title: "Pricing periods", type: "array", of: [{type: "pricingPeriod"}]}),
            defineField({
              name: "faqItems",
              title: "FAQ items",
              type: "array",
              of: [{
                type: "object",
                fields: [
                  defineField({name: "question", title: "Question", type: "localizedString"}),
                  defineField({name: "answer", title: "Answer", type: "localizedString"})
                ],
                preview: {select: {title: "question.en"}}
              }]
            })
          ],
          preview: {
            select: {
              title: "name.en",
              subtitle: "id"
            }
          }
        }
      ]
    }),
    defineField({name: "sourceUrls", title: "Source URLs", type: "array", of: [{type: "url"}]}),
    defineField({name: "officialPriceUrl", title: "Official price URL", type: "url"}),
    defineField({
      name: "sourceConfidence",
      title: "Source confidence",
      type: "string",
      options: {list: ["official", "dealer", "community", "needs-verification"]},
      initialValue: "needs-verification"
    }),
    defineField({name: "lastVerifiedAt", title: "Last verified at", type: "date"}),
    defineField({name: "lastUpdatedBy", title: "Last updated by", type: "string"}),
    defineField({
      name: "warranty",
      title: "Warranty",
      type: "object",
      fields: [
        defineField({name: "vehicleYears", title: "Vehicle years", type: "number"}),
        defineField({name: "vehicleKm", title: "Vehicle km", type: "number"}),
        defineField({name: "batteryYears", title: "Battery years", type: "number"}),
        defineField({name: "batteryKm", title: "Battery km", type: "number"})
      ]
    })
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "brand.name.en",
      media: "images.0"
    }
  }
});
