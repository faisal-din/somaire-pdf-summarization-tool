import React from 'react';
import { Button } from '../ui/button';
import { Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { link } from 'fs';
import Link from 'next/link';
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
  MotionSpan,
} from '../common/motionWrapper';
import { buttonVariants, containerVariants, itemVariants } from '@/constants';

const Hero = () => {
  return (
    <MotionSection
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in px-2 lg:px-12 max-w-7xl'
    >
      <MotionDiv
        variants={itemVariants}
        className='relative p-[1.5px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group'
      >
        <Badge
          variant='secondary'
          className='relative px-6 py-4 text-base font-medium bg-white rounded-full group-hover:bg-rose-100 transition-colors duration-200'
        >
          <Sparkles className='w-6 h-6 text-rose-500 animate-pulse ' />
          <p className='text-base text-rose-600'>Powered by AI</p>
        </Badge>
      </MotionDiv>

      <MotionH1 variants={itemVariants} className='font-bold py-6 text-center'>
        Transform PDFs into{' '}
        <span className='relative inline-block'>
          <MotionSpan
            whileHover={buttonVariants}
            className='relative z-10 px-2'
          >
            concise
          </MotionSpan>
          <span className='absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1'></span>
        </span>{' '}
        summaries
      </MotionH1>
      <MotionH2
        variants={itemVariants}
        className='text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600'
      >
        Get a beautiful summary reel of the document in seconds.
      </MotionH2>

      <MotionDiv variants={itemVariants} whileHover={buttonVariants}>
        <Button
          variant='link'
          className='text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300'
        >
          <Link href='/#pricing'>Try Sommaire</Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  );
};

export default Hero;
