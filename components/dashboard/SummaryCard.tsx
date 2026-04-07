import Link from 'next/link';
import { Card } from '../ui/card';
import DeleteButton from './DeleteButton';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => {
  return (
    <div className='flex items-start gap-2 sm:gap-4'>
      <FileText className='w-6 h-6 sm:w-8 sm:h-8  text-rose-500 ml-1' />
      <div className='flex-1 min-w-0'>
        <h3 className='text-base xl:text-lg font-semibold text-gray-900'>
          {title}
        </h3>
        <p className='text-sm text-gray-500'>{createdAt}</p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusColors: Record<string, string> = {
    completed: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={cn(
        'px-3 py-1  text-xs font-medium rounded-full capitalize',
        status === 'completed'
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800'
      )}
    >
      {status}
    </span>
  );
};

const SummaryCard = ({ summary }: { summary: any }) => {
  return (
    <div>
      <Card className='relative h-full'>
        <div className='absolute top-2 right-2'>
          <DeleteButton />
        </div>

        <Link href={`summaries/${summary.id}`} className='block p-4 sm:p-6'>
          <div className='flex flex-col gap-3 sm:gap-4'>
            <SummaryHeader
              fileUrl={summary.original_file_url}
              title={summary.title}
              createdAt={summary.created_at}
            />
            <p className='text-gray-600 line-clamp-2 text-sm sm:text-base pl-2'>
              {summary.summary_text}
            </p>

            <div className='flex justify-between items-center mt-2 sm:mt-4'>
              <StatusBadge status={summary.status} />
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default SummaryCard;
