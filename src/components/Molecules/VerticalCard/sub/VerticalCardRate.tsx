interface VerticalCardRateProps {
  maxIntrRate: number;
  baseIntrRate: number;
}
function VerticalCardRate({
  maxIntrRate,
  baseIntrRate,
}: VerticalCardRateProps) {
  return (
    <div className="grid justify-items-start">
      <p className="text-[20px] font-bold text-[#0075FF]">
        최고 <span className="text-[28px] font-extrabold">{maxIntrRate}%</span>
      </p>
      <p className="text-[16px] font-medium text-[#969696]">
        기본 {baseIntrRate}%
      </p>
    </div>
  );
}

export default VerticalCardRate;
