export type StepProps = {
  icon: React.ReactNode;
  label: string;
  description: string;
};

export type PricingCardProps = {
  id: string;
  name: string;
  price: string;
  description: string;
  items: string[];
  paymentLink: string;
  priceId: string;
};
