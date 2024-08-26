'use client';

import { BaseList, CombinedDeposit, OptionList } from '@/schema/deposit.schema';
import getGroupProductsByMatchingProductCode from '@/utils/getGroupProductsByMatchingProductCode';
import getSortedProductsByRate from '@/utils/getSortedProductsByRate';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from '../molecules/ProductCard';
import { finGrpNos } from '../pages/ListDetail';
import { SortKey } from './DepositCardList';
interface SavingCardListProps {
  filteredBanks: string[];
  sortedNumber?: number;
}

function SavingCardList({ filteredBanks, sortedNumber }: SavingCardListProps) {
  const router = useRouter();

  const [combinedSavings, setCombinedSavings] = useState<CombinedDeposit[]>([]);
  const [sort, setSort] = useState<SortKey>('최고금리순');

  const initSavingProducts = async (finGrpNo: string) => {
    const auth = process.env.NEXT_PUBLIC_KEY;
    const pageNo = 1;

    try {
      const url = `/savingProductsSearch.json?auth=${auth}&topFinGrpNo=${finGrpNo}&pageNo=${pageNo}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      const baseInfo: BaseList[] = jsonData.result.baseList;
      const optionList: OptionList[] = jsonData.result.optionList;
      const result = getGroupProductsByMatchingProductCode(
        baseInfo,
        optionList
      );
      setCombinedSavings((p) => [...p, ...result]);
    } catch (error) {
      console.log(error);
    }
  };

  const savings =
    filteredBanks.length > 0
      ? combinedSavings?.filter((product) =>
          filteredBanks.includes(product.fin_co_no)
        )
      : combinedSavings;

  const { sortedProductsByBaseRate, sortedProductsByMaxRate } =
    getSortedProductsByRate(savings);

  useEffect(() => {
    finGrpNos.forEach((finGrpNo) => {
      initSavingProducts(finGrpNo);
    });
  }, []);

  return (
    <div className="rounded-xl p-3 bg-white">
      {!sortedNumber && (
        <div className="flex items-center justify-between">
          <p>{savings.length}개</p>
          <div
            onClick={() =>
              sort === '최고금리순'
                ? setSort('기본금리순')
                : setSort('최고금리순')
            }
          >
            {sort}
          </div>
        </div>
      )}

      <ul className="grid gap-y-5">
        {(sortedNumber
          ? (sort === '최고금리순'
              ? sortedProductsByMaxRate
              : sortedProductsByBaseRate
            ).slice(0, sortedNumber)
          : sort === '최고금리순'
          ? sortedProductsByMaxRate
          : sortedProductsByBaseRate
        ).map((saving, index) => {
          const maxOption = [...saving.optionList].sort(
            (a, b) => b.intr_rate - a.intr_rate
          );

          const baseIntrRate = [...saving.optionList].find(
            (item) => item.save_trm === '12'
          );

          return (
            <li
              key={index}
              className="cursor-pointer flex items-start"
              onClick={() =>
                router.push(
                  `/detail?type=saving&code=${saving.fin_prdt_cd}&fiCd=${saving.fin_co_no}`
                )
              }
            >
              {sortedNumber && (
                <p className="bg-[#0075FF] w-5 h-5 text-white flex items-center justify-center">
                  {index + 1}
                </p>
              )}
              <Card
                title={saving.fin_prdt_nm}
                bank={saving.kor_co_nm}
                maxIntrRate={maxOption[0].intr_rate2}
                baseIntrRate={baseIntrRate?.intr_rate || 0}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SavingCardList;
