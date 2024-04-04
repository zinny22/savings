"use client";

import Link from "next/link";
import Icon from "../Atom/Icon";
import { usePathname } from "next/navigation";
import { cx } from "class-variance-authority";

function Header() {
  const pathName = usePathname();

  return (
    <header className="sticky top-0 z-20">
      <div className="bg-white flex items-center justify-between px-5 py-2.5 pb-10">
        <h1 className="text-3xl font-extrabold">핀치</h1>

        <div className="flex items-center gap-x-4">
          <Icon name="Search" width={20} height={20} />
          <Icon name="Menu" width={20} height={20} />
        </div>
      </div>

      <section className="w-full flex justify-center bg-white">
        <div className="w-[568px] flex px-5 justify-between">
          <Link
            href="/"
            className={cx(
              " font-extrabold text-lg",
              pathName === "/"
                ? "border-b-2 border-gray-950 text-gray-950"
                : "text-gray-500"
            )}
          >
            홈
          </Link>
          <Link
            href="/list/deposit"
            className={cx(
              " font-extrabold text-lg",
              pathName.includes("list")
                ? "border-b-2 border-gray-950 text-gray-950"
                : "text-gray-500"
            )}
          >
            예적금
          </Link>
          <Link
            href="/"
            className={cx(
              " font-extrabold text-lg",
              pathName.includes("parking")
                ? "border-b-2 border-gray-950 text-gray-950"
                : "text-gray-500"
            )}
          >
            대출
          </Link>
          <Link
            href="/me"
            className={cx(
              " font-extrabold text-lg",
              pathName.includes("me")
                ? "border-b-2 border-gray-950 text-gray-950"
                : "text-gray-500"
            )}
          >
            마이페이지
          </Link>
        </div>
      </section>
    </header>
  );
}

export default Header;
