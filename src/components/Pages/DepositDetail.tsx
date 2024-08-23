'use client';

import DepositSchema, { CombinedDeposit } from '@/schema/deposit.schema';
import getGroupProductsByMatchingProductCode from '@/utils/getGroupProductsByMatchingProductCode';
import { useEffect, useState } from 'react';
import Icon, { IconName } from '../atom/Icon';
import DetailProductCard from '../molecules/DetailProductCard';
import RelativeProductList from '../organisms/RelativeProductList';
import DepositMaturityCalculator from '../organisms/DepositMaturityCalculator';

interface DetailPageProps {
  financeCd: string;
  code: string;
}

function DepositDetail({ financeCd, code }: DetailPageProps) {
  const [deposit, setDeposit] = useState<CombinedDeposit>();
  const [sameBankDeposits, setSameBankDeposit] = useState<DepositSchema>();

  const initDepositProduct = async () => {
    const auth = process.env.NEXT_PUBLIC_KEY;
    const topFinGrpNo = '020000';
    const pageNo = 1;

    try {
      const url = `/depositProductsSearch.json?auth=${auth}&topFinGrpNo=${topFinGrpNo}&pageNo=${pageNo}&financeCd=${financeCd}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      const products = jsonData.result as DepositSchema;

      const filteredBaseList = products.baseList.filter(
        (item) => item.fin_prdt_cd === code
      );

      const filteredOptionList = products.optionList.filter(
        (item) => item.fin_prdt_cd === code
      );

      const result = getGroupProductsByMatchingProductCode(
        filteredBaseList,
        filteredOptionList
      );

      setDeposit(result[0]);
      setSameBankDeposit(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initDepositProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid gap-y-5">
      <DetailProductCard combinedProduct={deposit} />
      <DepositMaturityCalculator deposit={deposit} />
      <RelativeProductList sameBankProducts={sameBankDeposits} />
    </div>
  );
}

export default DepositDetail;
