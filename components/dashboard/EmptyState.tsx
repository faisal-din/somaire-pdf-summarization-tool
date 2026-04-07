import { Button } from '../ui/button';
import Link from 'next/link';
import { FileText, Plus } from 'lucide-react';
import { EmptyStateProps } from '@/types';

const EmptyState = ({
  title,
  description,
  buttonText,
  link,
}: EmptyStateProps) => {
  return (
    <div className='py-12 text-center'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <FileText className='w-12 h-12 text-gray-400' />
        <h2 className='text-2xl font-semibold text-gray-800'>{title}</h2>
        <p className='text-gray-600 text-base mt-2'>{description}</p>
        <Button variant='outline' className='mt-4'>
          <Link href={link} className='flex items-center text-gray-700'>
            <Plus className='w-5 h-5 mr-2' />
            {buttonText}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
