import React from 'react';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

const LoadingSkelaton = () => {
  return (
    <Card className='relative px-2 h-[700px] w-[600px] max-w-lg mx-auto overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10'>
      {/* Loading Progress Bar */}
      <div className='absolute top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-xs pt-4 pb-2 border-b border-rose-500/10'>
        <div className='px-4 flex gap-1.5'>
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className='h-1.5 flex-1 bg-rose-500/20 rounded-full overflow-hidden '
            >
              <div
                className={cn(
                  'h-full bg-linear-to-r from-gray-500 to-rose-500 animate-pulse ',
                  index === 0 ? 'w-full' : 'w-0'
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton Content */}
      <div className='w-full overflow-y-auto scrollbar-hide  pt-16 pb-24'>
        <div className='px-4 '>
          {/* Loading title */}
          <div className='sticky top-0 z-10 mb-6 flex flex-col gap-2 bg-background/80 py-4 backdrop-blur-sm'>
            <Skeleton className='h-8 w-3/4 mx-auto bg-rose-500/10' />
          </div>

          {/* Loading content */}
          <div className='space-y-4'>
            {[1, 2, 3].map((_, index) => (
              <div
                key={`numbered-${index}`}
                className='group relative flex flex-col sm:flex-row gap-4 bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-3 transition-all shadow-sm rounded-2xl border border-gray-500/10'
              >
                <div className='relative flex items-center gap-4'>
                  <Skeleton className='h-8 w-8 bg-rose-500/10 rounded-full' />
                </div>
                <div className='flex-1'>
                  <Skeleton className=' h-6 w-full bg-rose-500/10' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* loading navigation */}
      <div className='absolute bottom-0 left-0 right-0 border-t p-4 border-rose-500/10 bg-background/80 backdrop-blur-xs'>
        <div className='flex justify-between items-center'>
          <Skeleton className='h-10 w-10 rounded-full border  bg-linear-to-br from-rose-500/50 to-rose-600/50' />

          <div className='flex gap-2'>
            {[1, 2, 3].map((_, index) => (
              <Skeleton
                key={`dot-${index}`}
                className='rounded-full h-2 w-2 bg-rose-500/20'
              />
            ))}
          </div>
          <Skeleton className='h-10 w-10 rounded-full border  bg-linear-to-br from-rose-500/50 to-rose-600/50' />
        </div>
      </div>
    </Card>
  );
};

export default LoadingSkelaton;
