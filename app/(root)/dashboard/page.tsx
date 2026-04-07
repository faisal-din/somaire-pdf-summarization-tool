import BgGradient from '@/components/common/BgGradient';
import SummaryCard from '@/components/dashboard/SummaryCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';

const Dashboard = () => {
  const uploadLimit = 5; // Example limit for Basic plan

  const summaries = [
    {
      id: 1,
      title: 'Summary of AI Trends in 2026',
      description:
        'An overview of the latest advancements and trends in artificial intelligence for the year 2026, including key technologies, applications, and industry insights.',
      created_at: '2026-06-01',
      summary_text:
        'In 2026, AI continues to evolve rapidly with significant advancements in natural language processing, computer vision, and reinforcement learning. Key trends include the rise of generative AI models, increased adoption of AI in healthcare and finance, and ongoing discussions around ethical AI and regulation.',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Key Takeaways from the Latest Tech Conference',
      description:
        'A summary of the most important points and insights from the recent technology conference, covering new developments and industry trends.',
      created_at: '2026-06-01',
      summary_text:
        'The latest technology conference highlighted several key trends and innovations, including advancements in AI, cybersecurity, and sustainable tech solutions.',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Market Analysis of the E-commerce Industry',
      description:
        'An in-depth analysis of the current state and future prospects of the e-commerce market, including consumer behavior and competitive dynamics.',
      created_at: '2026-06-01',
      summary_text:
        'The e-commerce industry continues to evolve rapidly, driven by changing consumer preferences, technological advancements, and shifting competitive dynamics.',
      status: 'completed',
    },
    {
      id: 4,
      title: 'Summary of the Latest Research Paper on Machine Learning',
      description:
        'A detailed summary of the latest research findings in the field of machine learning, including methodologies, results, and implications.',
      created_at: '2026-06-01',
      summary_text:
        'Recent research in machine learning has focused on improving model interpretability, reducing bias, and enhancing generalization across different domains.',
      status: 'completed',
    },
    {
      id: 5,
      title: 'Insights from the Annual Financial Report',
      description:
        "A comprehensive overview of the key findings and takeaways from the company's annual financial report.",
      created_at: '2026-06-01',
      summary_text:
        'The company reported strong financial performance this year, with significant growth in revenue and profitability.',
      status: 'completed',
    },
  ];

  return (
    <main className='min-h-screen'>
      <BgGradient className='from-emerald-200 via-teal-200 to-cyan-200' />

      <div className='container mx-auto flex flex-col gap-4'>
        <div className='px-2 py-12 sm:py-24'>
          <div className='flex justify-between gap-4 mb-8'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-bold tracking-tight bg-linear-to-r from-gray-500 to-gray-900  bg-clip-text text-transparent'>
                Your Summaries
              </h1>
              <p className='text-gray-600'>
                Transform your PDFs into concise, actionable insights.
              </p>
            </div>

            <Button
              variant={'link'}
              className='bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 group hover:no-underline px-2 transition-all duration-300 rounded-md'
            >
              <Link href='/upload' className='flex items-center text-white'>
                <Plus className='w-5 h-5 mr-2' />
                New Summary
              </Link>
            </Button>
          </div>

          <div className='mb-6'>
            <div className='bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800'>
              <p className='text-sm'>
                You've reached the limit of {uploadLimit} uploads on the Basic
                plan.{' '}
                <Link
                  href='/#pricing'
                  className='font-medium text-rose-600 hover:text-rose-800  underline-offset-4 inline-flex items-center'
                >
                  Click here to upgrade to Pro{' '}
                  <ArrowRight className='w-4 h-4 inline-block ml-1' /> for
                  unlimited uploads.
                </Link>
              </p>
            </div>
          </div>

          {/* Summary card */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 sm:px-0'>
            {summaries.map((summary) => (
              <SummaryCard key={summary.id} summary={summary} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
