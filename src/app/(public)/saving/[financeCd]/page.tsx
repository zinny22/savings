import DepositDetail from "@/components/Pages/DepositDetail";

type Props = {
  params: {
    financeCd: string;
  };
};

function SavingDetailPage({ params }: Props) {
  const financeCd = params.financeCd;

  return <DepositDetail financeCd={financeCd} />;
}

export default SavingDetailPage;
