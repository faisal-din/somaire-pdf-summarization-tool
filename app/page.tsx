import BgGradient from '@/components/common/BgGradient';
import CTA from '@/components/Home/CTA';
import DemoSection from '@/components/Home/DemoSection';
import Hero from '@/components/Home/Hero';
import HowItWorks from '@/components/Home/HowItWorks';
import PricingSection from '@/components/Home/PricingSection';

export default function Home() {
  return (
    <div className='relative w-full'>
      <BgGradient />
      <div className='flex flex-col'>
        <Hero />
        <DemoSection />
        <HowItWorks />
        <PricingSection />
        <CTA />
      </div>
    </div>
  );
}
