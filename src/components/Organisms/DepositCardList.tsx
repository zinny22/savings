"use client";

import React, { useEffect, useState } from "react";
import Card from "../Molecules/ProductCard";
import { Deposit, BaseList, OptionList } from "@/schema/deposit.schema";
import { useRouter } from "next/navigation";

interface DepositCardListProps {
  filteredBanks: string[];
}
function DepositCardList({ filteredBanks }: DepositCardListProps) {
  const router = useRouter();

  const [depositProducts, setDepositProducts] = useState<Deposit[]>([]);

  function groupObjectsByMatchingProperty(
    baseList: BaseList[],
    optionList: OptionList[]
  ) {
    const grouped: Deposit[] = [];

    baseList.forEach((obj1) => {
      const prdtCode = obj1["fin_prdt_cd"];
      const matchingObj2 = optionList.find(
        (obj2) => obj2["fin_prdt_cd"] === prdtCode
      );

      if (matchingObj2) {
        const combinedObject = { ...obj1, ...matchingObj2 };
        grouped.push(combinedObject);
      }
    });
    return grouped;
  }

  const initDepositProducts = async () => {
    try {
      const url =
        process.env.NEXT_PUBLIC_ENDPOINT +
        `depositProductsSearch.json?auth=${process.env.NEXT_PUBLIC_KEY}&topFinGrpNo=020000&pageNo=1`;
      const response = await fetch(url);
      const jsonData = await response.json();
      const baseInfo: BaseList[] = jsonData.result.baseList;
      const optionList: OptionList[] = jsonData.result.optionList;
      const result = groupObjectsByMatchingProperty(baseInfo, optionList);
      setDepositProducts(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initDepositProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className="grid gap-y-5 divide-y-2 rounded-xl p-5 bg-white">
      <div className="flex items-center justify-between">
        <p>{depositProducts.length}개</p>
        <div>최고 금리순</div>
      </div>

      {(filteredBanks.length > 0
        ? depositProducts?.filter((product) =>
            filteredBanks.includes(product.fin_co_no)
          )
        : depositProducts
      ).map((deposit) => (
        <li
          key={deposit.fin_prdt_cd}
          className="pt-5 cursor-pointer"
          onClick={() => router.push(`/deposit/${deposit.fin_co_no}`)}
        >
          <Card
            title={deposit.fin_prdt_nm}
            bank={deposit.kor_co_nm}
            maxIntrRate={deposit.intr_rate2}
            baseIntrRate={deposit.intr_rate}
          />
        </li>
      ))}
    </ul>
  );
}

export default DepositCardList;
