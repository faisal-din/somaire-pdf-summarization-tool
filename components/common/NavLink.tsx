'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const NavLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        'text-sm text-gray-600 hover:text-rose-500 transition-colors duration-200',
        className,
        isActive && 'text-rose-500 font-medium'
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
