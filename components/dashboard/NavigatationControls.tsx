import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavigatationControls = ({
  currentSection,
  totalSections,
  onPrev,
  onNext,
  onSectionChange,
}: {
  currentSection: number;
  totalSections: number;
  onPrev: () => void;
  onNext: () => void;
  onSectionChange: (sectionIndex: number) => void;
}) => {
  return (
    <div className='absolute bottom-0 left-8 right-0 p-4 bg-background/80 backdrop-blur-xs border-t-2 border-rose-500/10'>
      <div className='flex justify-between items-center'>
        <Button
          variant='ghost'
          size='icon'
          onClick={onPrev}
          disabled={currentSection === 0}
          className={cn(
            'rounded-full w-12 h-12 transition-all duration-200 bg-linear-to-br from-rose-500 to-rose-600 backdrop-blur-xs border border-rose-500/10 cursor-pointer',
            currentSection === 0 ? 'opacity-50' : 'hover:bg-rose-500/20'
          )}
        >
          <ChevronLeft className='h-6 w-6' />
        </Button>

        <div className='flex gap-2'>
          {Array.from({ length: totalSections }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSectionChange(index)}
              className={cn(
                'rounded-full w-2 h-2 transition-all duration-200 bg-linear-to-br from-rose-500 to-rose-600 backdrop-blur-xs border border-rose-500/10 cursor-pointer',
                index === currentSection
                  ? 'opacity-100'
                  : 'opacity-30 hover:opacity-80'
              )}
            />
          ))}
        </div>

        <Button
          variant='ghost'
          size='icon'
          onClick={onNext}
          disabled={currentSection === totalSections - 1}
          className={cn(
            'rounded-full w-12 h-12 transition-all duration-200 bg-linear-to-br from-rose-500 to-rose-600 backdrop-blur-xs border border-rose-500/10 cursor-pointer',
            currentSection === totalSections - 1
              ? 'opacity-50'
              : 'hover:bg-rose-500/20'
          )}
        >
          <ChevronRight className='h-6 w-6' />
        </Button>
      </div>
    </div>
  );
};

export default NavigatationControls;
