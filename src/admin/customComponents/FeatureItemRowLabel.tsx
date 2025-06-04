import React from 'react';

export interface RowLabelProps {
  data: { title?: string; [key: string]: any };
  index: number;
  // path?: string; // Often provided, but let's keep it simple based on current usage
}

const FeatureItemRowLabel: React.FC<RowLabelProps> = ({ data, index }) => {
  let label = `Feature Item ${String(index + 1).padStart(2, '0')}`;
  if (data && data.title && typeof data.title === 'string' && data.title.trim() !== '') {
    label = data.title;
  }
  return <span>{label}</span>;
};

export default FeatureItemRowLabel;
