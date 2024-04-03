"use client";

import { usePathname } from "next/navigation";
import BankSelector from "../Organisms/BankSelector";
import DepositCardList from "../Organisms/DepositCardList";
import { TabKey } from "../Molecules/TabButton";
import SavingCardList from "../Organisms/SavingCardList";

function ListDetail() {
  const pathName = usePathname();

  const pathParts = pathName.split("/");
  const lastPathName = pathParts[pathParts.length - 1];

  return (
    <section className="bg-gray-200 w-full flex justify-center">
      <section className="w-[562px] grid gap-y-4 py-5">
        <BankSelector lastPathName={lastPathName as TabKey} />

        {lastPathName === "deposit" && <DepositCardList />}
        {lastPathName === "saving" && <SavingCardList />}
      </section>
    </section>
  );
}

export default ListDetail;
