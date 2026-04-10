import { Button } from '../ui/button';
import Link from 'next/link';
import { Calendar, ChevronLeft, ClockIcon, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';

interface SummaryHeaderProps {
  title: string;
  createdAt: string;
  readingTime?: number;
}

const SummaryHeader = ({
  title,
  createdAt,
  readingTime,
}: SummaryHeaderProps) => {
  return (
    <div className='mb-6 space-y-5'>
      {/* Top row: meta badges + back button */}
      <div className='flex items-start justify-between gap-4'>
        <div className='flex flex-wrap items-center gap-3'>
          <Badge
            variant='secondary'
            className='flex items-center gap-1.5 rounded-full bg-white/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur-xs transition-all duration-200 hover:bg-white/90 hover:shadow-md'
          >
            <Sparkles className='h-3.5 w-3.5 text-rose-500' />
            AI Summary
          </Badge>

          <div className='flex items-center gap-1 text-sm text-muted-foreground'>
            <Calendar className='h-3.5 w-3.5 text-rose-400' />
            <span>
              {new Date(createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          {readingTime !== undefined && (
            <div className='flex items-center gap-1 text-sm text-muted-foreground'>
              <ClockIcon className='h-3.5 w-3.5 text-rose-400' />
              <span>{readingTime} min read</span>
            </div>
          )}
        </div>

        {/* Back Button */}
        <Link href='/dashboard' className='shrink-0'>
          <Button
            variant='ghost'
            size='sm'
            className='group flex items-center gap-1.5 rounded-full border border-rose-100 bg-rose-50 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-xs transition-all duration-300 hover:bg-white/80 hover:shadow-md sm:px-4 sm:text-sm'
          >
            <ChevronLeft className='h-3.5 w-3.5 text-rose-400 transition-transform duration-300 group-hover:-translate-x-0.5' />
            Back
            <span className='hidden sm:inline'>to Dashboard</span>
          </Button>
        </Link>
      </div>

      {/* Title */}
      <h1 className='text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl'>
        <span className='bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent'>
          {title}
        </span>
      </h1>
    </div>
  );
};

export default SummaryHeader;
