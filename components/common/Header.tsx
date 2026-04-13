import { FileText } from 'lucide-react';
import NavLink from './NavLink';
import { Show, UserButton } from '@clerk/nextjs';
import PlanBadge from './PlanBadge';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <nav className='container flex items-center justify-between py-4 lg:px-8 px-4 mx-auto'>
      {/* Logo — always visible */}
      <div className='flex lg:flex-1'>
        <NavLink href='/' className='flex items-center gap-1 lg:gap-2 shrink-0'>
          <FileText className='w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out' />
          <span className='font-extrabold lg:text-xl text-gray-900'>
            Sommaire
          </span>
        </NavLink>
      </div>

      {/* ── SIGNED OUT ─────────────────────────────────────────────── */}
      <Show when='signed-out'>
        {/* Center: Pricing */}
        <div className='flex items-center gap-4 lg:gap-12'>
          <NavLink
            href='/#pricing'
            className='transition-colors text-base font-medium duration-200 text-gray-600 hover:text-rose-500'
          >
            Pricing
          </NavLink>
        </div>

        {/* Right: Sign In */}
        <div className='flex justify-end lg:flex-1 items-center'>
          <NavLink
            href='/sign-in'
            className='transition-colors text-base font-medium duration-200 text-gray-600 hover:text-rose-500'
          >
            Sign In
          </NavLink>
        </div>
      </Show>

      {/* ── SIGNED IN — Desktop only center nav ────────────────────── */}
      <Show when='signed-in'>
        <div className='hidden lg:flex justify-center gap-12 items-center'>
          <NavLink
            href='/#pricing'
            className='transition-colors text-base font-medium duration-200 text-gray-600 hover:text-rose-500'
          >
            Pricing
          </NavLink>
          <NavLink href='/dashboard' className='text-base font-medium'>
            Your Summaries
          </NavLink>
        </div>

        {/* Right: Desktop actions */}
        <div className='hidden lg:flex justify-end lg:flex-1 items-center gap-4'>
          <NavLink
            href='/upload'
            className='transition-colors text-base font-medium duration-200 text-gray-600 hover:text-rose-500'
          >
            Upload a PDF
          </NavLink>
          <PlanBadge />
          <UserButton />
        </div>

        {/* Right: Mobile — UserButton + Hamburger only */}
        <MobileNav planBadge={<PlanBadge />} userButton={<UserButton />} />
      </Show>
    </nav>
  );
};

export default Header;
