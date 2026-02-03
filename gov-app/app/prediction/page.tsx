"use client";

import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { ForecastRiskChart } from '@/components/charts/ForecastRiskChart';

export default function PredictionPage() {
  const risks = [
      { facility: 'General Hospital', risk: 'High', days: '2 days', reason: 'Rising Dengue Cases' },
      { facility: 'Velachery Emergency', risk: 'Critical', days: '5 hours', reason: 'Bed Occupancy 98%' },
      { facility: 'Anna Nagar Clinic', risk: 'Low', days: '-', reason: 'Stable' },
  ];

  return (
    <div className="space-y-6">
       <PageHeader 
        title="Predictive Analytics" 
        subtitle="AI-driven forecasts for resource demand and occupancy."
      />

      <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
          <CardContent className="p-8 text-center sm:text-left sm:flex items-center justify-between">
              <div>
                  <h2 className="text-2xl font-bold text-indigo-900">Forecast: Critical Surge Expected in 48h</h2>
                  <p className="text-indigo-700 mt-2 max-w-xl">Based on current transmission rates in North Zone, OPD loads are predicted to rise by 45% over the weekend.</p>
              </div>
              <div className="mt-4 sm:mt-0 flex flex-col items-center">
                  <span className="text-4xl font-extrabold text-indigo-600">45%</span>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Surge Risk</span>
              </div>
          </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
              <CardContent className="p-6">
                 <h3 className="font-semibold mb-6">Occupancy Projection (Next 7 Days)</h3>
                 <div className="h-64">
                      <ForecastRiskChart />
                 </div>
              </CardContent>
          </Card>

          <Card>
              <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Risk Ranking</h3>
                  <div className="space-y-4">
                      {risks.map((r, i) => (
                          <div key={i} className="flex items-center justify-between border-b last:border-0 border-slate-100 pb-3 last:pb-0">
                               <div>
                                   <div className="font-medium text-sm text-slate-900">{r.facility}</div>
                                   <div className="text-xs text-slate-500">{r.reason}</div>
                               </div>
                               <div className="text-right">
                                    <Badge variant={r.risk === 'Critical' ? 'destructive' : r.risk === 'High' ? 'secondary' : 'outline'} className={r.risk === 'High' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : ''}>
                                        {r.risk}
                                    </Badge>
                                    <div className="text-[10px] text-slate-400 mt-1">in {r.days}</div>
                               </div>
                          </div>
                      ))}
                  </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
