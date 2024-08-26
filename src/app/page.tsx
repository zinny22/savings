'use client';

import { useEffect, useState } from 'react';

import { BaseList, CombinedDeposit, OptionList } from '@/schema/deposit.schema';
import getGroupProductsByMatchingProductCode from '@/utils/getGroupProductsByMatchingProductCode';
import getSortedProductsByRate from '@/utils/getSortedProductsByRate';
import Header from '@/components/temp_molecules/Header/Header';
import Toggle from '@/components/atom/Toggle/Toggle';
import VerticalCardList from '@/components/temp_organisms/VerticalCardList/VerticalCardList';

const finGrpNos = ['020000', '030200', '030300', '050000', '060000'];

function Home() {
  const [toggle, setToggle] = useState('');
  const [combinedDeposits, setCombinedDeposits] = useState<CombinedDeposit[]>(
    []
  );
  const [combinedSavings, setCombinedSavings] = useState<CombinedDeposit[]>([]);

  const initDepositProducts = async (finGrpNo: string) => {
    const auth = process.env.NEXT_PUBLIC_KEY;
    const pageNo = 1;

    try {
      const url = `/depositProductsSearch.json?auth=${auth}&topFinGrpNo=${finGrpNo}&pageNo=${pageNo}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      const baseInfo: BaseList[] = jsonData.result.baseList;
      const optionList: OptionList[] = jsonData.result.optionList;
      const result = getGroupProductsByMatchingProductCode(
        baseInfo,
        optionList
      );
      setCombinedDeposits((p) => [...p, ...result]);
    } catch (error) {
      console.log(error);
    }
  };

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

  const { sortedProductsByMaxRate } = getSortedProductsByRate(
    toggle === '예금' ? combinedDeposits : combinedSavings
  );

  useEffect(() => {
    if (toggle !== '예금') return;

    finGrpNos.forEach((finGrpNo) => {
      initDepositProducts(finGrpNo);
    });
  }, []);

  useEffect(() => {
    if (toggle !== '적금') return;

    finGrpNos.forEach((finGrpNo) => {
      initSavingProducts(finGrpNo);
    });
  }, []);

  return (
    <>
      <Header isOnlyLogo />
      <div className="h-[100vh] w-full pt-[58px]">
        <div className="flex justify-between items-center">
          <p>이자 높은 상품</p>
          <Toggle list={['예금', '적금', '파킹']} setToggle={setToggle} />
        </div>

        <VerticalCardList
          sortedProductsByMaxRate={sortedProductsByMaxRate.slice(0, 4)}
        />
      </div>
    </>
  );
}

export default Home;
