export const colors = {
  bg: "#ffffff",
  ink: "#111111",
  muted: "#737373",
  paper: "#ffffff",
  surface: "#f4f4f4",
  line: "#e8e8e8",
  accent: "#111111",
  accentSoft: "#f4f4f4",
  sale: "#111111",
};

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

export const getSalePrice = (price: number, discountPercentage: number) =>
  price * (1 - discountPercentage / 100);

export const CATEGORY_LABELS: Record<string, string> = {
  beauty: "뷰티",
  fragrances: "향수",
  furniture: "가구",
  groceries: "식료품",
  "home-decoration": "홈데코",
  "kitchen-accessories": "주방용품",
  laptops: "노트북",
  "mens-shirts": "남성 셔츠",
  "mens-shoes": "남성 신발",
  "mens-watches": "남성 시계",
  "mobile-accessories": "모바일 액세서리",
  motorcycle: "모터사이클",
  "skin-care": "스킨케어",
  smartphones: "스마트폰",
  "sports-accessories": "스포츠",
  sunglasses: "선글라스",
  tablets: "태블릿",
  tops: "상의",
  vehicle: "차량",
  "womens-bags": "여성 가방",
  "womens-dresses": "원피스",
  "womens-jewellery": "주얼리",
  "womens-shoes": "여성 신발",
  "womens-watches": "여성 시계",
};

export const formatCategory = (category: string) =>
  CATEGORY_LABELS[category] ??
  category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
