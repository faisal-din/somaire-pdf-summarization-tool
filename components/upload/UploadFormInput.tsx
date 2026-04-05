'use client';

import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadFormInput = ({ onSubmit }: UploadFormInputProps) => {
  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-6 '>
      <div className='flex justify-end items-center '>
        <Input
          id='file'
          type='file'
          name='file'
          accept='application/pdf'
          required
          className=''
        />
        <Button
          type='submit'
          className='cursor-pointer bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300'
        >
          Upload your PDF
        </Button>
      </div>
    </form>
  );
};

export default UploadFormInput;
