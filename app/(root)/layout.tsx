import UploadRequired from '@/components/common/UploadRequired';
import { getSubscriptionStatus, hasActivePlan } from '@/lib/user';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  if (!user) {
    return redirect('/sign-in');
  }

  const hasActiveSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress
  );

  if (!hasActiveSubscription) {
    return <UploadRequired />;
  }

  return <>{children}</>;
}
