"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Layers, Map as MapIcon, Info } from 'lucide-react';

export default function HeatmapsPage() {
  const [activeLayer, setActiveLayer] = useState('access');

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
       <PageHeader 
        title="Geospatial Analysis" 
        subtitle="Visualizing healthcare access, disease hotspots, and resource gaps."
      />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
          {/* Controls */}
          <Card className="lg:col-span-1 border-slate-200">
             <CardContent className="p-6 space-y-6">
                <div>
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500 mb-4">Map Layers</h3>
                    <div className="space-y-2">
                        {[
                            { id: 'access', label: 'Access Gap Analysis', color: 'bg-orange-500' },
                            { id: 'overload', label: 'Facility Overload Heatmap', color: 'bg-red-500' },
                            { id: 'outbreak', label: 'Outbreak Hotspots', color: 'bg-purple-500' },
                            { id: 'mobile', label: 'Mobile Unit Coverage', color: 'bg-green-500' },
                        ].map((layer) => (
                            <button
                                key={layer.id}
                                onClick={() => setActiveLayer(layer.id)}
                                className={`w-full flex items-center p-3 rounded-lg border text-sm font-medium transition-all ${
                                    activeLayer === layer.id 
                                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                                    : 'border-slate-200 hover:bg-slate-50'
                                }`}
                            >
                                <div className={`w-3 h-3 rounded-full mr-3 ${layer.color}`} />
                                {layer.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500 mb-4">Filters</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Radius (km)</label>
                            <input type="range" className="w-full accent-blue-600" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>1km</span>
                                <span>10km</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Show Road Network</label>
                            <input type="checkbox" className="accent-blue-600 h-4 w-4" />
                        </div>
                    </div>
                </div>

                 <div className="pt-4 border-t border-slate-100">
                    <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600 space-y-2">
                        <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                            <p>Darker regions indicate higher urgency for intervention.</p>
                        </div>
                    </div>
                </div>
             </CardContent>
          </Card>

          {/* Map View */}
          <Card className="lg:col-span-3 border-slate-200 overflow-hidden relative group bg-indigo-50/30">
             <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Chennai_district_map.svg/1200px-Chennai_district_map.svg.png')] bg-cover bg-center opacity-10 mix-blend-multiply grayscale" />
             
             {/* Fake Visualization Overlay */}
             <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                       {/* Abstract Blobs */}
                       {activeLayer === 'access' && (
                           <>
                             <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-400/40 rounded-full blur-3xl" />
                             <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-orange-500/30 rounded-full blur-3xl" />
                           </>
                       )}
                       {activeLayer === 'overload' && (
                           <>
                             <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-red-500/40 rounded-full blur-3xl animate-pulse" />
                           </>
                       )}
                        {activeLayer === 'outbreak' && (
                           <>
                             <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-purple-600/50 rounded-full blur-2xl" />
                             <div className="absolute bottom-1/4 left-1/2 w-20 h-20 bg-purple-600/50 rounded-full blur-2xl" />
                           </>
                       )}
                  </div>
             </div>

             <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-slate-200 pointer-events-none">
                <div className="flex items-center gap-4 text-xs font-medium px-2">
                    <span>Low Intensity</span>
                    <div className="w-24 h-2 bg-gradient-to-r from-green-300 via-yellow-300 to-red-500 rounded-full" />
                    <span>High Intensity</span>
                </div>
             </div>
          </Card>
      </div>
    </div>
  );
}
