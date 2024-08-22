'use client';

import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { useState } from 'react';
import DepositCardList from './DepositCardList';
import SavingCardList from './SavingCardList';
import Toggle from '../Atom/Toggle/Toggle';

function Top4List() {
  const [filteredBanks, setFilteredBanks] = useState<string[]>([]);

  const [filter, setFilter] = useState<string>('예금');

  return (
    <div className="flex-1 p-8">
      <Toggle list={['예금', '적금', '파킹']} />
      <div className="flex justify-between items-center">
        <div className="flex gap-x-[30px] whitespace-nowrap">
          <p className="text-[20px] font-semibold pr-[10px]">금리 TOP4</p>
          <button
            className={cx(
              'text-[20px] font-semibold transition-colors duration-300',
              filter === '예금' ? 'text-[#141414]' : ' text-[#B9B9B9]'
            )}
            onClick={() => setFilter('예금')}
          >
            예금
          </button>
          <button
            className={cx(
              'text-[20px] font-semibold transition-colors duration-300',
              filter === '적금' ? 'text-[#141414]' : ' text-[#B9B9B9]'
            )}
            onClick={() => setFilter('적금')}
          >
            적금
          </button>
          <button
            className={cx(
              'text-[20px] font-semibold transition-colors duration-300',
              filter === '파킹' ? 'text-[#141414]' : ' text-[#B9B9B9]'
            )}
            onClick={() => setFilter('파킹')}
          >
            파킹
          </button>
        </div>
        <Link
          href={`/list/${filter === '예금' ? 'deposit' : 'saving'}`}
          className="text-[18px] font-medium whitespace-nowrap text-[#7F7F7F]"
        >
          {filter} 더보기
        </Link>
      </div>
      {filter === '예금' && (
        <DepositCardList filteredBanks={filteredBanks} sortedNumber={4} />
      )}

      {filter === '적금' && (
        <SavingCardList filteredBanks={filteredBanks} sortedNumber={4} />
      )}
    </div>
  );
}

export default Top4List;
