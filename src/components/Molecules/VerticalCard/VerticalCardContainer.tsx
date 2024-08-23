import { Children, isValidElement, ReactNode } from 'react';
import VerticalCardRank from './sub/VerticalCardRank';
import VerticalCardBadges from './sub/VerticalCardBadges';
import VerticalCardBank from './sub/VerticalCardBank';
import VerticalCardRate from './sub/VerticalCardRate';

function getVerticalCardComponents(
  children: ReactNode,
  componentType: React.ElementType
) {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter(
    (child) => isValidElement(child) && child.type === componentType
  );
}

interface VerticalCardProps {
  children?: ReactNode;
}

function VerticalCardContainer({ children }: VerticalCardProps) {
  const verticalCardRank = getVerticalCardComponents(
    children,
    VerticalCardRank
  );
  const verticalCardBadge = getVerticalCardComponents(
    children,
    VerticalCardBadges
  );
  const verticalCardBank = getVerticalCardComponents(
    children,
    VerticalCardBank
  );
  const verticalCardRate = getVerticalCardComponents(
    children,
    VerticalCardRate
  );

  return (
    <div className="py-7 px-6 rounded-[20px] w-fit bg-[#F9F9FB] grid gap-y-6">
      <div className="flex items-center gap-2">
        {verticalCardRank && <div>{verticalCardRank}</div>}
        {verticalCardBadge && <div>{verticalCardBadge}</div>}
      </div>

      <div>
        {verticalCardBank && <div>{verticalCardBank}</div>}
        {verticalCardRate && <div>{verticalCardRate}</div>}
      </div>
    </div>
  );
}

export default VerticalCardContainer;
