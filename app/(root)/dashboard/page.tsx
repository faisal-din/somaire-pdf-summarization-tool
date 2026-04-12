import BgGradient from '@/components/common/BgGradient';
import SummaryCard from '@/components/dashboard/SummaryCard';
import { Button } from '@/components/ui/button';
import { getSummariesAction } from '@/actions/summary.action';
import { currentUser } from '@clerk/nextjs/server';
import { ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import EmptyState from '@/components/dashboard/EmptyState';
import { hasReachedUploadLimit } from '@/lib/user';

const Dashboard = async () => {
  const user = await currentUser();

  const userId = user?.id;
  if (!userId) {
    return redirect('/sign-in');
  }

  const summaries = await getSummariesAction(userId);

  const { hasReachedLimit, uploadLimit } = await hasReachedUploadLimit(userId);

  return (
    <main className='min-h-screen'>
      <BgGradient className='from-emerald-200 via-teal-200 to-cyan-200' />

      <div className='container w-full sm:w-[40rem] md:w-[48rem] lg:w-[64rem] mx-auto flex flex-col gap-4'>
        <div className='px-2 py-12 sm:py-24'>
          <div className='flex justify-between gap-4 mb-8'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-bold tracking-tight bg-linear-to-r from-gray-500 to-gray-900  bg-clip-text text-transparent'>
                Your Summaries
              </h1>
              <p className='text-gray-600'>
                Transform your PDFs into concise, actionable insights.
              </p>
            </div>

            {!hasReachedLimit && (
              <Button
                variant={'link'}
                className='bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 group hover:no-underline px-2 transition-all duration-300 rounded-md'
              >
                <Link href='/upload' className='flex items-center text-white'>
                  <Plus className='w-5 h-5 mr-2' />
                  New Summary
                </Link>
              </Button>
            )}
          </div>

          {hasReachedLimit && (
            <div className='mb-6'>
              <div className='bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800'>
                <p className='text-sm'>
                  You've reached the limit of {uploadLimit} uploads on the Basic
                  plan.{' '}
                  <Link
                    href='/#pricing'
                    className='font-medium text-rose-600 hover:text-rose-800  underline-offset-4 inline-flex items-center'
                  >
                    Click here to upgrade to Pro{' '}
                    <ArrowRight className='w-4 h-4 inline-block ml-1' /> for
                    unlimited uploads.
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* Summary card */}
          {summaries.length === 0 ? (
            <EmptyState
              title='No Summaries Yet'
              description='Upload your first PDF to get started with AI-Powered summaries.'
              buttonText='Create your first summary'
              link='/upload'
            />
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 sm:px-0'>
              {summaries.map((summary) => (
                <SummaryCard key={summary.id} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
