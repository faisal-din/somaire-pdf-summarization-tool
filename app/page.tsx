import BgGradient from '@/components/common/BgGradient';
import Hero from '@/components/Home/Hero';

export default function Home() {
  return (
    <div className='relative w-full'>
      <BgGradient />
      <div className='flex flex-col'>
        <Hero />
      </div>
    </div>
  );
}
