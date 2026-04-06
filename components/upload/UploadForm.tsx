'use client';

import { fileUploadSchema } from '@/constants/schema';
import UploadFormInput from './UploadFormInput';
import { toast } from 'sonner';
import { useUploadThing } from '@/utils/uploadthing';
import { generatePDFSummary } from '@/actions/upload.action';
import { useRef, useState } from 'react';

// Toast bg-colors for success/error states
const TOAST_STYLES = {
  success: { backgroundColor: '#34d399', color: '#fff' },
  error: { backgroundColor: '#f87171', color: '#fff' },
} as const;

const UploadForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize UploadThing with lifecycle callbacks
  const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {
      toast.success('File uploaded successfully!', {
        style: TOAST_STYLES.success,
      });
    },
    onUploadError: (error) => {
      toast.error('Error occurred while uploading.', {
        style: TOAST_STYLES.error,
      });
      console.error('Upload error:', error);
    },
    onUploadBegin: ({ file }) => {
      console.log('Upload started for:', file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Extract file from form data
      const file = new FormData(e.currentTarget).get('file') as File;

      // Validate file against schema before uploading
      const validation = fileUploadSchema.safeParse({ file });
      if (!validation.success) {
        toast.error('Invalid file', {
          description:
            validation.error.flatten().fieldErrors.file?.[0] ??
            'Please upload a valid file.',
          style: TOAST_STYLES.error,
        });
        return;
      }

      toast('Uploading file...', {
        description:
          'Uploading your file to our servers. This may take a moment.',
      });

      // Upload file to the uploadthing
      const uploadResponse = await startUpload([file]);

      console.log('Upload Response: ', uploadResponse);

      if (!uploadResponse) {
        toast.error('Upload failed', {
          description:
            'Failed to upload the file. Please try a different file.',
          style: TOAST_STYLES.error,
        });
        return;
      }

      // Extract and summarize PDF content via server action
      const result = await generatePDFSummary(uploadResponse);

      console.log('result: ', result);

      const { data = null, message = null } = result || {};

      if (!data) {
        toast.error('Processing failed', {
          description: message ?? 'Failed to process the file.',
          style: TOAST_STYLES.error,
        });
        return;
      }

      toast.success('File processed successfully!', {
        style: TOAST_STYLES.success,
      });
      formRef.current?.reset();

      // TODO: save summary to DB and redirect to summary page

      // if (data.summary) {
      // save the summary to the database
      // }
    } catch (error) {
      console.error('Unexpected error in handleSubmit:', error);
      toast.error('Something went wrong', {
        description: 'An unexpected error occurred. Please try again.',
        style: TOAST_STYLES.error,
      });
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-8 w-full max-w-2xl mx-auto'>
      <UploadFormInput
        ref={formRef}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default UploadForm;
