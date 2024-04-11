"use client";

import React, { useEffect, useState } from "react";
import Card from "../Molecules/ProductCard";
import { useRouter } from "next/navigation";
import { SortKey } from "./DepositCardList";
import getSortedProductsByRate from "@/utils/getSortedProductsByRate";
import { BaseList, CombinedDeposit, OptionList } from "@/schema/deposit.schema";
import getGroupProductsByMatchingProductCode from "@/utils/getGroupProductsByMatchingProductCode";
import { finGrpNos } from "../Pages/ListDetail";
interface SavingCardListProps {
  filteredBanks: string[];
}

function SavingCardList({ filteredBanks }: SavingCardListProps) {
  const router = useRouter();

  const [combinedSavings, setCombinedSavings] = useState<CombinedDeposit[]>([]);
  const [sort, setSort] = useState<SortKey>("최고금리순");

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

  const savings =
    filteredBanks.length > 0
      ? combinedSavings?.filter((product) =>
          filteredBanks.includes(product.fin_co_no)
        )
      : combinedSavings;

  const { sortedProductsByBaseRate, sortedProductsByMaxRate } =
    getSortedProductsByRate(savings);

  useEffect(() => {
    finGrpNos.forEach((finGrpNo) => {
      initSavingProducts(finGrpNo);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-xl p-5 bg-white">
      <div className="flex items-center justify-between">
        <p>{savings.length}개</p>
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

      <ul className="grid gap-y-5 divide-y-2">
        {(sort === "최고금리순"
          ? sortedProductsByMaxRate
          : sortedProductsByBaseRate
        ).map((saving, index) => {
          const maxOption = [...saving.optionList].sort(
            (a, b) => b.intr_rate - a.intr_rate
          );

          const baseIntrRate = [...saving.optionList].find(
            (item) => item.save_trm === "12"
          );

          return (
            <li
              key={index}
              className="pt-5 cursor-pointer"
              onClick={() =>
                router.push(
                  `/detail?type=saving&code=${saving.fin_prdt_cd}&fiCd=${saving.fin_co_no}`
                )
              }
            >
              <Card
                title={saving.fin_prdt_nm}
                bank={saving.kor_co_nm}
                maxIntrRate={maxOption[0].intr_rate2}
                baseIntrRate={baseIntrRate?.intr_rate || 0}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SavingCardList;
