'use client';

import React, { forwardRef } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    return (
      <form onSubmit={onSubmit} className='flex flex-col gap-6 '>
        <div className='flex justify-end items-center '>
          <Input
            id='file'
            type='file'
            name='file'
            accept='application/pdf'
            required
            className={cn(isLoading && 'cursor-not-allowed opacity-50')}
          />
          <Button
            type='submit'
            className='cursor-pointer bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className='animate-spin mr-2' size={16} />
                Uploading...
              </>
            ) : (
              'Upload your PDF'
            )}
          </Button>
        </div>
      </form>
    );
  }
);

export default UploadFormInput;
