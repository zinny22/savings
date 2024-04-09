import { CombinedDeposit } from "@/schema/deposit.schema";
import Icon, { IconName } from "../Atom/Icon";

interface DetailProductCardProps {
  deposit?: CombinedDeposit;
}

function DetailProductCard({ deposit }: DetailProductCardProps) {
  const maxOption = [...(deposit?.optionList || [])].sort(
    (a, b) => b.intr_rate - a.intr_rate
  );

  const baseIntrRate = [...(deposit?.optionList || [])].find(
    (item) => item.save_trm === "12"
  );

  console.log(deposit);
  return (
    <section className="rounded-xl p-5 bg-white grid gap-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div className="w-[42px] h-[42px] rounded-full">
            <Icon
              name={
                deposit?.kor_co_nm === "한국스탠다드차타드은행"
                  ? "SC제일"
                  : (deposit?.kor_co_nm
                      .replace("은행", "")
                      .replace("주식회사", "")
                      .replace(" ", "") as IconName)
              }
            />
          </div>
          <div className="grid gap-y-1">
            <p>{deposit?.fin_prdt_nm}</p>
            <p>
              {deposit?.kor_co_nm === "한국스탠다드차타드은행"
                ? "SC제일"
                : deposit?.kor_co_nm.replace("주식회사", "").replace(" ", "")}
            </p>
          </div>
        </div>

        <div>
          <p>최고 {maxOption[0]?.intr_rate2}%</p>
          <p>기본 {baseIntrRate?.intr_rate || 0}%</p>
        </div>
      </div>

      <p>{deposit?.etc_note}</p>
      <p>{deposit?.join_way}</p>
      <p className="whitespace-pre-line">{deposit?.join_member}</p>
      <p className="whitespace-pre-line">{deposit?.spcl_cnd}</p>
      <p className="whitespace-pre-line">{deposit?.mtrt_int}</p>

      <div>
        <p>기간별 금리</p>

        <div></div>
        {deposit?.optionList.map((item, index) => (
          <div key={index}>
            <p>기간:{item.save_trm}</p>
            <p>기본금리{item.intr_rate}</p>
            <p>최대금리:{item.intr_rate2}</p>
            <p>{item.intr_rate_type_nm}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DetailProductCard;
