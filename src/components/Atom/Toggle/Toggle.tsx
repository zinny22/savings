import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';

interface ToggleProps {
  list: string[];
  setToggle: Dispatch<SetStateAction<string>>;
}

export default function Toggle({ list, setToggle }: ToggleProps) {
  const togglePaddingX = 8;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth - togglePaddingX);
    }
  }, [list.length]);

  const nextState = (index: number, value: string) => {
    setCurrentIndex(index);
    setToggle(value);
  };

  // 슬라이더가 이동할 수 있는 위치 계산
  const itemWidth = containerWidth / list.length;
  const translateX = currentIndex * itemWidth;

  return (
    <div
      className={`relative inline-flex items-center h-[58px] p-1 cursor-pointer bg-gray-200 w-72 rounded-[50px]`}
    >
      <span
        className="transform transition-transform duration-300 inline-block w-24 h-[48px] bg-[#112F68] rounded-full absolute top-1"
        style={{ transform: `translateX(${translateX}px)` }}
      />
      <div ref={containerRef} className="px-[38px] flex justify-between w-full">
        {list.map((item, index) => (
          <span
            key={item}
            onClick={() => nextState(index, item)}
            className={`font-bold flex z-40 transition-colors duration-300 ${
              currentIndex === index ? 'text-white' : 'text-[#62636C]'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
