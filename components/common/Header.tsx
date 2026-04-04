import { FileText } from 'lucide-react';
import { Button } from '../ui/button';
import NavLink from './NavLink';

const Header = () => {
  const isSignedIn = false; // Replace with actual authentication logic

  return (
    <nav className='container flex items-center justify-between py-4 lg:px-8 px-4 mx-auto'>
      <div className='flex lg:flex-1'>
        <NavLink href='/' className='flex items-center gap-1 lg:gap-2 shrink-0'>
          <FileText className=' w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out' />
          <span className='font-extrabold text-base lg:text-xl text-gray-900'>
            Sommaire
          </span>
        </NavLink>
      </div>
      <div className='flex lg:justify-center gap-4 lg:gap-12 lg:items-center'>
        <NavLink
          href='/#pricing'
          className='transition-colors text-base font-medium duration-200 text-gray-600 hover:text-rose-500'
        >
          Pricing
        </NavLink>

        {isSignedIn && (
          <NavLink href='/dashboard' className='text-base font-medium'>
            Your Summaries
          </NavLink>
        )}
      </div>

      <div className='flex lg:justify-end lg:flex-1'>
        {isSignedIn ? (
          <div className='flex gap-2 items-center'>
            <NavLink
              href='/upload'
              className='transition-colors text-base font-medium duration-200 text-gray-600 hover:text-rose-500'
            >
              Upload a PDF
            </NavLink>
            <div>Pro</div>
            <Button>Sign Out</Button>
          </div>
        ) : (
          <div>
            <NavLink
              href='/sign-in'
              className='transition-colors text-base font-medium duration-200 text-gray-600 hover:text-rose-500'
            >
              Sign In
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
