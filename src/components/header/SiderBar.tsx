import type { NextPage } from "next";
import Link from "next/link";

import { navItems } from "./nav-items";

interface Props {
  translate: string;
}

export const SiderBar: NextPage<Props> = ({ translate }) => {
  return (
    <div
      className={`${translate} sm:hidden top-0 right-0 w-screen bg-zinc-950  px-4 text-zinc-300 fixed h-full ease-in-out duration-300`}
    >
      <div className="flex flex-col space-y-3 justify-center items-center h-[80vh]">
        {navItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-xl py-2 px-3 text-zinc-300 hover:text-[#A57C3C] ease-in-out duration-300 "
          >
            {item.name}
          </Link>
        ))}
        <Link
          href="#"
          className="flex text-xl max-w-52 justify-center items-center py-2 
          px-3 w-full bg-[#A57C3C] text-[#ffffe9] uppercase rounded-md 
          hover:bg-[#7A551F] transition ease-in-out duration-300 "
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};
