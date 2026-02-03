import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { KpiGrid } from '@/components/dashboard/KpiGrid';
import { MapPreviewCard } from '@/components/dashboard/MapPreviewCard';
import { PriorityQueue } from '@/components/dashboard/PriorityQueue';
import { RecommendedActions } from '@/components/dashboard/RecommendedActions';
import { FeatureCardGrid } from '@/components/dashboard/FeatureCardGrid';

export default function DashboardPage() {
  return (
    <>
      <PageHeader 
        title="Current Situation" 
        subtitle="Real-time monitoring of healthcare access and facility load."
      >
        <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
        </Button>
      </PageHeader>

      <KpiGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2">
            <MapPreviewCard />
         </div>
         <div className="lg:col-span-1">
            <PriorityQueue />
         </div>
      </div>

      <RecommendedActions />

      <FeatureCardGrid />
    </>
  );
}
