import type {Brand, CarModel, FAQCategory, FAQItem} from "@/lib/types/ev";

export const brands: Brand[] = [
  {
    id: "byd",
    name: {th: "BYD", en: "BYD"},
    slug: "byd",
    logoText: "BYD",
    country: {th: "จีน", en: "China"},
    description: {
      th: "หนึ่งในแบรนด์ EV ที่มีรุ่นขายในไทยหลายเซกเมนต์ ตั้งแต่รถเมืองไปจนถึง SUV ครอบครัว",
      en: "A broad EV brand in Thailand, covering city cars, sedans, and family SUVs."
    },
    websiteUrl: "https://www.reverautomotive.com",
    featured: true
  },
  {
    id: "tesla",
    name: {th: "Tesla", en: "Tesla"},
    slug: "tesla",
    logoText: "TESLA",
    country: {th: "สหรัฐอเมริกา", en: "United States"},
    description: {
      th: "แบรนด์ EV ที่เด่นเรื่องซอฟต์แวร์ สมรรถนะ และระบบชาร์จเร็ว",
      en: "An EV brand known for software, performance, and fast charging."
    },
    websiteUrl: "https://www.tesla.com/th_th",
    featured: true
  },
  {
    id: "mg",
    name: {th: "MG", en: "MG"},
    slug: "mg",
    logoText: "MG",
    country: {th: "จีน/อังกฤษ", en: "China/United Kingdom"},
    description: {
      th: "แบรนด์ที่ทำตลาด EV ในไทยมานาน มีทั้ง hatchback, wagon และ SUV",
      en: "An early EV mover in Thailand with hatchback, wagon, and SUV options."
    },
    websiteUrl: "https://www.mgcars.com",
    featured: true
  },
  {
    id: "ora",
    name: {th: "ORA", en: "ORA"},
    slug: "ora",
    logoText: "ORA",
    country: {th: "จีน", en: "China"},
    description: {
      th: "แบรนด์ EV ที่เน้นดีไซน์เป็นมิตร ขับง่าย เหมาะกับการใช้งานในเมือง",
      en: "A friendly, city-focused EV brand with distinctive design."
    },
    websiteUrl: "https://www.gwm.co.th",
    featured: false
  },
  {
    id: "neta",
    name: {th: "NETA", en: "NETA"},
    slug: "neta",
    logoText: "NETA",
    country: {th: "จีน", en: "China"},
    description: {
      th: "แบรนด์ EV ที่เน้นราคาจับต้องง่ายสำหรับผู้เริ่มต้นใช้รถไฟฟ้า",
      en: "A value-focused EV brand for first-time electric car buyers."
    },
    websiteUrl: "https://www.neta.co.th",
    featured: false
  }
];

