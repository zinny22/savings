export default function getBankNameAbbreviation(
  bankName: string,
  isShowSuffix?: boolean
) {
  return bankName === "한국스탠다드차타드은행"
    ? "SC제일"
    : bankName
        .replace(`${isShowSuffix ? "은행" : ""}`, "")
        .replace("주식회사", "")
        .replace(" ", "")
        .replace("중소", "");
}
