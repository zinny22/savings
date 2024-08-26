import { CombinedDeposit, OptionList } from "@/schema/deposit.schema";
import formatPrice from "@/utils/formatPrice";
import { cx } from "class-variance-authority";
import { useEffect, useState } from "react";

interface DepositMaturityCalculatorProps {
  deposit?: CombinedDeposit;
}

function DepositMaturityCalculator({
  deposit,
}: DepositMaturityCalculatorProps) {
  const [depositAmount, setDepositAmount] = useState<string>("3000000");
  const [option, setOption] = useState<OptionList>();
  const [interestRate, setInterestRate] = useState<"basic" | "high">("high");

  const percent = 15.4;
  const optionPercent = (option?.intr_rate || 1) / 100;
  const preTaxAmount = Number(depositAmount) * optionPercent;
  const taxMount = Number(depositAmount) * optionPercent * (percent / 100);
  const netAmount = Number(depositAmount) + preTaxAmount - taxMount;

  function formatCurrency(amount: number) {
    const formattedAmount = (amount / 10000).toLocaleString("ko-KR");
    return formattedAmount + "만원";
  }

  useEffect(() => {
    deposit?.optionList.filter(
      (item) => item.save_trm === "12" && setOption(item)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="rounded-xl p-5 bg-white grid gap-y-5">
      <h2 className="text-lg font-bold">금리 안내</h2>
      <div className="border border-gray-100 w-full" />

      <div className="flex">
        <div className="flex gap-x-2">
          {deposit?.optionList.map((_option, index) => (
            <button
              key={index}
              onClick={() => setOption(_option)}
              className={cx(
                "",
                _option.save_trm === option?.save_trm && "bg-red-300"
              )}
            >
              {_option.save_trm}개월
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full justify-between items-center ">
        <button
          className={cx(
            "p-3 flex border  w-full justify-between",
            interestRate === "high" ? "border-sky-200" : "border-gray-200"
          )}
          onClick={() => setInterestRate("high")}
        >
          <p>최고금리</p>
          <p>{option?.intr_rate2}%</p>
        </button>
        <button
          className={cx(
            "p-3 flex border  w-full justify-between",
            interestRate === "basic" ? "border-sky-200" : "border-gray-200"
          )}
          onClick={() => setInterestRate("basic")}
        >
          <p>기본금리</p>
          <p>{option?.intr_rate}%</p>
        </button>
      </div>
      <div>
        <p className="text-sm">예치금액</p>

        <input
          className="text-3xl font-bold border-b border-gray-800 py-3 w-full"
          value={formatPrice(Number(depositAmount), "원")}
          onChange={(e) => setDepositAmount(e.currentTarget.value)}
          placeholder="예치할 금액을 입력해주세요"
        />
        <p>
          {depositAmount !== "0"
            ? formatCurrency(Number(depositAmount))
            : "최대 10억원까지만 계산 가능해요"}
        </p>
      </div>

      <div className="bg-sky-100 rounded-xl p-5 grid gap-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">원금합계</p>
          <p>{formatPrice(Number(depositAmount), "원")}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">세전이자</p>
          <p>+{formatPrice(preTaxAmount, "원")}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">이자과세(15.4%)</p>
          <p>-{formatPrice(taxMount, "원")}</p>
        </div>

        <div className="border border-gray-50 w-full" />

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">세후 수령액</p>
          <p>{formatPrice(netAmount, "원")}</p>
        </div>
      </div>
    </section>
  );
}

export default DepositMaturityCalculator;
