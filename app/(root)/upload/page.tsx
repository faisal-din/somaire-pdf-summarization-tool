import BgGradient from '@/components/common/BgGradient';
import { MotionDiv } from '@/components/common/motionWrapper';
import UploadForm from '@/components/upload/UploadForm';
import UploadHeader from '@/components/upload/UploadHeader';
import { containerVariants } from '@/constants';
import { hasReachedUploadLimit } from '@/lib/user';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const UploadPDF = async () => {
  const user = await currentUser();

  const userId = user?.id;
  if (!userId) {
    return redirect('/sign-in');
  }

  const { hasReachedLimit } = await hasReachedUploadLimit(userId);

  if (hasReachedLimit) redirect('/dashboard');

  return (
    <section className='min-h-screen  '>
      <BgGradient />
      <MotionDiv
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 '
      >
        <div className='flex flex-col items-center justify-center gap-6 text-center'>
          <UploadHeader />
          <UploadForm />
        </div>
      </MotionDiv>
    </section>
  );
};

export default UploadPDF;
