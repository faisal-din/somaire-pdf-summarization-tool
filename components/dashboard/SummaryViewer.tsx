'use client';

import { useState } from 'react';
import { Card } from '../ui/card';
import NavigatationControls from './NavigatationControls';
import ProgressBar from './ProgressBar';
import { parseSection } from '@/utils/summary-helpers';
import ContentSection from './ContentSection';

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className='flex flex-col gap-2 mb-6 sticky top-0 bg-background/80 backdrop-blur-sm py-4 z-10'>
      <h2 className='text-3xl lg:text-4xl font-bold text-center flex items-center gap-2 justify-center'>
        {title}
      </h2>
    </div>
  );
};

const SummaryViewer = ({ summary }: { summary: string }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = summary
    .split('\n# ')
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const totalSections = sections.length;

  const handlePrev = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentSection((prev) => Math.min(prev + 1, totalSections - 1));
  };

  return (
    <Card className='relative px-2 h-[500px] sm:h-[600px]   w-full xl:w-[600px] overflow-hidden bg-linear-to-r from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10  '>
      <ProgressBar currentSection={currentSection} sections={sections} />
      <div className='h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24'>
        <div className='px-4 sm:px-6'>
          <SectionTitle title={sections[currentSection]?.title || ''} />
          <ul className='list-disc list-inside mt-4 space-y-2'>
            <ContentSection
              title={sections[currentSection]?.title || ''}
              points={sections[currentSection]?.points || []}
            />
          </ul>
        </div>
      </div>

      <NavigatationControls
        currentSection={currentSection}
        totalSections={totalSections}
        onPrev={handlePrev}
        onNext={handleNext}
        onSectionChange={setCurrentSection}
      />
    </Card>
  );
};

export default SummaryViewer;
