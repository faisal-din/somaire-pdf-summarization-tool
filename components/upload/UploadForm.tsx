'use client';

import { fileUploadSchema } from '@/constants/schema';
import UploadFormInput from './UploadFormInput';
import { toast } from 'sonner';
import { useUploadThing } from '@/utils/uploadthing';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TOAST_STYLES } from '@/constants';
import LoadingSkelaton from './LoadingSkelaton';
import { formatFileNameAsTitle } from '@/utils/format-fileName';
import {
  generatePdfSummaryAction,
  generatePdfTextAction,
  savePdfSummaryAction,
} from '@/actions/upload.action';

const UploadForm = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize UploadThing with lifecycle callbacks
  const { startUpload } = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {
      toast.success('File uploaded!', { style: TOAST_STYLES.success });
    },
    onUploadError: (error) => {
      toast.error('Error occurred while uploading.', {
        style: TOAST_STYLES.error,
      });
      console.error('Error Occurred while uploading:', error);
    },
    onUploadBegin: (data) => {
      console.log('Upload started for:', data);
    },
  });

  const resetForm = () => formRef.current?.reset();

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

      toast.info('Uploading file...', {
        description:
          'Uploading your file to our servers. This may take a moment.',
        style: TOAST_STYLES.info,
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

      const uploadedFileUrl = uploadResponse?.[0]?.serverData?.file?.url;

      toast.info('Processing file...', {
        description: 'Hang tight! Our AI is reading through your document.',
        style: TOAST_STYLES.info,
      });

      let storeResult: any;

      const formattedFileName = formatFileNameAsTitle(file.name);

      const result = await generatePdfTextAction({
        fileUrl: uploadedFileUrl,
      });
      console.log('PDF Text Extraction Result: ', result);

      toast.info('Generating PDF summary...', {
        description: 'Hang tight! Our AI is reading through your document.',
        style: TOAST_STYLES.info,
      });

      const summaryResult = await generatePdfSummaryAction({
        pdfText: result?.data?.pdfText ?? '',
        fileName: formattedFileName,
      });
      console.log('PDF Summary Result: ', summaryResult);

      const { data = null, message = null } = summaryResult || {};
      if (!data) {
        toast.error('Generating summary failed', {
          description: message ?? 'Failed to process the file.',
          style: TOAST_STYLES.error,
        });
        return;
      }

      toast.info('Saving PDF summary...', {
        description: 'Hang tight! We are saving your PDF summary.',
        style: TOAST_STYLES.info,
      });

      if (data?.summary) {
        storeResult = await savePdfSummaryAction({
          summary: data.summary,
          fileUrl: uploadedFileUrl,
          title: formattedFileName,
          fileName: file.name,
        });

        toast.success('Summary generated!', {
          description:
            'Your PDF summary has been generated and saved successfully.',
          style: TOAST_STYLES.success,
        });

        resetForm();
        router.push(`/summaries/${storeResult.data.id}`);
      }
    } catch (error) {
      console.error('Unexpected error in handleSubmit:', error);
      toast.error('Something went wrong', {
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred. Please try again.',
        style: TOAST_STYLES.error,
      });
      resetForm();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-8 w-full max-w-2xl mx-auto mt-2'>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center' aria-hidden='true'>
          <div className='w-full border-t border-gray-300 dark:border-gray-800' />
        </div>

        <div className='relative flex justify-center '>
          <span className='px-3 bg-background dark:bg-gray-900 text-muted-foreground text-sm'>
            Upload your PDF to get started
          </span>
        </div>
      </div>

      <UploadFormInput
        ref={formRef}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {isLoading && (
        <>
          <div className='relative'>
            <div
              className='absolute inset-0 flex items-center '
              aria-hidden='true'
            >
              <div className='w-full border-t border-gray-300 dark:border-gray-800' />
            </div>

            <div className='relative flex justify-center '>
              <span className='px-3 bg-background dark:bg-gray-900 text-muted-foreground text-sm'>
                Processing your PDF, please wait...
              </span>
            </div>
          </div>

          <LoadingSkelaton />
        </>
      )}
    </div>
  );
};

export default UploadForm;
