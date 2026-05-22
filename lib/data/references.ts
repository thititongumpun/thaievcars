import type {LocalizedString} from "@/lib/types/ev";

export type ReferenceSource = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  url: string;
  category: "official" | "tools";
  checkedAt: string;
};

export const referenceSources: ReferenceSource[] = [
  {
    id: "rever-byd",
    title: {th: "Rêver Automotive / BYD Thailand", en: "Rêver Automotive / BYD Thailand"},
    description: {
      th: "เว็บผู้แทนจำหน่าย BYD ในไทย ใช้ตรวจสอบรุ่นรถ ราคา โปรโมชัน และศูนย์บริการ",
      en: "BYD Thailand distributor site for models, pricing, promotions, and service information."
    },
    url: "https://www.reverautomotive.com/",
    category: "official",
    checkedAt: "2026-05-23"
  },
  {
    id: "tesla-thailand",
    title: {th: "Tesla ประเทศไทย", en: "Tesla Thailand"},
    description: {
      th: "เว็บทางการ Tesla ประเทศไทย สำหรับรุ่นรถ ราคา การสั่งซื้อ และข้อมูลการชาร์จ",
      en: "Official Tesla Thailand site for models, pricing, ordering, and charging information."
    },
    url: "https://www.tesla.com/th_th",
    category: "official",
    checkedAt: "2026-05-23"
  },
  {
    id: "mg-thailand",
    title: {th: "MG Cars Thailand", en: "MG Cars Thailand"},
    description: {
      th: "เว็บทางการ MG Sales Thailand สำหรับรุ่นรถ ราคา โปรโมชัน ผู้จำหน่าย และสถานีชาร์จ",
      en: "Official MG Sales Thailand site for models, prices, promotions, dealers, and charging."
    },
    url: "https://www.mgcars.com/th",
    category: "official",
    checkedAt: "2026-05-23"
  },
  {
    id: "gwm-thailand",
    title: {th: "GWM Thailand / ORA", en: "GWM Thailand / ORA"},
    description: {
      th: "เว็บทางการ GWM Thailand สำหรับ ORA และรถในเครือ GWM ที่ทำตลาดในไทย",
      en: "Official GWM Thailand site for ORA and other GWM models sold in Thailand."
    },
    url: "https://www.gwm.co.th/en",
    category: "official",
    checkedAt: "2026-05-23"
  },
  {
    id: "neta-thailand",
    title: {th: "NETA Thailand", en: "NETA Thailand"},
    description: {
      th: "เว็บทางการ NETA Auto Thailand สำหรับรุ่นรถ ทดลองขับ โชว์รูม และการติดต่อ",
      en: "Official NETA Auto Thailand site for models, test drives, showrooms, and contact."
    },
    url: "https://www.neta.co.th/th",
    category: "official",
    checkedAt: "2026-05-23"
  },
  {
    id: "gac-aion-thailand",
    title: {th: "GAC / AION Thailand", en: "GAC / AION Thailand"},
    description: {
      th: "เว็บทางการ GAC Thailand สำหรับ AION, HYPTEC และข้อมูลบริการในไทย",
      en: "Official GAC Thailand site for AION, HYPTEC, and service information in Thailand."
    },
    url: "https://www.gacgroup.com/th-th",
    category: "official",
    checkedAt: "2026-05-23"
  },
  {
    id: "mea-ev",
    title: {th: "MEA EV", en: "MEA EV"},
    description: {
      th: "ข้อมูลด้านระบบไฟฟ้าและบริการเกี่ยวกับการชาร์จ EV ในพื้นที่กรุงเทพฯ และปริมณฑล",
      en: "Electricity and EV charging information for Bangkok metropolitan areas."
    },
    url: "https://www.mea.or.th/",
    category: "tools",
    checkedAt: "2026-05-23"
  },
  {
    id: "pea-volta",
    title: {th: "PEA VOLTA", en: "PEA VOLTA"},
    description: {
      th: "ข้อมูลเครือข่ายชาร์จและบริการชาร์จ EV ของการไฟฟ้าส่วนภูมิภาค",
      en: "Provincial Electricity Authority EV charging network and service information."
    },
    url: "https://www.peavolta.com/",
    category: "tools",
    checkedAt: "2026-05-23"
  }
];

export async function getReferenceSources() {
  return referenceSources;
}
