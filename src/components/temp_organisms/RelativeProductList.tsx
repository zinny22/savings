import DepositSchema, { CombinedDeposit } from '@/schema/deposit.schema';
import getGroupProductsByMatchingProductCode from '@/utils/getGroupProductsByMatchingProductCode';
import getSortedProductsByRate from '@/utils/getSortedProductsByRate';
import { useEffect, useState } from 'react';
import ProductCard from '../temp_molecules/ProductCard';
import { useRouter } from 'next/navigation';

interface RelativeProductListProps {
  sameBankProducts?: DepositSchema;
}

function RelativeProductList({ sameBankProducts }: RelativeProductListProps) {
  const router = useRouter();

  const [combinedDeposits, setCombinedDeposits] = useState<CombinedDeposit[]>(
    []
  );

  useEffect(() => {
    if (sameBankProducts?.baseList && sameBankProducts.optionList) {
      const baseInfo = sameBankProducts.baseList;
      const optionList = sameBankProducts.optionList;

      const result = getGroupProductsByMatchingProductCode(
        baseInfo,
        optionList
      );
      setCombinedDeposits(result);
    }
  }, [sameBankProducts?.baseList, sameBankProducts?.optionList]);

  return (
    <section className="rounded-xl p-5 bg-white grid gap-y-5">
      <p>관련 상품</p>

      <ul className="grid gap-y-5 divide-y-2 rounded-xl">
        {combinedDeposits.map((deposit) => {
          const maxOption = [...deposit.optionList].sort(
            (a, b) => b.intr_rate - a.intr_rate
          );

          const baseIntrRate = [...deposit.optionList].find(
            (item) => item.save_trm === '12'
          );

          return (
            <li
              key={deposit.fin_prdt_cd}
              className="pt-5 cursor-pointer"
              onClick={() =>
                router.push(
                  `/detail?type=deposit&code=${deposit.fin_prdt_cd}&fiCd=${deposit.fin_co_no}`
                )
              }
            >
              <ProductCard
                title={deposit.fin_prdt_nm}
                bank={deposit.kor_co_nm}
                maxIntrRate={maxOption[0].intr_rate2}
                baseIntrRate={baseIntrRate?.intr_rate || 0}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default RelativeProductList;
