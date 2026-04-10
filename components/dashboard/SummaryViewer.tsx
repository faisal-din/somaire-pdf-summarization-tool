'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '../ui/card';
import NavigationControls from './NavigationControls';
import ProgressBar from './ProgressBar';
import { parseSection } from '@/utils/summary-helpers';
import ContentSection from './ContentSection';

const SectionTitle = ({ title }: { title: string }) => (
  <div className='sticky top-0 z-10 mb-6 flex flex-col gap-2 bg-background/80 py-4 backdrop-blur-sm'>
    <h2 className='flex items-center justify-center gap-2 text-center text-xl sm:text-3xl font-bold lg:text-4xl'>
      {title}
    </h2>
  </div>
);

const SummaryViewer = ({ summary }: { summary: string }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sections = summary
    .split('\n# ')
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const totalSections = sections.length;
  const currentData = sections[currentSection];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  const handlePrev = () => setCurrentSection((prev) => Math.max(prev - 1, 0));

  const handleNext = () =>
    setCurrentSection((prev) => Math.min(prev + 1, totalSections - 1));

  return (
    <Card className='relative h-[500px] w-full overflow-hidden rounded-3xl border border-rose-500/10 bg-gradient-to-r from-background via-background/95 to-rose-500/5 px-2 shadow-2xl backdrop-blur-lg sm:h-[600px] xl:w-[600px]'>
      <ProgressBar currentSection={currentSection} sections={sections} />

      <div
        ref={scrollRef}
        className='h-full overflow-y-auto pb-20 pt-12 scrollbar-hide sm:pb-24 sm:pt-16'
      >
        <div className='px-2 sm:px-6'>
          <SectionTitle title={currentData?.title ?? ''} />
          <ContentSection
            title={currentData?.title ?? ''}
            points={currentData?.points ?? []}
          />
        </div>
      </div>

      <NavigationControls
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
