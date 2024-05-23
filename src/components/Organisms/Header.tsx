"use client";

import { cx } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../Atom/Icon";

function Header() {
  const pathName = usePathname();

  return (
    <header className="sticky top-0 z-20">
      <div className="bg-white flex items-center justify-center px-6 h-[72px] gap-x-[120px]">
        <Icon name="Logo" />

        <div className="flex items-center gap-x-[72px]">
          <Link
            href="/list/deposit"
            className={cx(
              "font-semibold text-lg",
              pathName.includes("list")
                ? "border-b-2 border-gray-950 text-gray-950"
                : "text-[#505050]"
            )}
          >
            예적금
          </Link>
          <Link
            href="/"
            className={cx(
              " font-semibold text-lg",
              pathName === "/"
                ? "border-b-2 border-gray-950 text-gray-950"
                : "text-[#505050]"
            )}
          >
            예적금 찾기
          </Link>
          <Link
            href="/signIn"
            className={cx(
              " font-semibold text-lg",
              pathName === "/"
                ? "border-b-2 border-gray-950 text-gray-950"
                : "text-[#505050]"
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