export const models: CarModel[] = [
  // ─── BYD Dolphin ────────────────────────────────────────────────────────────
  {
    id: "byd-dolphin",
    name: {th: "BYD Dolphin", en: "BYD Dolphin"},
    slug: "byd-dolphin",
    brandId: "byd",
    year: 2025,
    images: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1400&q=80"
    ],
    shortDescription: {
      th: "รถ hatchback ไฟฟ้าสำหรับใช้งานในเมือง ราคาจับต้องง่ายและขนาดคล่องตัว",
      en: "A city-friendly electric hatchback with approachable pricing and compact dimensions."
    },
    status: "on-sale",
    isNewArrival: true,
    bodyType: "hatchback",
    wheelsExterior: {
      wheelSizeInch: 16,
      tireSize: "195/60 R16",
      availableColors: [
        {name: {th: "ขาว", en: "White"}, hex: "#f8fafc"},
        {name: {th: "เทา", en: "Grey"}, hex: "#64748b"},
        {name: {th: "ชมพู", en: "Pink"}, hex: "#f9a8d4"}
      ],
      sunroofType: {th: "ไม่มี", en: "None"}
    },
    variants: [
      {
        id: "byd-dolphin-standard",
        name: {th: "Standard Range", en: "Standard Range"},
        specs: {
          rangeKm: 410,
          batteryKwh: 44.9,
          batteryType: "LFP",
          motorKw: 70,
          torqueNm: 180,
          zeroToHundredSec: 12.3,
          topSpeedKmh: 150,
          drivetrain: "FWD",
          seating: 5,
          cargoL: 345,
          weightKg: 1405,
          dimensions: {lengthMm: 4290, widthMm: 1770, heightMm: 1570},
          ipRating: "IP67",
          frontSuspension: "MacPherson strut",
          rearSuspension: "Torsion beam"
        },
        charging: {
          acMaxKw: 7,
          dcMaxKw: 60,
          dcTenToEightyMin: 40,
          connectorTypes: ["Type 2", "CCS2"],
          v2lSupport: true,
          homeChargerRequired: false
        },
        pricingPeriods: [
          {
            label: {th: "ราคาเปิดตัว", en: "Launch"},
            startDate: "2024-01-01",
            endDate: "2024-12-31",
            priceThb: 699999,
            discountThb: 0,
            notes: {th: "ราคาเริ่มทำตลาด", en: "Initial market price"}
          },
          {
            label: {th: "โปรโมชันปัจจุบัน", en: "Current promotion"},
            startDate: "2025-01-01",
            endDate: null,
            priceThb: 599999,
            discountThb: 100000,
            notes: {th: "ตัวอย่างข้อมูลสำหรับ Phase 1", en: "Sample Phase 1 data"}
          }
        ],
        faqItems: [
          {
            question: {
              th: "BYD Dolphin เหมาะกับครอบครัวไหม",
              en: "Is the BYD Dolphin suitable for families?"
            },
            answer: {
              th: "เหมาะกับครอบครัวขนาดเล็กหรือใช้งานเมืองเป็นหลัก ถ้าต้องเดินทางไกลบ่อยหรือมีสัมภาระมากควรเทียบกับ SUV ด้วย",
              en: "It suits small families and city use. If you often travel long distances or carry lots of luggage, compare it with SUVs too."
            }
          }
        ]
      },
      {
        id: "byd-dolphin-extended",
        name: {th: "Extended Range", en: "Extended Range"},
        specs: {
          rangeKm: 490,
          batteryKwh: 60.5,
          batteryType: "LFP",
          motorKw: 150,
          torqueNm: 310,
          zeroToHundredSec: 7.0,
          topSpeedKmh: 160,
          drivetrain: "FWD",
          seating: 5,
          cargoL: 345,
          weightKg: 1658,
          dimensions: {lengthMm: 4290, widthMm: 1770, heightMm: 1570},
          ipRating: "IP67",
          frontSuspension: "MacPherson strut",
          rearSuspension: "Torsion beam"
        },
        charging: {
          acMaxKw: 7,
          dcMaxKw: 80,
          dcTenToEightyMin: 38,
          connectorTypes: ["Type 2", "CCS2"],
          v2lSupport: true,
          homeChargerRequired: false
        },
        pricingPeriods: [
          {
            label: {th: "โปรโมชันปัจจุบัน", en: "Current promotion"},
            startDate: "2025-01-01",
            endDate: null,
            priceThb: 699999,
            discountThb: 90000,
            notes: {th: "ตัวอย่างข้อมูลรุ่นย่อย", en: "Sample variant data"}
          }
        ]
      }
    ],
    sourceUrls: ["https://www.reverautomotive.com/"],
    officialPriceUrl: "https://www.reverautomotive.com/",
    sourceConfidence: "official",
    lastVerifiedAt: "2026-05-23",
    lastUpdatedBy: "ThaiEVCars seed data",
    warranty: {vehicleYears: 8, vehicleKm: 160000, batteryYears: 8, batteryKm: 160000}
  },

  // ─── BYD Atto 3 ─────────────────────────────────────────────────────────────
  {
    id: "byd-atto-3",
    name: {th: "BYD Atto 3", en: "BYD Atto 3"},
    slug: "byd-atto-3",
    brandId: "byd",
    year: 2025,
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1400&q=80"
    ],
    shortDescription: {
      th: "SUV ไฟฟ้าขนาดครอบครัว ระยะทางใช้งานดีและอุปกรณ์ครบ",
      en: "A family-sized electric SUV with strong range and practical equipment."
    },
    status: "on-sale",
    isNewArrival: false,
    bodyType: "suv",
    wheelsExterior: {
      wheelSizeInch: 18,
      tireSize: "235/50 R18",
      availableColors: [
        {name: {th: "ขาว", en: "White"}, hex: "#f8fafc"},
        {name: {th: "ฟ้า", en: "Blue"}, hex: "#60a5fa"},
        {name: {th: "เทา", en: "Grey"}, hex: "#475569"}
      ],
      sunroofType: {th: "พาโนรามา", en: "Panoramic"}
    },
    variants: [
      {
        id: "byd-atto-3-standard",
        name: {th: "Standard Range", en: "Standard Range"},
        specs: {
          rangeKm: 410,
          batteryKwh: 50.3,
          batteryType: "LFP",
          motorKw: 150,
          torqueNm: 310,
          zeroToHundredSec: 7.9,
          topSpeedKmh: 160,
          drivetrain: "FWD",
          seating: 5,
          cargoL: 440,
          weightKg: 1680,
          dimensions: {lengthMm: 4455, widthMm: 1875, heightMm: 1615},
          ipRating: "IP67",
          frontSuspension: "MacPherson strut",
          rearSuspension: "Multi-link"
        },
        charging: {
          acMaxKw: 7,
          dcMaxKw: 70,
          dcTenToEightyMin: 44,
          connectorTypes: ["Type 2", "CCS2"],
          v2lSupport: true,
          homeChargerRequired: false
        },
        pricingPeriods: [
          {
            label: {th: "ราคาเปิดตัว", en: "Launch"},
            startDate: "2024-01-01",
            endDate: "2024-09-30",
            priceThb: 1199900,
            discountThb: 0,
            notes: {th: "ราคาเริ่มต้นตัวอย่าง", en: "Sample starting price"}
          },
          {
            label: {th: "ราคาปัจจุบัน", en: "Current price"},
            startDate: "2025-01-01",
            endDate: null,
            priceThb: 899900,
            discountThb: 180000,
            notes: {th: "ข้อมูลตัวอย่างรุ่นย่อย", en: "Sample variant data"}
          }
        ]
      },
      {
        id: "byd-atto-3-extended",
        name: {th: "Extended Range", en: "Extended Range"},
        specs: {
          rangeKm: 480,
          batteryKwh: 60.5,
          batteryType: "LFP",
          motorKw: 150,
          torqueNm: 310,
          zeroToHundredSec: 7.3,
          topSpeedKmh: 160,
          drivetrain: "FWD",
          seating: 5,
          cargoL: 440,
          weightKg: 1750,
          dimensions: {lengthMm: 4455, widthMm: 1875, heightMm: 1615},
          ipRating: "IP67",
          frontSuspension: "MacPherson strut",
          rearSuspension: "Multi-link"
        },
        charging: {
          acMaxKw: 7,
          dcMaxKw: 80,
          dcTenToEightyMin: 44,
          connectorTypes: ["Type 2", "CCS2"],
          v2lSupport: true,
          homeChargerRequired: false
        },
        pricingPeriods: [
          {
            label: {th: "ปรับราคา", en: "Price adjustment"},
            startDate: "2024-10-01",
            endDate: null,
            priceThb: 999900,
            discountThb: 200000,
            notes: {th: "ข้อมูลตัวอย่างสำหรับแสดงประวัติราคา", en: "Sample pricing history"}
          }
        ]
      }
    ],
    sourceUrls: ["https://www.reverautomotive.com/"],
    officialPriceUrl: "https://www.reverautomotive.com/",
    sourceConfidence: "official",
    lastVerifiedAt: "2026-05-23",
    lastUpdatedBy: "ThaiEVCars seed data",
    warranty: {vehicleYears: 8, vehicleKm: 160000, batteryYears: 8, batteryKm: 160000}
  },

  // ─── Tesla Model 3 ───────────────────────────────────────────────────────────
  {
    id: "tesla-model-3",
    name: {th: "Tesla Model 3", en: "Tesla Model 3"},
    slug: "tesla-model-3",
    brandId: "tesla",
    year: 2025,
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80"
    ],
    shortDescription: {
      th: "เซดานไฟฟ้าที่เด่นด้านสมรรถนะ ซอฟต์แวร์ระดับสูง และค่าใช้จ่ายรายวันต่ำ",
      en: "An electric sedan praised for performance, advanced software, and low running costs."
    },
    status: "on-sale",
    isNewArrival: true,
    bodyType: "sedan",
    wheelsExterior: {
      wheelSizeInch: 18,
      tireSize: "235/45 R18",
      availableColors: [
        {name: {th: "ขาว", en: "White"}, hex: "#f8fafc"},
        {name: {th: "ดำ", en: "Black"}, hex: "#020617"},
        {name: {th: "แดง", en: "Red"}, hex: "#dc2626"},
        {name: {th: "เงิน", en: "Silver"}, hex: "#cbd5e1"}
      ],
      sunroofType: {th: "หลังคากระจก", en: "Glass roof"}
    },
    variants: [
      {
        id: "tesla-model-3-rwd",
        name: {th: "RWD", en: "RWD"},
        specs: {
          rangeKm: 491,
          batteryKwh: 60,
          batteryType: "LFP",
          motorKw: 208,
          torqueNm: 340,
          zeroToHundredSec: 6.1,
          topSpeedKmh: 201,
          drivetrain: "RWD",
          seating: 5,
          cargoL: 594,
          weightKg: 1761,
          dimensions: {lengthMm: 4694, widthMm: 1849, heightMm: 1443},
          ipRating: "N/A",
          frontSuspension: "Double wishbone",
          rearSuspension: "Multi-link"
        },
        charging: {
          acMaxKw: 11,
          dcMaxKw: 170,
          dcTenToEightyMin: 25,
          connectorTypes: ["Type 2", "CCS2"],
          v2lSupport: false,
          homeChargerRequired: false
        },
        pricingPeriods: [
          {
            label: {th: "ราคาเปิดตัว", en: "Launch"},
            startDate: "2024-01-01",
            endDate: "2024-12-31",
            priceThb: 1799000,
            discountThb: 0,
            notes: {th: "ข้อมูลตัวอย่าง", en: "Sample data"}
          },
          {
            label: {th: "ราคาปัจจุบัน", en: "Current price"},
            startDate: "2025-01-01",
            endDate: null,
            priceThb: 1649000,
            discountThb: 150000,
            notes: {th: "ราคาตัวอย่างสำหรับระบบ", en: "Sample current price"}
          }
        ],
        faqItems: [
          {
            question: {
              th: "Tesla Model 3 RWD เหมาะสำหรับเดินทางไกลไหม",
              en: "Is the Tesla Model 3 RWD good for long trips?"
            },
            answer: {
              th: "ระยะทาง 491 กม. เหมาะกับการเดินทางระหว่างเมือง เครือข่าย Supercharger ทำให้การชาร์จระหว่างทางสะดวก",
              en: "With 491 km range and the Supercharger network, intercity trips are very practical."
            }
          }
        ]
      },
      {
        id: "tesla-model-3-lr",
        name: {th: "Long Range AWD", en: "Long Range AWD"},
        specs: {
          rangeKm: 629,
          batteryKwh: 75,
          batteryType: "NMC",
          motorKw: 324,
          torqueNm: 510,
          zeroToHundredSec: 4.4,
          topSpeedKmh: 225,
          drivetrain: "AWD",
          seating: 5,
          cargoL: 594,
          weightKg: 1843,
          dimensions: {lengthMm: 4694, widthMm: 1849, heightMm: 1443},
          ipRating: "N/A",
          frontSuspension: "Double wishbone",
          rearSuspension: "Multi-link"
        },
        charging: {
          acMaxKw: 11,
          dcMaxKw: 250,
          dcTenToEightyMin: 22,
          connectorTypes: ["Type 2", "CCS2"],
          v2lSupport: false,
          homeChargerRequired: false
        },
        pricingPeriods: [
          {
            label: {th: "ราคาปัจจุบัน", en: "Current price"},
            startDate: "2025-01-01",
            endDate: null,
            priceThb: 2099000,
            discountThb: 0,
            notes: {th: "ข้อมูลตัวอย่าง", en: "Sample data"}
          }
        ]
      }
    ],
    sourceUrls: ["https://www.tesla.com/th_th/model3"],
    officialPriceUrl: "https://www.tesla.com/th_th/model3",
    sourceConfidence: "official",
    lastVerifiedAt: "2026-05-23",
    lastUpdatedBy: "ThaiEVCars seed data",
    warranty: {vehicleYears: 4, vehicleKm: 80000, batteryYears: 8, batteryKm: 160000}
  },

  // ─── Tesla Model Y ───────────────────────────────────────────────────────────
  {
    id: "tesla-model-y",
    name: {th: "Tesla Model Y", en: "Tesla Model Y"},
    slug: "tesla-model-y",
    brandId: "tesla",
    year: 2025,
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80"
    ],
    shortDescription: {
      th: "SUV ไฟฟ้ายอดนิยมที่เด่นเรื่องซอฟต์แวร์ พื้นที่ใช้สอย และเครือข่ายชาร์จ",
      en: "A popular electric SUV known for software, cargo space, and charging network access."
    },
    status: "on-sale",
    isNewArrival: true,
    bodyType: "suv",
    wheelsExterior: {
      wheelSizeInch: 19,
      tireSize: "255/45 R19",
      availableColors: [
        {name: {th: "ขาว", en: "White"}, hex: "#f8fafc"},
        {name: {th: "ดำ", en: "Black"}, hex: "#020617"},
        {name: {th: "แดง", en: "Red"}, hex: "#dc2626"}
      ],
      sunroofType: {th: "หลังคากระจก", en: "Glass roof"}
    },
    variants: [
      {
        id: "tesla-model-y-rwd",
        name: {th: "RWD", en: "RWD"},
        specs: {
          rangeKm: 455,
          batteryKwh: 60,
          batteryType: "LFP",
          motorKw: 220,
          torqueNm: 420,
          zeroToHundredSec: 6.9,
          topSpeedKmh: 217,
          drivetrain: "RWD",
          seating: 5,
          cargoL: 854,
          weightKg: 1909,
          dimensions: {lengthMm: 4751, widthMm: 1921, heightMm: 1624},
          ipRating: "N/A",
          frontSuspension: "Double wishbone",
          rearSuspension: "Multi-link"
        },
        charging: {
          acMaxKw: 11,
          dcMaxKw: 170,
          dcTenToEightyMin: 27,
          connectorTypes: ["Type 2", "CCS2"],
          v2lSupport: false,
          homeChargerRequired: false
        },
        pricingPeriods: [
          {
            label: {th: "ราคาเปิดตัวไทย", en: "Thailand launch"},
            startDate: "2024-01-01",
            endDate: "2024-12-31",
            priceThb: 1959000,
            discountThb: 0,
            notes: {th: "ข้อมูลตัวอย่าง", en: "Sample data"}
          },
          {
            label: {th: "ราคาปัจจุบัน", en: "Current price"},
            startDate: "2025-01-01",
            endDate: null,
            priceThb: 1769000,
            discountThb: 190000,
            notes: {th: "ราคาตัวอย่างสำหรับระบบ", en: "Sample current price"}
          }
        ],
        faqItems: [
          {
            question: {
              th: "Tesla Model Y มีที่นั่งแถว 3 ไหม",
              en: "Does the Tesla Model Y have a 3rd row?"
            },
            answer: {
              th: "รุ่นที่ขายในไทยปัจจุบันมี 5 ที่นั่ง ถ้าต้องการ 7 ที่นั่งให้ตรวจสอบกับ Tesla โดยตรงว่ามีรุ่น 7 ที่นั่งให้สั่งหรือไม่",
              en: "Current Thai-market variants seat 5. Check directly with Tesla if a 7-seat option is available."
            }
          }
        ]
      },
      {
        id: "tesla-model-y-lr",
        name: {th: "Long Range AWD", en: "Long Range AWD"},
        specs: {
          rangeKm: 533,
          batteryKwh: 75,
          batteryType: "NMC",
          motorKw: 324,
          torqueNm: 510,
          zeroToHundredSec: 5.0,
          topSpeedKmh: 217,
          drivetrain: "AWD",
          seating: 5,
          cargoL: 854,
          weightKg: 2003,
          dimensions: {lengthMm: 4751, widthMm: 1921, heightMm: 1624},
          ipRating: "N/A",
          frontSuspension: "Double wishbone",
          rearSuspension: "Multi-link"
        },
        charging: {
          acMaxKw: 11,
          dcMaxKw: 250,
          dcTenToEightyMin: 20,
          connectorTypes: ["Type 2", "CCS2"],
          v2lSupport: false,
          homeChargerRequired: false
        },
        pricingPeriods: [
          {
            label: {th: "ราคาปัจจุบัน", en: "Current price"},
            startDate: "2025-01-01",
            endDate: null,
            priceThb: 2099000,
            discountThb: 0,
            notes: {th: "ข้อมูลตัวอย่าง", en: "Sample data"}
          }
        ]
      }
    ],
    sourceUrls: ["https://www.tesla.com/th_th/modely"],
    officialPriceUrl: "https://www.tesla.com/th_th/modely",
    sourceConfidence: "official",
    lastVerifiedAt: "2026-05-23",
    lastUpdatedBy: "ThaiEVCars seed data",
    warranty: {vehicleYears: 4, vehicleKm: 80000, batteryYears: 8, batteryKm: 160000}
  },

  // ─── MG4 ────────────────────────────────────────────────────────────────────
  {
    id: "mg4",
    name: {th: "MG4", en: "MG4"},
    slug: "mg4",
    brandId: "mg",
    year: 2025,
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1400&q=80"
    ],
    shortDescription: {
      th: "hatchback ไฟฟ้าขับหลังที่เน้นความสนุกในการขับและราคาคุ้มค่า",
      en: "A rear-wheel-drive electric hatchback focused on driving fun and value."
    },
    status: "on-sale",
    isNewArrival: false,
    bodyType: "hatchback",
    wheelsExterior: {
      wheelSizeInch: 17,
      tireSize: "215/50 R17",
      availableColors: [
        {name: {th: "ส้ม", en: "Orange"}, hex: "#f97316"},
        {name: {th: "เงิน", en: "Silver"}, hex: "#cbd5e1"},
        {name: {th: "ดำ", en: "Black"}, hex: "#020617"}
      ],
      sunroofType: {th: "ไม่มี", en: "None"}
    },
    variants: [
      {
        id: "mg4-d",
        name: {th: "MG4 D", en: "MG4 D"},
        specs: {
          rangeKm: 350,
          batteryKwh: 51,
          batteryType: "LFP",
          motorKw: 125,
          torqueNm: 250,
          zeroToHundredSec: 8.5,
          topSpeedKmh: 160,
          drivetrain: "RWD",
          seating: 5,
          cargoL: 363,
          weightKg: 1620,
          dimensions: {lengthMm: 4287, widthMm: 1836, heightMm: 1504},
          ipRating: "IP67",
          frontSuspension: "MacPherson strut",
          rearSuspension: "Multi-link"
        },
        charging: {
          acMaxKw: 6.6,
          dcMaxKw: 64,
          dcTenToEightyMin: 42,
          connectorTypes: ["Type 2", "CCS2"],
          v2lSupport: false,
          homeChargerRequired: false
        },
        pricingPeriods: [
          {
            label: {th: "ราคาปัจจุบัน", en: "Current price"},
            startDate: "2025-01-01",
            endDate: null,
            priceThb: 649900,
            discountThb: 0,
            notes: {th: "ข้อมูลตัวอย่าง", en: "Sample data"}
          }
        ]
      },
      {
        id: "mg4-x",
        name: {th: "MG4 X", en: "MG4 X"},
        specs: {
          rangeKm: 425,
          batteryKwh: 64,
          batteryType: "LFP",
          motorKw: 150,
          torqueNm: 250,
          zeroToHundredSec: 7.7,
          topSpeedKmh: 160,
          drivetrain: "RWD",
          seating: 5,
          cargoL: 363,
          weightKg: 1655,
          dimensions: {lengthMm: 4287, widthMm: 1836, heightMm: 1504},
          ipRating: "IP67",
          frontSuspension: "MacPherson strut",
          rearSuspension: "Multi-link"
        },
        charging: {
          acMaxKw: 6.6,
          dcMaxKw: 88,
          dcTenToEightyMin: 37,
          connectorTypes: ["Type 2", "CCS2"],
          v2lSupport: true,
          homeChargerRequired: false
        },
        pricingPeriods: [
          {
            label: {th: "ราคาเปิดตัว", en: "Launch"},
            startDate: "2024-01-01",
            endDate: "2024-10-31",
            priceThb: 869000,
            discountThb: 0,
            notes: {th: "ข้อมูลตัวอย่าง", en: "Sample data"}
          },
          {
            label: {th: "โปรโมชัน", en: "Promotion"},
            startDate: "2024-11-01",
            endDate: null,
            priceThb: 709900,
            discountThb: 159100,
            notes: {th: "ตัวอย่างส่วนลด", en: "Sample discount"}
          }
        ]
      }
    ],
    sourceUrls: ["https://www.mgcars.com/th"],
    officialPriceUrl: "https://www.mgcars.com/th",
    sourceConfidence: "official",
    lastVerifiedAt: "2026-05-23",
    lastUpdatedBy: "ThaiEVCars seed data",
    warranty: {vehicleYears: 4, vehicleKm: 120000, batteryYears: 8, batteryKm: 180000}
  },

  // ─── ORA Good Cat ────────────────────────────────────────────────────────────
  {
    id: "ora-good-cat",
    name: {th: "ORA Good Cat", en: "ORA Good Cat"},
    slug: "ora-good-cat",
    brandId: "ora",
    year: 2024,
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1400&q=80"
    ],
    shortDescription: {
      th: "EV เมืองดีไซน์เป็นเอกลักษณ์ ระยะทางเหมาะกับใช้งานประจำวันและเดินทางใกล้",
      en: "A distinctive city EV with range suited for daily use and short trips."
    },
    status: "on-sale",
    isNewArrival: false,
    bodyType: "hatchback",
    wheelsExterior: {
      wheelSizeInch: 18,
      tireSize: "215/50 R18",
      availableColors: [
        {name: {th: "เขียว", en: "Green"}, hex: "#86efac"},
        {name: {th: "ฟ้า", en: "Blue"}, hex: "#93c5fd"},
        {name: {th: "ขาว", en: "White"}, hex: "#f8fafc"}
      ],
      sunroofType: {th: "พาโนรามา", en: "Panoramic"}
    },
    variants: [
      {
        id: "ora-good-cat-500",
        name: {th: "500 Ultra", en: "500 Ultra"},
        specs: {
          rangeKm: 500,
          batteryKwh: 63.1,
          batteryType: "NMC",
          motorKw: 126,
          torqueNm: 250,
          zeroToHundredSec: 8.5,
          topSpeedKmh: 152,
          drivetrain: "FWD",
          seating: 5,
          cargoL: 228,
          weightKg: 1555,
          dimensions: {lengthMm: 4235, widthMm: 1825, heightMm: 1596},
          ipRating: "IP67",
          frontSuspension: "MacPherson strut",
          rearSuspension: "Torsion beam"
        },
        charging: {
          acMaxKw: 6.6,
          dcMaxKw: 60,
          dcTenToEightyMin: 45,
          connectorTypes: ["Type 2", "CCS2"],
          v2lSupport: false,
          homeChargerRequired: false
        },
        pricingPeriods: [
          {
            label: {th: "ราคาเปิดตัว", en: "Launch"},
            startDate: "2024-01-01",
            endDate: null,
            priceThb: 899000,
            discountThb: 50000,
            notes: {th: "ข้อมูลตัวอย่าง", en: "Sample data"}
          }
        ]
      }
    ],
    sourceUrls: ["https://www.gwm.co.th/en"],
    officialPriceUrl: "https://www.gwm.co.th/en",
    sourceConfidence: "official",
    lastVerifiedAt: "2026-05-23",
    lastUpdatedBy: "ThaiEVCars seed data",
    warranty: {vehicleYears: 5, vehicleKm: 150000, batteryYears: 8, batteryKm: 180000}
  },

  // ─── NETA V-II ───────────────────────────────────────────────────────────────
  {
    id: "neta-v-ii",
    name: {th: "NETA V-II", en: "NETA V-II"},
    slug: "neta-v-ii",
    brandId: "neta",
    year: 2024,
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80"
    ],
    shortDescription: {
      th: "EV ราคาประหยัดสำหรับใช้งานเมืองและผู้เริ่มต้นเปลี่ยนมาใช้รถไฟฟ้า",
      en: "A budget EV for city use and first-time electric car buyers."
    },
    status: "on-sale",
    isNewArrival: false,
    bodyType: "hatchback",
    wheelsExterior: {
      wheelSizeInch: 16,
      tireSize: "185/55 R16",
      availableColors: [
        {name: {th: "ขาว", en: "White"}, hex: "#f8fafc"},
        {name: {th: "ดำ", en: "Black"}, hex: "#020617"},
        {name: {th: "น้ำเงิน", en: "Navy"}, hex: "#1e3a8a"}
      ],
      sunroofType: {th: "ไม่มี", en: "None"}
    },
    variants: [
      {
        id: "neta-v-ii",
        name: {th: "NETA V-II", en: "NETA V-II"},
        specs: {
          rangeKm: 382,
          batteryKwh: 36.1,
          batteryType: "NMC",
          motorKw: 70,
          torqueNm: 150,
          zeroToHundredSec: 12.0,
          topSpeedKmh: 125,
          drivetrain: "FWD",
          seating: 5,
          cargoL: 335,
          weightKg: 1170,
          dimensions: {lengthMm: 4070, widthMm: 1690, heightMm: 1540},
          ipRating: "IP67",
          frontSuspension: "MacPherson strut",
          rearSuspension: "Torsion beam"
        },
        charging: {
          acMaxKw: 6.6,
          dcMaxKw: 50,
          dcTenToEightyMin: 35,
          connectorTypes: ["Type 2", "CCS2"],
          v2lSupport: false,
          homeChargerRequired: false
        },
        pricingPeriods: [
          {
            label: {th: "ราคาเปิดตัว", en: "Launch"},
            startDate: "2024-01-01",
            endDate: "2024-12-31",
            priceThb: 549000,
            discountThb: 0,
            notes: {th: "ข้อมูลตัวอย่าง", en: "Sample data"}
          },
          {
            label: {th: "โปรโมชัน", en: "Promotion"},
            startDate: "2025-01-01",
            endDate: null,
            priceThb: 499000,
            discountThb: 50000,
            notes: {th: "ข้อมูลตัวอย่าง", en: "Sample data"}
          }
        ]
      }
    ],
    sourceUrls: ["https://www.neta.co.th/th"],
    officialPriceUrl: "https://www.neta.co.th/th",
    sourceConfidence: "official",
    lastVerifiedAt: "2026-05-23",
    lastUpdatedBy: "ThaiEVCars seed data",
    warranty: {vehicleYears: 5, vehicleKm: 150000, batteryYears: 8, batteryKm: 180000}
  }
];

