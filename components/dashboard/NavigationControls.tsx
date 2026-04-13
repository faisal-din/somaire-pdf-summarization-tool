import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavigationControls = ({
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
  const isFirst = currentSection === 0;
  const isLast = currentSection === totalSections - 1;

  return (
    <div className='absolute bottom-0 left-0 right-0 border-t border-rose-500/10 bg-background/80 backdrop-blur-xs'>
      <div className='flex items-center justify-between px-4 py-3 sm:px-8 sm:py-4'>
        {/* Prev */}
        <Button
          variant='ghost'
          size='icon'
          onClick={onPrev}
          disabled={isFirst}
          aria-label='Previous section'
          className={cn(
            'h-10 w-10 rounded-full border border-rose-500/20 bg-linear-to-br from-rose-500 to-rose-600 text-white transition-all duration-200 sm:h-12 sm:w-12',
            isFirst
              ? 'cursor-not-allowed opacity-40'
              : 'cursor-pointer hover:from-rose-600 hover:to-rose-700 hover:shadow-md'
          )}
        >
          <ChevronLeft className='h-5 w-5 sm:h-6 sm:w-6' />
        </Button>

        {/* Dot indicators */}
        <div
          className='flex items-center gap-2'
          role='tablist'
          aria-label='Sections'
        >
          {Array.from({ length: totalSections }).map((_, index) => (
            <button
              key={index}
              role='tab'
              aria-selected={index === currentSection}
              aria-label={`Go to section ${index + 1}`}
              onClick={() => onSectionChange(index)}
              className={cn(
                'rounded-full bg-gradient-to-br from-rose-500 to-rose-600 transition-all duration-200',
                index === currentSection
                  ? 'h-2.5 w-2.5 opacity-100'
                  : 'h-2 w-2 cursor-pointer opacity-30 hover:opacity-70'
              )}
            />
          ))}
        </div>

        {/* Next */}
        <Button
          variant='ghost'
          size='icon'
          onClick={onNext}
          disabled={isLast}
          aria-label='Next section'
          className={cn(
            'h-10 w-10 rounded-full border border-rose-500/20 bg-gradient-to-br from-rose-500 to-rose-600 text-white transition-all duration-200 sm:h-12 sm:w-12',
            isLast
              ? 'cursor-not-allowed opacity-40'
              : 'cursor-pointer hover:from-rose-600 hover:to-rose-700 hover:shadow-md'
          )}
        >
          <ChevronRight className='h-5 w-5 sm:h-6 sm:w-6' />
        </Button>
      </div>
    </div>
  );
};

export default NavigationControls;
