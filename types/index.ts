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

export type UploadResponseProps = {
  serverData: {
    userId: string;
    file: { url: string; name: string };
  };
}[];

export interface SavePdfSummaryProps {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  link: string;
}
