'use client';

import { usePathname } from 'next/navigation';
import BankSelector from '../organisms/BankSelector';
import { TabKey } from '../molecules/TabButton';
import { useState } from 'react';
import DepositCardList from '../organisms/DepositCardList';
import SavingCardList from '../organisms/SavingCardList';
import AnnuitySavingList from '../organisms/AnnuitySavingList';

export const finGrpNos = ['020000', '030200', '030300', '050000', '060000'];

function ListDetail() {
  const pathName = usePathname();
  const pathParts = pathName.split('/');
  const lastPathName = pathParts[pathParts.length - 1];

  const [filteredBanks, setFilteredBanks] = useState<string[]>([]);

  return (
    <section className="w-[562px] grid gap-y-4 py-5">
      <BankSelector
        lastPathName={lastPathName as TabKey}
        filteredBanks={filteredBanks}
        setFilteredBanks={setFilteredBanks}
      />

      {lastPathName === 'deposit' && (
        <DepositCardList filteredBanks={filteredBanks} />
      )}
      {lastPathName === 'saving' && (
        <SavingCardList filteredBanks={filteredBanks} />
      )}
      {lastPathName === 'annuitySaving' && (
        <AnnuitySavingList filteredBanks={filteredBanks} />
      )}
    </section>
  );
}

export default ListDetail;
