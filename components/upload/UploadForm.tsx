'use client';

import UploadFormInput from './UploadFormInput';

const UploadForm = () => {
  const handleSubmit = () => {
    // Handle file upload logic here
    console.log('File uploaded');
  };

  return (
    <div className='flex flex-col gap-8 w-full max-w-2xl mx-auto'>
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
