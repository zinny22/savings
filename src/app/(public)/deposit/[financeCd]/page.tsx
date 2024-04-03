import DepositDetail from "@/components/Pages/DepositDetail";

type Props = {
  params: {
    financeCd: string;
  };
};

function DepositDetailPage({ params }: Props) {
  const financeCd = params.financeCd;

  return <DepositDetail financeCd={financeCd} />;
}

export default DepositDetailPage;
