"use client";

import React, { useEffect, useState } from "react";
import Card from "../Molecules/ProductCard";
import { CombinedDeposit, BaseList, OptionList } from "@/schema/deposit.schema";
import { useRouter } from "next/navigation";

type SortKey = "최고금리순" | "기본금리순";
interface DepositCardListProps {
  filteredBanks: string[];
}

function DepositCardList({ filteredBanks }: DepositCardListProps) {
  const router = useRouter();

  const [combinedDeposits, setCombinedDeposits] = useState<CombinedDeposit[]>(
    []
  );
  const [sort, setSort] = useState<SortKey>("최고금리순");

  function groupDepositsByMatchingProductCode(
    baseDeposits: BaseList[],
    optionList: OptionList[]
  ) {
    const groupedDeposits: CombinedDeposit[] = [];

    baseDeposits.forEach((baseDeposit) => {
      const productCode = baseDeposit["fin_prdt_cd"];
      const matchingOptions = optionList.filter(
        (option) => option["fin_prdt_cd"] === productCode
      );

      if (matchingOptions.length > 0) {
        const combinedDeposit = { ...baseDeposit, optionList: matchingOptions };
        groupedDeposits.push(combinedDeposit);
      }
    });
    return groupedDeposits;
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
      const result = groupDepositsByMatchingProductCode(baseInfo, optionList);
      setCombinedDeposits(result);
    } catch (error) {
      console.log(error);
    }
  };

  const deposits =
    filteredBanks.length > 0
      ? combinedDeposits?.filter((product) =>
          filteredBanks.includes(product.fin_co_no)
        )
      : combinedDeposits;

  function sortByBaseRate(deposit: CombinedDeposit) {
    return deposit.optionList.slice().sort((a, b) => {
      const rateA = a.intr_rate || 0;
      const rateB = b.intr_rate || 0;
      return rateB - rateA;
    });
  }

  function sortByMaxRate(deposit: CombinedDeposit) {
    return deposit.optionList.slice().sort((a, b) => {
      const rateA = a.intr_rate2 || 0;
      const rateB = b.intr_rate2 || 0;
      return rateB - rateA;
    });
  }

  function sortByBaseRateThenMaxRate(a: CombinedDeposit, b: CombinedDeposit) {
    const sortedByBaseRateA = sortByBaseRate(a);
    const sortByBaseRateB = sortByBaseRate(b);
    return sortByBaseRateB[0].intr_rate - sortedByBaseRateA[0].intr_rate;
  }

  const sortedByBaseRate = deposits.slice().sort(sortByBaseRateThenMaxRate);

  const sortedByMaxRate = deposits.slice().sort((a, b) => {
    return sortByMaxRate(b)[0].intr_rate2 - sortByMaxRate(a)[0].intr_rate2;
  });

  useEffect(() => {
    initDepositProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className="grid gap-y-5 divide-y-2 rounded-xl p-5 bg-white">
      <div className="flex items-center justify-between">
        <p>{deposits.length}개</p>
        <div
          onClick={() =>
            sort === "최고금리순"
              ? setSort("기본금리순")
              : setSort("최고금리순")
          }
        >
          {sort}
        </div>
      </div>

      {(sort === "최고금리순" ? sortedByMaxRate : sortedByBaseRate).map(
        (deposit) => {
          const maxOption = [...deposit.optionList].sort(
            (a, b) => b.intr_rate - a.intr_rate
          );

          const baseIntrRate = [...deposit.optionList].find(
            (item) => item.save_trm === "12"
          );

          return (
            <li
              key={deposit.fin_prdt_cd}
              className="pt-5 cursor-pointer"
              onClick={() => router.push(`/deposit/${deposit.fin_co_no}`)}
            >
              <Card
                title={deposit.fin_prdt_nm}
                bank={deposit.kor_co_nm}
                maxIntrRate={maxOption[0].intr_rate2}
                baseIntrRate={baseIntrRate?.intr_rate || 0}
              />
            </li>
          );
        }
      )}
    </ul>
  );
}

export default DepositCardList;
