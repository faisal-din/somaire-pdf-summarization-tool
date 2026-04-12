import { itemVariants } from '@/constants';
import { MotionDiv } from '../common/motionWrapper';
import { Badge } from '../ui/badge';
import { Sparkles } from 'lucide-react';

const UploadHeader = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-6 text-center '>
      <MotionDiv
        variants={itemVariants}
        className='relative p-[1.5px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group'
      >
        <Badge className='relative px-6 py-4 text-base font-medium bg-white rounded-full group-hover:bg-gray-100 transition-colors'>
          <Sparkles className='mr-2 h-6 w-6 text-rose-600 animate-pulse' />
          <p className='text-base text-rose-600'>AI Powered Content Creation</p>
        </Badge>
      </MotionDiv>
      <MotionDiv
        variants={itemVariants}
        className='capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'
      >
        Start Uploading {''}
        <span className='relative inline-block'>
          <span className='relative z-10 px-2'>Your PDF's</span>
          <span className='absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1'></span>
        </span>{' '}
      </MotionDiv>
      <MotionDiv
        variants={itemVariants}
        className='mt-2 text-lg leading-8 text-gray-600 max-w-2xl'
      >
        <p>Upload your PDF files and let our AI to do the magic.</p>
      </MotionDiv>
    </div>
  );
};

export default UploadHeader;
