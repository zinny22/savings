"use client";

import React, { useEffect, useState } from "react";
import Card from "../Molecules/ProductCard";
import {
  Deposit,
  DepositBaseList,
  DepositOptionList,
} from "@/schema/deposit.schema";
import { useRouter } from "next/navigation";

function SavingCardList() {
  const router = useRouter();

  // const [depositProducts, setDepositProducts] = useState<Deposit[]>([]);

  // function groupObjectsByMatchingProperty(
  //   baseList: DepositBaseList[],
  //   optionList: DepositOptionList[]
  // ) {
  //   const grouped: Deposit[] = [];

  //   baseList.forEach((obj1) => {
  //     const prdtCode = obj1["fin_prdt_cd"];
  //     const matchingObj2 = optionList.find(
  //       (obj2) => obj2["fin_prdt_cd"] === prdtCode
  //     );

  //     if (matchingObj2) {
  //       const combinedObject = { ...obj1, ...matchingObj2 };
  //       grouped.push(combinedObject);
  //     }
  //   });
  //   return grouped;
  // }

  const initDepositProducts = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SAVING_PRODUCTS_API || ""
      );
      const jsonData = await response.json();
      // const baseInfo: DepositBaseList[] = jsonData.result.baseList;
      // const optionList: DepositOptionList[] = jsonData.result.optionList;
      // const result = groupObjectsByMatchingProperty(baseInfo, optionList);
      console.log(jsonData);
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
      {/* <div className="flex items-center justify-between">
        <p>{depositProducts.length}개</p>
        <div>최고 금리순</div>
      </div>

      {depositProducts?.map((deposit) => (
        <li
          key={deposit.fin_prdt_cd}
          className="pt-5 cursor-pointer"
          onClick={() => router.push(`/detail/${deposit.fin_co_no}`)}
        >
          <Card
            title={deposit.fin_prdt_nm}
            bank={deposit.kor_co_nm}
            maxIntrRate={deposit.intr_rate2}
            baseIntrRate={deposit.intr_rate}
          />
        </li>
      ))} */}
    </ul>
  );
}

export default SavingCardList;
