import getBankNameAbbreviation from '@/utils/getBankNameAbbreviation';
import Icon, { IconName } from '../Atom/Icon';

interface ProductListCardProps {
  title: string;
  bank: string;
  maxIntrRate: number;
  baseIntrRate: number;
  joinWay?: string;
}
function ProductListCard({
  title,
  bank,
  maxIntrRate,
  baseIntrRate,
  joinWay,
}: ProductListCardProps) {
  return (
    <div className="flex items-center justify-between p-3 w-full">
      <div className="flex items-center gap-x-6">
        <div className="rounded-full">
          <Icon
            name={getBankNameAbbreviation(bank, true) as IconName}
            width={56}
            height={56}
          />
        </div>
        <div className="grid gap-y-1">
          <p className="text-[20px] font-semibold">{title}</p>
          <p className="text-[16px] text-[#868686] font-medium">
            {getBankNameAbbreviation(bank)}
          </p>
          {joinWay && joinWay.includes('스마트폰') && (
            <p className="bg-[#A2A2A2] p-1 text-white w-fit text-[12px]">
              비대면 가입
            </p>
          )}
        </div>
      </div>

      <div className="grid justify-items-end">
        <p className="text-[20px] font-bold text-[#0075FF]">
          최고{' '}
          <span className="text-[28px] font-extrabold ">{maxIntrRate}%</span>
        </p>
        <p className="text-[16px] font-medium text-[#969696]">
          기본 {baseIntrRate}%
        </p>
      </div>
    </div>
  );
}

export default ProductListCard;
