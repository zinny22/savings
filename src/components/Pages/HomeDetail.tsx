import VerticalCard from '../molecules/VerticalCard';
import Top4List from '../organisms/Top4List';

function HomeDetail() {
  return (
    <div className="h-[100vh] w-full pt-[58px]">
      <VerticalCard>
        <VerticalCard.Rank rank={2} />
        <VerticalCard.Badge badges={['특판', '비대면 가입']} />
        <VerticalCard.Bank bank="수협" title="Sh첫만남우대예금" />
        <VerticalCard.Rate baseIntrRate={3} maxIntrRate={5.6} />
      </VerticalCard>
      <Top4List />
    </div>
  );
}

export default HomeDetail;
