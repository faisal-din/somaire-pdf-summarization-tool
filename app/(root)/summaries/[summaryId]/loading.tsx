import BgGradient from '@/components/common/BgGradient';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingSkelaton from '@/components/upload/LoadingSkelaton';
import { FileText } from 'lucide-react';

const HeaderSkeleton = () => {
  return (
    <div className='animate-pulse flex flex-col gap-3 mb-6'>
      {/* Title */}
      <Skeleton className='h-9 w-2/3 rounded-lg' />
      {/* Created at + reading time row */}
      <div className='flex items-center gap-4'>
        <Skeleton className='h-4 w-32 rounded-md' />
        <Skeleton className='h-4 w-24 rounded-md' />
      </div>
    </div>
  );
};

const SourceInfoSkeleton = () => {
  return (
    <div className='animate-pulse flex items-center gap-3 mb-4'>
      <Skeleton className='h-8 w-8 rounded-full' />
      <Skeleton className='h-4 w-48 rounded-md' />
      <Skeleton className='h-4 w-24 rounded-md ml-auto' />
    </div>
  );
};

const LoadingSummaryPage = () => {
  return (
    <div
      className='relative isolate min-h-screen bg-gradient-to-b from-rose-50/40 to-white'
      role='status'
      aria-label='Loading summary…'
      aria-busy='true'
    >
      <BgGradient className='from-rose-400 via-rose-200 to-orange-200' />

      <div className='container mx-auto'>
        <div className='px-1.5 py-6 sm:px-6 sm:py-12 lg:px-8 lg:py-24'>
          <div className='flex flex-col gap-4'>
            <HeaderSkeleton />

            <SourceInfoSkeleton />

            {/* Mirrors the card MotionDiv wrapping <SummaryViewer /> */}
            <div className='relative mx-auto mt-4 max-w-4xl w-full sm:mt-8 lg:mt-16'>
              <div className='relative rounded-2xl border border-rose-100/30 bg-white/80 shadow-xl backdrop-blur-md sm:rounded-3xl p-2 sm:p-6 lg:p-8'>
                {/* Gradient overlay — matches page.tsx */}
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 sm:rounded-3xl' />

                {/* Word count badge — skeleton version */}
                <div className='absolute right-2 top-2 flex items-center gap-1.5 rounded-full bg-white/90 px-2 py-1 shadow-sm sm:right-4 sm:top-4 sm:px-3 sm:py-1.5'>
                  <FileText className='h-3 w-3 text-rose-400 sm:h-4 sm:w-4' />
                  <Skeleton className='h-3 w-16 rounded-md' />
                </div>

                {/* Mirrors <SummaryViewer /> */}
                <div className='relative'>
                  <LoadingSkelaton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSummaryPage;
