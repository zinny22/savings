import getBankNameAbbreviation from "@/utils/getBankNameAbbreviation";
import Icon, { IconName } from "../Atom/Icon";

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
        <div className="w-[42px] h-[42px] rounded-full">
          <Icon name={getBankNameAbbreviation(bank, true) as IconName} />
        </div>
        <div className="grid gap-y-1">
          <p>{title}</p>
          <p>{getBankNameAbbreviation(bank)}</p>
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
