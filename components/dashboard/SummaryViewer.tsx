'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import NavigatationControls from './NavigatationControls';

const parseSection = (section: string) => {
  console.log({ section });
  const [title, ...content] = section.split('\n');

  const cleanTitle = title.replace(/^#+\s*/, '').trim(); // Remove leading '#' and whitespace

  const points: String[] = [];

  let currentPoint = '';

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('⭐')) {
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      currentPoint = trimmedLine; // Start a new point
    } else if (!trimmedLine) {
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      currentPoint = ''; // Reset for the next point
    } else {
      currentPoint += ' ' + trimmedLine; // Continue the current point
    }
  });

  if (currentPoint) {
    points.push(currentPoint.trim());
  }

  const filteredPoints = points.filter(
    (point) => point && !point.startsWith('#') && !point.startsWith('Choose')
  );

  return { title: cleanTitle, points: filteredPoints };
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
    <Card className='relative px-2 h-[500px] sm:h-[600px] lg:h-[700px]  w-full xl:w-[600px] overflow-hidden bg-linear-to-r from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10  '>
      <div className='h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24'>
        <div className='px-4 sm:px-6'>
          <h2>{sections[currentSection]?.title}</h2>
          <ul className='list-disc list-inside mt-4 space-y-2'>
            {sections[currentSection]?.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
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
