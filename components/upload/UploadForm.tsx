'use client';

import { fileUploadSchema } from '@/constants/schema';
import UploadFormInput from './UploadFormInput';
import { toast } from 'sonner';

const UploadForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success('File uploaded successfully.', {
      style: {
        backgroundColor: '#34d399',
        color: '#fff',
      },
    });

    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;

    // validate the fields using zod
    const validatedFile = fileUploadSchema.safeParse({ file });
    console.log('Validated File: ', validatedFile);

    if (!validatedFile.success) {
      // schema validation with zod
      toast.error(
        validatedFile.error.flatten().fieldErrors.file?.[0] || 'Invalid file.',
        {
          description: 'Please upload a valid PDF file.',
          style: {
            backgroundColor: '#f87171',
            color: '#fff',
          },
        }
      );
      return;
    }

    // upload the file to the uploadthing
    // parse the pdf using langchain
    // summarize the content using AI
    // save the summary to the database
    // redirect to the summary page

    if (file.type !== 'application/pdf') {
      toast.warning('Please upload a valid PDF file.', {
        description: 'Only PDF files are allowed.',
        style: {
          backgroundColor: '#fbbf24',
          color: '#fff',
        },
      });
      return;
    }
  };

  return (
    <div className='flex flex-col gap-8 w-full max-w-2xl mx-auto'>
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
