"use client";

import { usePathname } from "next/navigation";
import BankSelector from "../Organisms/BankSelector";
import DepositCardList from "../Organisms/DepositCardList";
import { TabKey } from "../Molecules/TabButton";
import SavingCardList from "../Organisms/SavingCardList";
import { useState } from "react";

function ListDetail() {
  const pathName = usePathname();
  const pathParts = pathName.split("/");
  const lastPathName = pathParts[pathParts.length - 1];

  const [filteredBanks, setFilteredBanks] = useState<string[]>([]);

  return (
    <section className="bg-gray-200 w-full flex justify-center">
      <section className="w-[562px] grid gap-y-4 py-5">
        <BankSelector
          lastPathName={lastPathName as TabKey}
          filteredBanks={filteredBanks}
          setFilteredBanks={setFilteredBanks}
        />

        {lastPathName === "deposit" && (
          <DepositCardList filteredBanks={filteredBanks} />
        )}
        {lastPathName === "saving" && (
          <SavingCardList filteredBanks={filteredBanks} />
        )}
      </section>
    </section>
  );
}

export default ListDetail;
