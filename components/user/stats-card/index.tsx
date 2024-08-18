'use client'

import React from 'react';
import { formatHoursToHM } from '@/lib/utils/date-utils';
import { Card } from '../../ui/card';

interface StatsCardProps {
  value: string | number;
  label: string;
  formatHours?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ value, label, formatHours = false }) => {
  return (
    <Card>
      <div className="flex flex-col">
        <span className="font-semibold text-lg">
          {formatHours ? formatHoursToHM(Number(value)) : value}
        </span>
        <span className="text-xs">{label}</span>
      </div>
    </Card>
  );
};

export default StatsCard;
