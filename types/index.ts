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

export type UploadResponse = {
  serverData: {
    userId: string;
    file: { url: string; name: string };
  };
}[];

export interface StorePdfSummaryParams {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}
