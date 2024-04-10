"use client";

import DepositDetail from "@/components/Pages/DepositDetail";
import SavingDetail from "@/components/Pages/SavingDetail";
import { useSearchParams } from "next/navigation";

function DetailPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const financeCd = searchParams.get("fiCd");
  const code = searchParams.get("code");

  return (
    <div className="w-[562px] grid gap-y-4 py-5">
      {type === "deposit" && (
        <DepositDetail financeCd={financeCd || ""} code={code || ""} />
      )}

      {type === "saving" && (
        <SavingDetail financeCd={financeCd || ""} code={code || ""} />
      )}
    </div>
  );
}

export default DetailPage;
