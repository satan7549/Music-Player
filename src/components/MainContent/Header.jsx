// import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function Header() {
  return (
    <header className="flex  justify-between w-[90%] m-auto gap-2 items-center poppins-thin border border-yellow-500">
      <nav className="border border-white">
        <ul className="list-none p-0 flex justify-around gap-16 ">
          <li>Music</li>
          <li>Podcast</li>
          <li>Live</li>
          <li>Radio</li>
        </ul>
      </nav>

      <div className="relative w-[50%] flex  items-center border border-white">
        <input
          type="text"
          placeholder="Michael Jackson"
          className="p-2 pl-4 w-[100%] text-white bg-[#2C0000] pr-10 border-none rounded-full"
        />
        <AiOutlineSearch className="absolute right-3 text-[#FFFFFF]" />
      </div>
    </header>
  );
}

export default Header;
