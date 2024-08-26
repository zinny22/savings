import VerticalCardBadges from './sub/VerticalCardBadges';
import VerticalCardBank from './sub/VerticalCardBank';
import VerticalCardRank from './sub/VerticalCardRank';
import VerticalCardRate from './sub/VerticalCardRate';
import VerticalCardContainer from './VerticalCardContainer';

type VerticalCardComponents = typeof VerticalCardContainer & {
  Rank: typeof VerticalCardRank;
  Badge: typeof VerticalCardBadges;
  Bank: typeof VerticalCardBank;
  Rate: typeof VerticalCardRate;
};

const VerticalCard = VerticalCardContainer as VerticalCardComponents;
VerticalCard.Rank = VerticalCardRank;
VerticalCard.Badge = VerticalCardBadges;
VerticalCard.Bank = VerticalCardBank;
VerticalCard.Rate = VerticalCardRate;

export default VerticalCard;
