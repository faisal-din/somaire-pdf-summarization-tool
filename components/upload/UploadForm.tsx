'use client';

import { fileUploadSchema } from '@/constants/schema';
import UploadFormInput from './UploadFormInput';
import { toast } from 'sonner';
import { useUploadThing } from '@/utils/uploadthing';

const UploadForm = () => {
  const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {
      toast.success('File uploaded successfully!', {
        style: {
          backgroundColor: '#34d399',
          color: '#fff',
        },
      });
    },
    onUploadError: (error) => {
      toast.error('Error occurred while uploading.', {
        style: {
          backgroundColor: '#f87171',
          color: '#fff',
        },
      });
      console.log('Error occured while uploading file: ', error);
    },
    onUploadBegin: ({ file }) => {
      console.log('upload has begun for', file);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('File uploaded successfully.');

    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;

    // validate the fields using zod
    const validatedFile = fileUploadSchema.safeParse({ file });
    console.log('Validated File: ', validatedFile);

    if (!validatedFile.success) {
      // schema validation with zod
      toast.error('Something went wrong', {
        description:
          validatedFile.error.flatten().fieldErrors.file?.[0] ||
          'Invalid file.',
        style: {
          backgroundColor: '#f87171',
          color: '#fff',
        },
      });
      return;
    }

    toast('Uploading file...', {
      description:
        'Uploading your file to our servers. This may take a moment.',
    });

    // upload the file to the uploadthing
    const uploadResponse = startUpload([file]);

    console.log(
      'Upload Response: ',
      uploadResponse.then((res) => console.log('Upload Response: ', res))
    );

    if (!uploadResponse) {
      toast.error('Something went wrong.', {
        description: 'Failed to upload the file. Please use different file.',
        style: {
          backgroundColor: '#f87171',
          color: '#fff',
        },
      });
      return;
    }

    // toast('Processing file...', {
    //   description: 'Hang tight! Our AI is reading through your document.',
    // });
    // parse the pdf using langchain
    // summarize the content using AI
    // save the summary to the database
    // redirect to the summary page
  };

  return (
    <div className='flex flex-col gap-8 w-full max-w-2xl mx-auto'>
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
