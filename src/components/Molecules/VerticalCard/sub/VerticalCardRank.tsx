interface RankProps {
  rank?: number;
}
function VerticalCardRank({ rank }: RankProps) {
  return (
    <p className="bg-[##CBE1FF] rounded px-2 text-[#2165EA] font-bold text-base">
      {rank}
    </p>
  );
}

export default VerticalCardRank;
