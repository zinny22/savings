interface VerticalCardBadgesProps {
  badges?: string[];
}
function VerticalCardBadges({ badges }: VerticalCardBadgesProps) {
  return (
    <ul className="flex items-center gap-x-2">
      {badges?.map((item) => (
        <li
          key={item}
          className="bg-white px-2 py-[3px] rounded text-[#62636C] font-medium text-sm"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default VerticalCardBadges;
