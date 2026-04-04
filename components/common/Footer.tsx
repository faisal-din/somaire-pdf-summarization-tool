'use client';

import { FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='relative mt-auto border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950'>
      <div className='max-w-5xl mx-auto px-6 sm:px-10 py-6 '>
        {/* Top row */}
        <div className='flex items-center justify-between gap-6'>
          {/* Brand */}
          <Link
            href='/'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='group flex items-center gap-2 shrink-0'
          >
            <FileText className='w-4 h-4 text-gray-800 dark:text-gray-200 group-hover:rotate-12 transition-transform duration-200 ease-in-out' />
            <span className='font-extrabold text-sm tracking-tight text-gray-900 dark:text-white'>
              Sommaire
            </span>
          </Link>

          {/* Social links */}
          <div className='flex items-center gap-3'>
            <a
              href='https://github.com/faisal-din'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='GitHub'
              className='w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200'
            >
              <FaGithub size={16} />
            </a>
            <a
              href='https://www.linkedin.com/in/faisal-din56/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
              className='w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-200'
            >
              <FaLinkedin size={16} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className='my-4 border-t  border-gray-300 dark:border-gray-800' />

        {/* Bottom row */}
        <div className='flex items-center justify-center text-sm text-gray-500 dark:text-gray-600'>
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <a
              href='https://faisaluldin.vercel.app'
              target='_blank'
              rel='noopener noreferrer'
              className='font-medium text-rose-600 dark:text-gray-300 hover:text-rose-800 dark:hover:text-white underline underline-offset-2 decoration-dotted hover:decoration-solid transition-colors duration-200'
            >
              Faisal Ul Din
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
