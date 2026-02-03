"use client";

import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Megaphone, AlertTriangle, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

export default function AdvisoriesPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
         <PageHeader 
            title="Public Advisories" 
            subtitle="Broadcast alerts and health guidelines to the public and hospitals."
         />

         <div className="space-y-4">
            {/* New Advisory Form */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Create New Advisory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <label className="text-sm font-medium">Title</label>
                             <Input placeholder="e.g. Dengue Prevention Alert" />
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm font-medium">Severity</label>
                             <div className="flex items-center gap-2">
                                <Select>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Critical</option>
                                </Select>
                             </div>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                         <label className="text-sm font-medium">Description</label>
                         <textarea className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Enter full advisory details..." />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <label className="text-sm font-medium">Target Audience</label>
                             <Select>
                                <option>All Public App Users</option>
                                <option>Hospitals Only</option>
                                <option>Specific Zone</option>
                             </Select>
                        </div>
                         <div className="space-y-2">
                             <label className="text-sm font-medium">Expiry</label>
                             <Select>
                                <option>24 Hours</option>
                                <option>3 Days</option>
                                <option>1 Week</option>
                             </Select>
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                            <Send className="h-4 w-4 mr-2" /> Can Broadcast
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* History List */}
            <h3 className="font-semibold text-lg text-slate-900 pt-4">Active Advisories</h3>
            <div className="space-y-3">
                {[1, 2].map((i) => (
                    <Card key={i} className="border-l-4 border-l-red-500">
                        <CardContent className="p-4 flex justify-between items-start">
                             <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="destructive" className="h-5 px-1.5 text-[10px] uppercase">Critical</Badge>
                                    <span className="text-xs text-muted-foreground">Issued 2h ago</span>
                                </div>
                                <h4 className="font-bold text-slate-900">Heavy Rain Alert - Vector Borne Disease Warning</h4>
                                <p className="text-sm text-slate-600 mt-1 max-w-xl">Residents in North Zone are advised to clear stagnant water. Hospitals to prep dengue wards.</p>
                             </div>
                             <div className="text-right text-xs text-slate-500">
                                <div>Sent to: <span className="font-semibold">All Public</span></div>
                                <div>Expires: <span className="font-semibold">24h</span></div>
                             </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
         </div>
      </div>

       {/* Mobile Preview */}
      <div className="hidden lg:block">
         <div className="sticky top-24">
             <div className="mockup-phone border-gray-800 rounded-[2.5rem] p-2 bg-gray-900 shadow-xl w-[300px] mx-auto">
                 <div className="bg-white rounded-[2rem] h-[550px] overflow-hidden relative flex flex-col">
                     {/* Header */}
                     <div className="bg-blue-600 h-14 w-full flex items-center justify-center text-white font-bold text-sm shadow-sm z-10">
                         GovHealth App
                     </div>
                     
                     <div className="p-4 space-y-4 bg-slate-50 flex-1 overflow-y-auto">
                         <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                             <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                <span className="text-xs font-bold text-red-600 uppercase">Emergency Alert</span>
                             </div>
                             <h4 className="font-bold text-sm mb-1">Heavy Rain Alert</h4>
                             <p className="text-xs text-slate-500 line-clamp-3">Residents in North Zone are advised to clear stagnant water. Hospitals to prep dengue wards.</p>
                         </div>
                     </div>
                     
                     {/* Nav */}
                     <div className="h-12 bg-white border-t flex justify-around items-center px-4">
                        <div className="w-8 h-1 bg-slate-200 rounded-full"/>
                     </div>
                 </div>
             </div>
             <p className="text-center text-sm text-muted-foreground mt-4">SafeApp Preview</p>
         </div>
      </div>
    </div>
  );
}
