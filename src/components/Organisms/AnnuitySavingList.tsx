"use client";

import React, { useEffect, useState } from "react";
import Card from "../Molecules/ProductCard";
import { useRouter } from "next/navigation";
import { SortKey } from "./DepositCardList";
import getSortedProductsByRate from "@/utils/getSortedProductsByRate";
import { BaseList, CombinedDeposit, OptionList } from "@/schema/deposit.schema";
import getGroupProductsByMatchingProductCode from "@/utils/getGroupProductsByMatchingProductCode";
import { finGrpNos } from "../Pages/ListDetail";

interface AnnuitySavingListProps {
  filteredBanks: string[];
}

function AnnuitySavingList({ filteredBanks }: AnnuitySavingListProps) {
  const router = useRouter();

  const [combinedAnnuitySaving, setCombinedAnnuitySavings] = useState<
    CombinedDeposit[]
  >([]);
  const [sort, setSort] = useState<SortKey>("최고금리순");

  const initAnnuitySavingProducts = async (finGrpNo: string) => {
    const auth = process.env.NEXT_PUBLIC_KEY;
    const pageNo = 1;

    try {
      const url = `/annuitySavingProductsSearch.json?auth=${auth}&topFinGrpNo=${finGrpNo}&pageNo=${pageNo}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      const baseInfo: BaseList[] = jsonData.result.baseList;
      const optionList: OptionList[] = jsonData.result.optionList;
      const result = getGroupProductsByMatchingProductCode(
        baseInfo,
        optionList
      );

      setCombinedAnnuitySavings((p) => [...p, ...result]);
    } catch (error) {
      console.log(error);
    }
  };

  const AnnuitySavings =
    filteredBanks.length > 0
      ? combinedAnnuitySaving?.filter((product) =>
          filteredBanks.includes(product.fin_co_no)
        )
      : combinedAnnuitySaving;

  const { sortedProductsByBaseRate, sortedProductsByMaxRate } =
    getSortedProductsByRate(AnnuitySavings);

  useEffect(() => {
    finGrpNos.forEach((finGrpNo) => {
      initAnnuitySavingProducts(finGrpNo);
    });
  }, []);
  return (
    <div className="rounded-xl p-5 bg-white">
      <div className="flex items-center justify-between">
        <p>{AnnuitySavings.length}개</p>
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
        ).map((AnnuitySaving, index) => {
          const maxOption = [...AnnuitySaving.optionList].sort(
            (a, b) => b.intr_rate - a.intr_rate
          );

          const baseIntrRate = [...AnnuitySaving.optionList].find(
            (item) => item.save_trm === "12"
          );

          return (
            <li
              key={index}
              className="pt-5 cursor-pointer"
              onClick={() =>
                router.push(
                  `/detail?type=annuitySaving&code=${AnnuitySaving.fin_prdt_cd}&fiCd=${AnnuitySaving.fin_co_no}`
                )
              }
            >
              <Card
                title={AnnuitySaving.fin_prdt_nm}
                bank={AnnuitySaving.kor_co_nm}
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

export default AnnuitySavingList;
