import Link from "next/link";
import Icon from "../Atom/Icon";

function Header() {
  return (
    <header>
      <div className="bg-white flex items-center justify-between px-5 py-2.5">
        <h1>핀치</h1>

        <div className="flex items-center gap-x-4">
          <Icon name="Search" width={20} height={20} />
          <Icon name="Menu" width={20} height={20} />
        </div>
      </div>
      <section className="w-full flex justify-center">
        <div className="w-[568px] flex px-5 justify-between">
          <Link href="/">홈</Link>
          <Link href="/list/deposit">예적금</Link>
          <Link href="/">대출</Link>
          <Link href="/list/deposit">me</Link>
        </div>
      </section>
    </header>
  );
}

export default Header;
