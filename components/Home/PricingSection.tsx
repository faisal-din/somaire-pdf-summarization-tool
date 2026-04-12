import { pricingPlans } from '@/constants';
import PricingCard from '../common/PricingCard';

const PricingSection = () => {
  return (
    <section id='pricing' className='relative overflow-hidden '>
      <div className='py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-center w-full pb-12'>
          <h2 className='uppercase font-bold text-2xl lg:text-4xl mb-8 text-rose-500'>
            Pricing
          </h2>
        </div>
        <div className='relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8'>
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
