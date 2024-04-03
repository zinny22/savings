"use client";

import { useEffect } from "react";

interface DetailPageProps {
  financeCd: string;
}

function DepositDetail({ financeCd }: DetailPageProps) {
  console.log(financeCd);

  const initDepositProducts = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_DEPOSIT_PRODUCTS_API +
          `&financeCd=${financeCd}` || ""
      );
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initDepositProducts();
  }, []);

  return (
    <section className="w-full flex justify-center">
      <div className="w-[562px] px-5 grid gap-y-5 divide-y-2 rounded-xl bg-white p-5"></div>
    </section>
  );
}

export default DepositDetail;
