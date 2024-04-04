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
          <Icon
            name={
              bank === "한국스탠다드차타드은행"
                ? "SC제일"
                : (bank
                    .replace("은행", "")
                    .replace("주식회사", "")
                    .replace(" ", "") as IconName)
            }
          />
        </div>
        <div className="grid gap-y-1">
          <p>{title}</p>
          <p>
            {bank === "한국스탠다드차타드은행"
              ? "SC제일"
              : bank.replace("주식회사", "").replace(" ", "")}
          </p>
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
