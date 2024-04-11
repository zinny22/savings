"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../Molecules/ProductCard";
import { CombinedDeposit, BaseList, OptionList } from "@/schema/deposit.schema";
import { useRouter } from "next/navigation";
import getSortedProductsByRate from "@/utils/getSortedProductsByRate";
import getGroupProductsByMatchingProductCode from "@/utils/getGroupProductsByMatchingProductCode";
import { finGrpNos } from "../Pages/ListDetail";

export type SortKey = "최고금리순" | "기본금리순";
interface DepositCardListProps {
  filteredBanks: string[];
}

function DepositCardList({ filteredBanks }: DepositCardListProps) {
  const router = useRouter();

  const [combinedDeposits, setCombinedDeposits] = useState<CombinedDeposit[]>(
    []
  );
  const [sort, setSort] = useState<SortKey>("최고금리순");

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

  const deposits =
    filteredBanks.length > 0
      ? combinedDeposits?.filter((product) =>
          filteredBanks.includes(product.fin_co_no)
        )
      : combinedDeposits;
  const { sortedProductsByBaseRate, sortedProductsByMaxRate } =
    getSortedProductsByRate(deposits);

  useEffect(() => {
    finGrpNos.forEach((finGrpNo) => {
      initDepositProducts(finGrpNo);
    });
  }, []);

  return (
    <div className="rounded-xl p-5 bg-white">
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

      <ul className="grid gap-y-5 divide-y-2">
        {(sort === "최고금리순"
          ? sortedProductsByMaxRate
          : sortedProductsByBaseRate
        ).map((deposit, index) => {
          const maxOption = [...deposit.optionList].sort(
            (a, b) => b.intr_rate - a.intr_rate
          );

          const baseIntrRate = [...deposit.optionList].find(
            (item) => item.save_trm === "12"
          );

          return (
            <li
              key={index}
              className="pt-5 cursor-pointer"
              onClick={() =>
                router.push(
                  `/detail?type=deposit&code=${deposit.fin_prdt_cd}&fiCd=${deposit.fin_co_no}`
                )
              }
            >
              <ProductCard
                title={deposit.fin_prdt_nm}
                bank={deposit.kor_co_nm}
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

export default DepositCardList;
