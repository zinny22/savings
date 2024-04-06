import { BaseList, CombinedDeposit, OptionList } from "@/schema/deposit.schema";

export default function getGroupProductsByMatchingProductCode(
  baseSavings: BaseList[],
  optionList: OptionList[]
) {
  const groupedSavings: CombinedDeposit[] = [];

  baseSavings.forEach((baseSaving) => {
    const productCode = baseSaving["fin_prdt_cd"];
    const matchingOptions = optionList.filter(
      (option) => option["fin_prdt_cd"] === productCode
    );

    if (matchingOptions.length > 0) {
      const combinedSaving = { ...baseSaving, optionList: matchingOptions };
      groupedSavings.push(combinedSaving);
    }
  });
  return groupedSavings;
}
