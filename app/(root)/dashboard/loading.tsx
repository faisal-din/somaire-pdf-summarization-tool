import BgGradient from '@/components/common/BgGradient';
import { MotionDiv } from '@/components/common/motionWrapper';
import { Skeleton } from '@/components/ui/skeleton';
import { itemVariants } from '@/constants';

function HeaderSkeleton() {
  return (
    <div className='flex justify-between gap-4 mb-8'>
      <div className='flex flex-col gap-2'>
        <MotionDiv
          variants={itemVariants}
          initial='hidden'
          whileInView='visible'
          className='text-4xl font-bold tracking-tight bg-linear-to-r from-gray-500 to-gray-900  bg-clip-text text-transparent'
        >
          <Skeleton className='h-12 w-64 rounded-lg' />
        </MotionDiv>
        <MotionDiv
          variants={itemVariants}
          initial='hidden'
          animate='visible'
          className='text-gray-600'
        >
          <Skeleton className='h-6 w-96 rounded-lg' />
        </MotionDiv>
      </div>
    </div>
  );
}

function SummaryCardSkeleton() {
  return (
    <MotionDiv
      variants={itemVariants}
      initial='hidden'
      animate='visible'
      className='rounded-lg border bg-card  text-card-foreground shadow-sm'
    >
      <Skeleton className='h-48 w-full rounded-lg' />
    </MotionDiv>
  );
}
function LoadingSummaries() {
  return (
    <div className='min-h-screen relative' aria-label='loading summaries'>
      <BgGradient className='from-emerald-200 via-teal-200  to-cyan-200' />
      <section className='container px-10 py-24 mx-auto flex flex-col gap-4'>
        <HeaderSkeleton />

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 sm:px-0'>
          {Array.from({ length: 3 }).map((_, index) => (
            <SummaryCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default LoadingSummaries;
