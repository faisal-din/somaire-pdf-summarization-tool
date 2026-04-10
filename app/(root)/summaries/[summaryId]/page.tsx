import { getSummaryByIdAction } from '@/actions/summary.action';
import BgGradient from '@/components/common/BgGradient';
import EmptyState from '@/components/dashboard/EmptyState';
import SourceInfo from '@/components/dashboard/SourceInfo';
import SummaryHeader from '@/components/dashboard/SummaryHeader';
import SummaryViewer from '@/components/dashboard/SummaryViewer';
import { FileText } from 'lucide-react';

const SummaryPage = async (props: {
  params: Promise<{ summaryId: string }>;
}) => {
  const { summaryId } = await props.params;
  const summary = await getSummaryByIdAction(summaryId);

  if (!summary) {
    return (
      <EmptyState
        title='Summary Not Found'
        description='The summary you are looking for does not exist or has been removed.'
        buttonText='Back to Dashboard'
        link='/dashboard'
      />
    );
  }

  const {
    title,
    summary_text,
    file_name,
    word_count,
    original_file_url,
    created_at,
  } = summary;

  const readingTime = Math.ceil((word_count ?? 0) / 200);

  return (
    <div className='relative isolate min-h-screen bg-gradient-to-b from-rose-50/40 to-white'>
      <BgGradient className='from-rose-400 via-rose-200 to-orange-200' />

      <div className='container mx-auto'>
        <div className='px-1.5 py-6 sm:px-6 sm:py-12 lg:px-8 lg:py-24'>
          <SummaryHeader
            title={title}
            createdAt={created_at}
            readingTime={readingTime}
          />

          {file_name && (
            <SourceInfo
              title={title}
              fileName={file_name}
              summaryText={summary_text}
              originalFileUrl={original_file_url}
              createdAt={created_at}
            />
          )}

          <div className='relative mx-auto mt-4 max-w-4xl sm:mt-8 lg:mt-16'>
            <div className='relative rounded-2xl border border-rose-100/30 bg-white/80 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-white/90 hover:shadow-2xl sm:rounded-3xl p-2 sm:p-6 lg:p-8'>
              <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 sm:rounded-3xl' />

              {word_count != null && (
                <div className='absolute right-2 top-2 flex items-center gap-1.5 rounded-full bg-white/90 px-2 py-1 text-xs text-muted-foreground shadow-sm sm:right-4 sm:top-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm'>
                  <FileText className='h-3 w-3 text-rose-400 sm:h-4 sm:w-4' />
                  {word_count.toLocaleString()} words
                </div>
              )}

              <div className='relative mt-8 flex justify-center sm:mt-6'>
                <SummaryViewer summary={summary_text} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
