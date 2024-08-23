'use client';

import BankSchema, { BankBaseList } from '@/schema/bank.schema';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { cx } from 'class-variance-authority';
import { finGrpNos } from '../pages/ListDetail';
import Image from 'next/image';
import getBankNameAbbreviation from '@/utils/getBankNameAbbreviation';

interface BankListProps {
  filteredBanks: string[];
  setFilteredBanks: Dispatch<SetStateAction<string[]>>;
}

function BankList({ filteredBanks, setFilteredBanks }: BankListProps) {
  const [banks, setBanks] = useState<BankBaseList[]>([]);

  const initBankList = async (finGrpNo: string) => {
    const auth = process.env.NEXT_PUBLIC_KEY;
    const pageNo = 1;

    try {
      const url = `/companySearch.json?auth=${auth}&topFinGrpNo=${finGrpNo}&pageNo=${pageNo}`;
      const response = await fetch(url);
      const jsonData = (await response.json()).result as BankSchema;
      setBanks((prev) => [...jsonData.baseList]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickBank = (code: string) => {
    setFilteredBanks((prev) => {
      if (prev.includes(code)) {
        return prev.filter((_prev) => _prev !== code);
      } else {
        return [...prev, code];
      }
    });
  };

  useEffect(() => {
    //TODO: 자세한 필터 추가 될 경우 각 은행별 값 가지고 올 수 있어야함
    initBankList(finGrpNos[0]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className="flex gap-x-2 overflow-x-auto max-w-[540px]">
      {banks?.map((bank, index) => (
        <li
          key={index}
          className={cx(
            'cursor-pointer min-w-[90px] grid gap-y-2 justify-items-center border px-2 py-5 rounded-md',
            filteredBanks?.includes(bank.fin_co_no)
              ? 'border-pink-500'
              : 'border-gray-200 '
          )}
          onClick={() => handleClickBank(bank.fin_co_no)}
        >
          <Image
            src={`/banks/${getBankNameAbbreviation(bank.kor_co_nm, true)}.png`}
            width={40}
            height={40}
            alt={bank.kor_co_nm}
          />
          <p className="whitespace-nowrap text-sm">
            {getBankNameAbbreviation(bank.kor_co_nm, true)}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default BankList;
