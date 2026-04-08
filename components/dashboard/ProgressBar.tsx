import { cn } from '@/lib/utils';
import React from 'react';

const ProgressBar = ({
  sections,
  currentSection,
}: {
  sections: Array<{ title: string; points: string[] }>;
  currentSection: number;
}) => {
  return (
    <div className='absolute top-0 left-0 right-0 pt-4 pb-2 z-20 bg-background/80 backdrop-blur-xs    border-rose-500/10'>
      <div className='flex'>
        {sections.map((_, index) => (
          <div
            className='h-1.5 flex-1 rounded-full bg-rose-500/10 overflow-hidden'
            key={index}
          >
            <div
              className={cn(
                ' h-full mx-1 bg-linear-to-br from-gray-500 to-rose-600 transition-all duration-200',
                index === currentSection
                  ? 'w-full'
                  : currentSection > index
                    ? 'w-full opacity-30 '
                    : 'w-0'
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
