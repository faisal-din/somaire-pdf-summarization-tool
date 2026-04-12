import { itemVariants, pricingPlans } from '@/constants';
import PricingCard from '../common/PricingCard';
import { MotionDiv, MotionSection } from '../common/motionWrapper';

const PricingSection = () => {
  return (
    <MotionSection
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-100px' }}
      id='pricing'
      className='relative overflow-hidden '
    >
      <div className='py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <MotionDiv
          variants={itemVariants}
          className='flex items-center justify-center w-full pb-12'
        >
          <h2 className='uppercase font-bold text-2xl lg:text-4xl mb-8 text-rose-500'>
            Pricing
          </h2>
        </MotionDiv>
        <div className='relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8'>
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

export default PricingSection;
