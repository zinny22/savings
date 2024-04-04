"use client";

import BankSchema, { BankBaseList } from "@/schema/bank.schema";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Icon, { IconName } from "../Atom/Icon";
import { cx } from "class-variance-authority";

interface BankListProps {
  filteredBanks: string[];
  setFilteredBanks: Dispatch<SetStateAction<string[]>>;
}

function BankList({ filteredBanks, setFilteredBanks }: BankListProps) {
  const [banks, setBanks] = useState<BankBaseList[]>([]);

  const initBankList = async () => {
    try {
      const url =
        process.env.NEXT_PUBLIC_ENDPOINT +
        `companySearch.json?auth=${process.env.NEXT_PUBLIC_KEY}&topFinGrpNo=020000&pageNo=1`;
      const response = await fetch(url);
      const jsonData = (await response.json()).result as BankSchema;
      setBanks(jsonData.baseList);
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
    initBankList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className="flex gap-x-2 overflow-x-auto max-w-[540px]">
      {banks?.map((bank) => (
        <li
          key={bank.fin_co_no}
          className={cx(
            "cursor-pointer min-w-[90px] grid gap-y-2 justify-items-center border px-2 py-5 rounded-md",
            filteredBanks?.includes(bank.fin_co_no)
              ? "border-pink-500"
              : "border-gray-200 "
          )}
          onClick={() => handleClickBank(bank.fin_co_no)}
        >
          <Icon
            name={
              bank.kor_co_nm === "한국스탠다드차타드은행"
                ? "SC제일"
                : (bank.kor_co_nm
                    .replace("은행", "")
                    .replace("주식회사", "")
                    .replace(" ", "") as IconName)
            }
            width={20}
            height={20}
          />
          <p className="whitespace-nowrap text-sm">
            {bank.kor_co_nm === "한국스탠다드차타드은행"
              ? "SC제일"
              : bank.kor_co_nm
                  .replace("은행", "")
                  .replace("주식회사", "")
                  .replace(" ", "")}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default BankList;