const sampleSpinImages = [
  "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80"
];

models.forEach((model) => {
  model.spinImages = model.id === "byd-dolphin" ? sampleSpinImages : [];
});

export const faqCategories: FAQCategory[] = [
  {id: "buying", name: {th: "การซื้อรถ", en: "Buying"}, slug: "buying", order: 1},
  {id: "charging", name: {th: "การชาร์จ", en: "Charging"}, slug: "charging", order: 2},
  {id: "ownership", name: {th: "การใช้งานจริง", en: "Ownership"}, slug: "ownership", order: 3}
];

export const faqItems: FAQItem[] = [
  {
    id: "home-charger-needed",
    categoryId: "charging",
    question: {th: "จำเป็นต้องติด Home Charger ไหม", en: "Do I need a home charger?"},
    answer: {
      th: "ไม่จำเป็นเสมอไป แต่ถ้าชาร์จที่บ้านได้จะสะดวกกว่าและควบคุมค่าใช้จ่ายง่ายกว่า โดยเฉพาะคนที่ใช้รถทุกวัน",
      en: "Not always, but charging at home is more convenient and makes running costs easier to control for daily drivers."
    }
  },
  {
    id: "ev-range-real-world",
    categoryId: "ownership",
    question: {th: "ระยะทางจริงต่างจากตัวเลขโฆษณาแค่ไหน", en: "How different is real-world range?"},
    answer: {
      th: "ระยะทางจริงขึ้นกับความเร็ว อุณหภูมิ การเปิดแอร์ และน้ำหนักบรรทุก ควรเผื่อจากตัวเลขประกาศประมาณ 15-25%",
      en: "Real range depends on speed, temperature, AC use, and load. A 15-25% buffer from the rated figure is a practical rule."
    }
  },
  {
    id: "price-history",
    categoryId: "buying",
    question: {th: "ทำไมต้องดูประวัติราคา", en: "Why check pricing history?"},
    answer: {
      th: "รถ EV ในไทยมีโปรโมชันและการปรับราคาบ่อย การดูช่วงราคาช่วยให้ประเมินส่วนลดและจังหวะซื้อได้ดีขึ้น",
      en: "Thai EV prices and promotions change often. Pricing history helps you judge discounts and buying timing."
    }
  },
  {
    id: "lfp-vs-nmc",
    categoryId: "buying",
    question: {th: "แบตเตอรี่ LFP กับ NMC ต่างกันอย่างไร", en: "What is the difference between LFP and NMC batteries?"},
    answer: {
      th: "LFP ทนทาน ชาร์จได้ถึง 100% ทุกวันโดยไม่เสียหาย แต่ระยะทางต่อกิโลวัตต์ชั่วโมงต่ำกว่า NMC NMC ให้ระยะทางดีกว่าในน้ำหนักเท่ากัน แต่ควรชาร์จที่ 80-90% เพื่อยืดอายุ",
      en: "LFP is more durable and can be charged to 100% daily without harm, but has lower energy density. NMC offers better range per kg but is best kept at 80-90% charge for longevity."
    }
  }
];
