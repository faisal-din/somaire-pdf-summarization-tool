import { pricingPlans } from '@/constants';

import { currentUser } from '@clerk/nextjs/server';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { getPriceIdForActiveUser } from '@/lib/user';
import { Crown } from 'lucide-react';

const PlanBadge = async () => {
  const user = await currentUser();
  if (!user?.id) return null;

  const email = user.emailAddresses[0]?.emailAddress;

  let priceId: string | null = null;

  if (email) {
    priceId = await getPriceIdForActiveUser(email);
  }

  let planName = 'Buy a plan';

  const plan = pricingPlans.find((plan) => plan.priceId === priceId);

  console.log('planName :', planName);
  if (plan) {
    planName = plan.name;
  }

  return (
    <Badge
      className={cn(
        'ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-200 flex items-center flex-row gap-1 text-gray-800',
        !priceId && 'from-red-100 to-red-200 border-red-300'
      )}
    >
      <Crown
        className={cn(
          'w-3 h-3 mr-1 text-amber-600 ',
          !priceId && ' text-red-500'
        )}
      />
      {planName}
    </Badge>
  );
};

export default PlanBadge;
