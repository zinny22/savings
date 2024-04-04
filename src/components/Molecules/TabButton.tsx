"use client";

import { cx } from "class-variance-authority";
import { useRouter } from "next/navigation";

export type TabKey = "saving" | "deposit" | "parking" | "cma";

interface TabButtonProps {
  lastPathName: TabKey;
}
function TabButton({ lastPathName }: TabButtonProps) {
  const router = useRouter();

  return (
    <div className="flex items-center bg-gray-200 w-fit px-1 py-1 rounded-3xl relative">
      <div
        className={cx(
          "absolute bg-white w-[80px] rounded-3xl h-[30px] transition-all duration-500",
          lastPathName === "saving"
            ? "translate-x-20"
            : lastPathName === "parking"
            ? "translate-x-40"
            : lastPathName === "cma"
            ? "translate-x-60"
            : "translate-x-0"
        )}
      />

      <button
        className={cx(
          "w-[80px] h-[31px] z-10 text-sm",
          lastPathName === "deposit" && "font-bold"
        )}
        onClick={() => router.push("/list/deposit")}
      >
        예금
      </button>
      <button
        className={cx(
          "w-[80px] h-[31px] z-10 text-sm",
          lastPathName === "saving" && "font-bold"
        )}
        onClick={() => router.push("/list/saving")}
      >
        적금
      </button>
      <button
        className={cx(
          "w-[80px] h-[31px] z-10 text-sm",
          lastPathName === "parking" && "font-bold"
        )}
        onClick={() => router.push("/list/parking")}
      >
        파킹
      </button>
      <button
        className={cx(
          "w-[80px] h-[31px] z-10 text-sm",
          lastPathName === "cma" && "font-bold"
        )}
        onClick={() => router.push("/list/cma")}
      >
        CMA
      </button>
    </div>
  );
}

export default TabButton;
