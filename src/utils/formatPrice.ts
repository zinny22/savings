export default function formatPrice(price?: number | null, suffix?: "원") {
  const formattedPrice = price ? Math.floor(price).toLocaleString() : 0;
  const result = `${formattedPrice}${suffix || ""}`;
  return result;
}
