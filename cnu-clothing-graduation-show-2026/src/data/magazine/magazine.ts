// src/data/magazine/magazine.ts

export const MAGAZINE_PAGES = Array.from({ length: 78 }, (_, index) => {
  const pageNumber = index + 1; // 1부터 78까지 증가
  return `/images/magazine-optimized/매거진 (${pageNumber}).webp`;
});