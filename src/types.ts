export interface Product {
  folder: string;
  name_en: string;
  name_ar: string;
  sku: string;
  price: string;
  pv: string;
  cu: string;
  gft: string;
  description_en: string;
  description_ar: string;
  areas_en: string;
  areas_ar: string;
  details_en: string;
  details_ar: string;
  care_en: string;
  care_ar: string;
  images: Array<{ url: string; alt: string }>;
  category: string;
}

export interface ProductsData {
  total: number;
  company: string;
  company_website: string;
  manager: string;
  manager_title: string;
  whatsapp_phone: string;
  whatsapp_group: string;
  products: Product[];
}

export const companyInfo = {
  website: "https://ecoway.group",
  whatsappPhone: "201144457333",
  whatsappGroup: "https://chat.whatsapp.com/I6emzEZSWzdKIouGepbzIL?s=cl&p=a&mlu=4&ilr=4&iam=2",
  managerName: "Asmaa",
  managerTitle: "Marketing & Sales Manager",
};

export const WHATSAPP_PHONE = companyInfo.whatsappPhone;
export const WHATSAPP_GROUP = companyInfo.whatsappGroup;
export const COMPANY_WEBSITE = companyInfo.website;

export const CATEGORIES = [
  { key: "all", name: "الكل", count: 85 },
  { key: "towel", name: "الفوطة", count: 0 },
  { key: "soap", name: "صابون", count: 0 },
  { key: "sponge", name: "الإسفنجة", count: 0 },
  { key: "perfume", name: "العطور", count: 0 },
  { key: "bag", name: "الحقائب", count: 0 },
  { key: "laundry", name: "غسيل", count: 0 },
  { key: "acupressure", name: "الاكو بريشر", count: 0 },
  { key: "device", name: "الأجهزة", count: 0 },
  { key: "other", name: "أخرى", count: 0 },
];
