'use client';

import Icon from '@/components/atom/Icon';
import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  isOnlyLogo?: boolean;
}

function Header({ isOnlyLogo }: HeaderProps) {
  const pathName = usePathname();

  if (isOnlyLogo) {
    return (
      <header className="sticky top-0 z-20 flex justify-center">
        <Link href="/" className="flex flex-col items-center">
          <p className="text-[#2972FF] text-base font-semibold">
            예적금 간단 비교
          </p>
          <Icon name="Logo" width={92} />
        </Link>
      </header>
    );
  }
  return (
    <header className="sticky top-0 z-20">
      <div className="bg-white flex items-center justify-center px-6 h-[72px] gap-x-[120px]">
        <Link href="/">
          <Icon name="Logo" />
        </Link>

        <div className="flex items-center gap-x-[72px]">
          <Link
            href="/list/deposit"
            className={cx(
              'font-medium text-lg ',
              pathName.includes('list')
                ? 'border-b-2 border-gray-950 text-gray-950'
                : 'text-[#505050]'
            )}
          >
            예적금
          </Link>
          <Link
            href="/"
            className={cx(
              ' font-medium text-lg',
              pathName.includes('find')
                ? 'border-b-2 border-gray-950 text-gray-950'
                : 'text-[#505050]'
            )}
          >
            예적금 찾기
          </Link>
          <Link
            href="/signIn"
            className={cx(
              ' font-medium text-lg',
              pathName.includes('signIn')
                ? 'border-b-2 border-gray-950 text-gray-950'
                : 'text-[#505050]'
            )}
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
