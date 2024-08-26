import { Dispatch, SetStateAction } from 'react';
import BankList from '../temp_molecules/BankList';
import TabButton, { TabKey } from '../temp_molecules/TabButton';

interface BankSelectorProps {
  lastPathName: TabKey;
  filteredBanks: string[];
  setFilteredBanks: Dispatch<SetStateAction<string[]>>;
}

function BankSelector({
  lastPathName,
  filteredBanks,
  setFilteredBanks,
}: BankSelectorProps) {
  return (
    <section className="rounded-xl p-5 bg-white grid gap-y-5">
      <div className=" flex justify-center">
        <TabButton lastPathName={lastPathName} />
      </div>
      <BankList
        filteredBanks={filteredBanks}
        setFilteredBanks={setFilteredBanks}
      />
    </section>
  );
}

export default BankSelector;
