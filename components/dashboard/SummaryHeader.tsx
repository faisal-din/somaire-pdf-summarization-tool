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
    <div className='flex gap-4 mb-4 justify-between'>
      <div className='space-y-6'>
        <div className='flex flex-wrap items-center gap-4'>
          <Badge
            variant='secondary'
            className='relative px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-xs rounded-full hover:bg-white/90 transition-all duration-200 shadow-sm hover:shadow-md'
          >
            <Sparkles className='h-4 w-4 mr-1.5 text-rose-500' />
            AI Summary
          </Badge>
          <div className='flex items-center text-sm text-muted-foreground'>
            <Calendar className='h-4 w-4 text-rose-500  mr-1' />
            {new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
          <div className='flex items-center text-sm text-muted-foreground'>
            <ClockIcon className='h-4 w-4 text-rose-500  mr-1' />
            {readingTime} min read
          </div>
        </div>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight '>
          <span className='bg-linear-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent'>
            {title}
          </span>
        </h1>
      </div>

      <div className='self-start'>
        <Link href='/dashboard'>
          <Button
            variant='link'
            size='sm'
            className='group flex items-center gap-1 sm:gap-2 hover:bg-white/80 backdrop-blur-xs rounded-full transition-all duration-300 shadow-xs hover:shadow-md border border-rose-100/30 bg-rose-100 px-2 sm:px-3 hover:no-underline cursor-pointer'
          >
            <ChevronLeft className='h-3 w-3 sm:h-4 sm:w-4 text-rose-400 transition-transform group-hover:translate-x-0.5 duration-300' />
            <span className='text-xs sm:text-sm text-muted-foreground font-medium'>
              Back <span className='hidden sm:inline'>to Dashboard</span>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SummaryHeader;
