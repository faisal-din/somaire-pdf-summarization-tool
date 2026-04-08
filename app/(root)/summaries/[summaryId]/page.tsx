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

  const reading_time = Math.ceil(word_count / 200); // Assuming an average reading speed of 200 words per minute

  return (
    <div className='relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white'>
      <BgGradient className='from-rose-400 via-rose-200 to-orange-200' />
      <div className='container mx-auto flex flex-col gap-4'>
        <div className='px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24'>
          <div className='flex flex-col'>
            <SummaryHeader
              title={title}
              createdAt={created_at}
              readingTime={reading_time}
            />
          </div>
          {file_name && (
            <SourceInfo
              title={title}
              fileName={file_name}
              summaryText={summary_text}
              originalFileUrl={original_file_url}
              createdAt={created_at}
            />
          )}
          {/* Summary Content */}
          <div className='relative mt-4 sm:mt-8 lg:mt-16'>
            <div className='relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl  hover:bg-white/90 max-w-4xl mx-auto'>
              <div className='absolute inset-0 bg-linear-to-brfrom-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3x1' />
              <div className='absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm'>
                <FileText className='h-3 w-3 sm:h-4 sm:w-4 text-rose-400' />
                {word_count?.toLocaleString()} words
              </div>

              {/* Summary Text */}
              <div className='relative mt-8 sm:mt-6 flex justify-center'>
                <SummaryViewer summary={summary.summary_text} />
              </div>
            </div>

            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
