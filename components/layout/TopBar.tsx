"use client"
import { navLinks } from '@/lib/constants';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import React, { useState } from 'react'
import { usePathname } from 'next/navigation';

function TopBar() {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
      <Image
        src="data:image/png;base64,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"
        alt="logo"
        width={90}
        height={30}
      />

      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-blue-1" : "text-grey-1"
            }`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="relative flex gap-4 items-center">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className="flex gap-4 text-body-medium"
              >
                {link.icon} <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
}

export default TopBar