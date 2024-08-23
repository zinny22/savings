import DepositSchema, { CombinedDeposit } from '@/schema/deposit.schema';
import getGroupProductsByMatchingProductCode from '@/utils/getGroupProductsByMatchingProductCode';
import { useEffect, useState } from 'react';
import DetailProductCard from '../molecules/DetailProductCard';
import RelativeProductList from '../organisms/RelativeProductList';

interface SavingDetailProps {
  financeCd: string;
  code: string;
}

function SavingDetail({ financeCd, code }: SavingDetailProps) {
  const [saving, setSaving] = useState<CombinedDeposit>();
  const [sameBankSavings, setSameBankSavings] = useState<DepositSchema>();

  const initSavingProduct = async () => {
    const auth = process.env.NEXT_PUBLIC_KEY;
    const topFinGrpNo = '020000';
    const pageNo = 1;

    try {
      const url = `/savingProductsSearch.json?auth=${auth}&topFinGrpNo=${topFinGrpNo}&pageNo=${pageNo}&financeCd=${financeCd}`;
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

      setSaving(result[0]);
      setSameBankSavings(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initSavingProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid gap-y-5">
      <DetailProductCard combinedProduct={saving} />
      <RelativeProductList sameBankProducts={sameBankSavings} />
    </div>
  );
}

export default SavingDetail;
