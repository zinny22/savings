import { CombinedDeposit } from "@/schema/deposit.schema";

export default function getSortedProductsByRate(products: CombinedDeposit[]) {
  function sortByBaseRate(saving: CombinedDeposit) {
    return saving.optionList.slice().sort((a, b) => {
      const rateA = a.intr_rate || 0;
      const rateB = b.intr_rate || 0;
      return rateB - rateA;
    });
  }

  function sortByMaxRate(saving: CombinedDeposit) {
    return saving.optionList.slice().sort((a, b) => {
      const rateA = a.intr_rate2 || 0;
      const rateB = b.intr_rate2 || 0;
      return rateB - rateA;
    });
  }

  function sortByBaseRateThenMaxRate(a: CombinedDeposit, b: CombinedDeposit) {
    const sortedByBaseRateA = sortByBaseRate(a);
    const sortByBaseRateB = sortByBaseRate(b);
    return sortByBaseRateB[0].intr_rate - sortedByBaseRateA[0].intr_rate;
  }

  const sortedProductsByBaseRate = products
    .slice()
    .sort(sortByBaseRateThenMaxRate);

  const sortedProductsByMaxRate = products.slice().sort((a, b) => {
    return sortByMaxRate(b)[0].intr_rate2 - sortByMaxRate(a)[0].intr_rate2;
  });

  return {
    sortedProductsByBaseRate,
    sortedProductsByMaxRate,
  };
}
