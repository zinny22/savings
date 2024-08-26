import VerticalCard from '@/components/molecules/VerticalCard';
import { CombinedDeposit } from '@/schema/deposit.schema';
import { useRouter } from 'next/router';

interface VerticalCardListProps {
  sortedProductsByMaxRate: CombinedDeposit[];
}
function VerticalCardList({ sortedProductsByMaxRate }: VerticalCardListProps) {
  return (
    <div>
      {sortedProductsByMaxRate.map((deposit, index) => {
        const maxOption = [...deposit.optionList].sort(
          (a, b) => b.intr_rate - a.intr_rate
        );

        const baseIntrRate = [...deposit.optionList].find(
          (item) => item.save_trm === '12'
        );

        return (
          <VerticalCard key={index}>
            <VerticalCard.Rank rank={index + 1} />
            <VerticalCard.Badge badges={deposit.join_way.split(',')} />
            <VerticalCard.Bank
              bank={deposit.kor_co_nm}
              title={deposit.fin_prdt_nm}
            />
            <VerticalCard.Rate
              maxIntrRate={maxOption[0].intr_rate2}
              baseIntrRate={baseIntrRate?.intr_rate || 0}
            />
          </VerticalCard>
        );
      })}
    </div>
  );
}

export default VerticalCardList;
