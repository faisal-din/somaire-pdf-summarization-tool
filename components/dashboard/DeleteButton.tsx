'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Loader2, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useState, useTransition } from 'react';
import { deleteSummaryAction } from '@/actions/summary.action';
import { toast } from 'sonner';
import { TOAST_STYLES } from '@/constants';

interface DeleteBtnProps {
  summaryId: string;
}

const DeleteButton = ({ summaryId }: DeleteBtnProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    try {
      startTransition(async () => {
        const result = await deleteSummaryAction(summaryId);

        if (!result.success) {
          toast.error('Error', {
            description: 'Failed to delete summary.',
            style: TOAST_STYLES.error,
          });
        }
        setOpen(false);
      });
    } catch (error) {
      console.error('Error deleting summary:', error);
      toast.error('Error', {
        description:
          error instanceof Error
            ? error.message
            : 'Error occurred while deleting the summary.',
        style: TOAST_STYLES.error,
      });
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='text-gray-400 bg-gray-100 border-gray-300 hover:text-rose-600 hover:bg-rose-200 cursor-pointer transition-colors duration-200 rounded-md'
          >
            <Trash2 className='w-4 h-4' />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Summary</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to delete this
              summary?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className='flex justify-end gap-2'>
              <Button
                onClick={() => setOpen(false)}
                className='text-gray-400 bg-gray-100 border-gray-300 hover:text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors duration-200 rounded-md'
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isPending}
                className='bg-gray-900 hover:bg-gray-600 text-white cursor-pointer transition-colors duration-200 rounded-md'
              >
                {isPending ? (
                  <>
                    <Loader2 className='w-4 h-4 animate-spin' />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteButton;
