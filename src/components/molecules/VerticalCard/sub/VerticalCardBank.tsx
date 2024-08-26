import getBankNameAbbreviation from '@/utils/getBankNameAbbreviation';
import Image from 'next/image';

interface VerticalCardBankProps {
  bank: string;
  title: string;
}

function VerticalCardBank({ bank, title }: VerticalCardBankProps) {
  return (
    <div className="grid gap-y-3">
      <div className="rounded-full">
        <Image
          src={`/banks/${getBankNameAbbreviation(bank, true)}.png`}
          width={32}
          height={32}
          alt={bank}
        />
      </div>

      <div className="grid gap-y-1">
        <p className="text-[#80828D] text-sm font-medium">{bank}</p>
        <p className="text-[#1E1F24] text-lg font-bold">{title}</p>
      </div>
    </div>
  );
}

export default VerticalCardBank;
