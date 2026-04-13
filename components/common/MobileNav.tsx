'use client';

import { useState } from 'react';
import { FileText, Menu } from 'lucide-react';
import NavLink from './NavLink';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const MobileNav = ({
  planBadge,
  userButton,
}: {
  planBadge?: React.ReactNode;
  userButton?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeSheet = () => setIsOpen(false);

  return (
    <div className='flex lg:hidden items-center gap-3'>
      {/* Avatar visible at all times on mobile */}
      {userButton}

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon' aria-label='Open menu'>
            <Menu className='w-6 h-6 text-gray-900' />
          </Button>
        </SheetTrigger>

        <SheetContent side='right' className='w-72 px-6 py-8'>
          <div className='mb-8'>
            <NavLink
              href='/'
              className='flex items-center gap-2'
              onClick={closeSheet}
            >
              <FileText className='w-6 h-6 text-gray-900' />
              <span className='font-extrabold text-lg text-gray-900'>
                Sommaire
              </span>
            </NavLink>
          </div>

          <div className='flex flex-col gap-6'>
            <NavLink
              href='/#pricing'
              onClick={closeSheet}
              className='text-base font-medium text-gray-600 hover:text-rose-500 transition-colors duration-200'
            >
              Pricing
            </NavLink>

            <NavLink
              href='/dashboard'
              onClick={closeSheet}
              className='text-base font-medium text-gray-900 hover:text-rose-500 transition-colors duration-200'
            >
              Your Summaries
            </NavLink>

            <NavLink
              href='/upload'
              onClick={closeSheet}
              className='text-base font-medium text-gray-600 hover:text-rose-500 transition-colors duration-200'
            >
              Upload a PDF
            </NavLink>

            {/* Rendered by the server, passed down as a prop */}
            {planBadge}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
