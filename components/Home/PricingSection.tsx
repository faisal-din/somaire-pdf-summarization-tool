import PricingCard from '../common/PricingCard';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$9.99',
    description: 'For professionals and teams',
    items: [
      '5 PDF summaries per month',
      'Standard processing speed',
      'Email support',
    ],
    paymentLink: '',
    priceId: '',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19.99',
    description: 'For professionals and teams',
    items: [
      'Unlimited PDF summaries',
      'Priority processing',
      '24/7 priority support',
      'Markdown Export',
    ],
    paymentLink: '',
    priceId: '',
  },
];

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
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
