"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-gray-300">
            My E-Commerce
          </Link>
        </div>

        <nav className="space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/favorites" className="hover:text-gray-300">
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
