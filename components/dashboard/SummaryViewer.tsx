import React from 'react';

const SummaryViewer = ({ summaryText }: { summaryText: string }) => {
  return <div className='line-clamp-2'>{summaryText}</div>;
};

export default SummaryViewer;
