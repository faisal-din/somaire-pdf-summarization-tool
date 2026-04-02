import React from 'react';

const Footer = () => {
  return (
    <footer className='container'>
      <div className='  text-sm text-gray-500'>
        &copy; {new Date().getFullYear()} Sommaire. All rights reserved.
      </div>

      <div>
        <a
          href='https://github.com/sommaire/sommaire'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
