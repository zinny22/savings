interface ProductCardProps {
  title: string;
  bank: string;
  maxIntrRate: number;
  baseIntrRate: number;
}
function ProductCard({
  title,
  bank,
  maxIntrRate,
  baseIntrRate,
}: ProductCardProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <div className="w-[42px] h-[42px] bg-gray-400 rounded-full" />
        <div className="grid gap-y-1">
          <p>{title}</p>
          <p>{bank}</p>
          <p>방문 없이 가입 </p>
        </div>
      </div>

      <div>
        <p>최고 {maxIntrRate}%</p>
        <p>기본 {baseIntrRate}%</p>
      </div>
    </div>
  );
}

export default ProductCard;
