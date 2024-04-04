"use client";

import React, { useEffect, useState } from "react";
import Card from "../Molecules/ProductCard";
import DepositSchema, {
  Deposit,
  BaseList,
  OptionList,
} from "@/schema/deposit.schema";
import { useRouter } from "next/navigation";

function SavingCardList() {
  const router = useRouter();

  const [data, setData] = useState<DepositSchema>();
  const [savingProducts, setSavingProducts] = useState<Deposit[]>([]);

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

  const initSavingProducts = async () => {
    try {
      const response = await fetch("/api/APTRealPrice");
      const jsonData = await response.json();
      const baseInfo: BaseList[] = jsonData.result.baseList;
      const optionList: OptionList[] = jsonData.result.optionList;
      const result = groupObjectsByMatchingProperty(baseInfo, optionList);
      setSavingProducts(result);
      console.log(result);
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initSavingProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className="grid gap-y-5 divide-y-2 rounded-xl p-5 bg-white">
      <div className="flex items-center justify-between">
        <p>{data?.total_count}개</p>
        <div>최고 금리순</div>
      </div>

      {savingProducts?.map((saving) => (
        <li
          key={saving.fin_prdt_cd}
          className="pt-5 cursor-pointer"
          onClick={() => router.push(`/detail/${saving.fin_co_no}`)}
        >
          <Card
            title={saving.fin_prdt_nm}
            bank={saving.kor_co_nm}
            maxIntrRate={saving.intr_rate2}
            baseIntrRate={saving.intr_rate}
          />
        </li>
      ))}
    </ul>
  );
}

export default SavingCardList;
