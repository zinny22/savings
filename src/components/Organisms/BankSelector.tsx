import TabButton, { TabKey } from "../Molecules/TabButton";

interface BankSelectorProps {
  lastPathName: TabKey;
}

function BankSelector({ lastPathName }: BankSelectorProps) {
  return (
    <section className="rounded-xl p-5 bg-white flex justify-center">
      <TabButton lastPathName={lastPathName} />
    </section>
  );
}

export default BankSelector;
