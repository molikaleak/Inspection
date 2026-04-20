import { useState, useMemo } from 'react';
import { mockForemen, mockChecklist, mockReports, mockInspectorsData } from '../data/mockData';
import { Printer, Share2, CheckCircle2, ChevronUp, ChevronDown, ArrowLeft, ArrowRight, Activity } from 'lucide-react';
import ExportIntelligenceModal from '../components/ExportIntelligenceModal';

export default function Dashboard() {
  const [activeReports, setActiveReports] = useState([...mockReports]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const report = activeReports[currentIndex];
  
  const [selectedForeman, setSelectedForeman] = useState(mockForemen[0]);
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleNext = () => {
    if (currentIndex < activeReports.length - 1) {
       setCurrentIndex(currentIndex + 1);
       setExpandedSections([0]); // reset
       setSelectedForeman(mockForemen[0]);
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
       setCurrentIndex(currentIndex - 1);
       setExpandedSections([0]);
       setSelectedForeman(mockForemen[0]);
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinishReview = () => {
      const newActive = activeReports.filter((_, i) => i !== currentIndex);
      setActiveReports(newActive);
      setCurrentIndex(0);
      setExpandedSections([0]);
      setSelectedForeman(mockForemen[0]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activeReports.length === 0) {
    return (
      <div className="flex-1 lg:pl-60 min-h-screen bg-surface flex items-center justify-center transition-all">
         <div className="text-center apple-card p-10 max-w-sm mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
               <CheckCircle2 size={32} className="text-primary" />
            </div>
            <h2 className="text-[20px] font-semibold text-on-surface tracking-tight mb-2">All Caught Up</h2>
            <p className="text-[13px] text-on-surface-variant">There are no more reports pending your review for today.</p>
         </div>
      </div>
    );
  }

  // Calculate metrics for Export Summary
  const reportMetrics = useMemo(() => {
    let violations = 0;
    mockChecklist.forEach(section => {
      section.items.forEach(item => {
        if (item.status === 'No') violations++;
      });
    });
    const totalFindings = mockForemen.reduce((acc, f) => acc + (f.findings?.length || 0), 0);
    return { violations, totalFindings };
  }, []);

  const toggleSection = (idx: number) => {
    if (expandedSections.includes(idx)) {
      setExpandedSections(expandedSections.filter(i => i !== idx));
    } else {
      setExpandedSections([...expandedSections, idx]);
    }
  };

  return (
    <div className="flex-1 lg:pl-60 min-h-screen bg-surface transition-all overflow-hidden flex flex-col relative w-full">
      <main className="max-w-3xl mx-auto w-full p-5 md:p-8 space-y-8 pb-32 lg:pb-8">
        
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center">
           <div className="flex flex-col">
              <h1 className="text-[17px] font-semibold text-on-surface leading-none mb-0.5">Report Stream</h1>
              <p className="text-[12px] text-on-surface-variant flex items-center gap-1.5"><Activity size={12} className="text-primary"/> Live Updates</p>
           </div>
           <div className="flex gap-2">
              <button 
                onClick={() => setIsExportModalOpen(true)}
                className="p-2.5 rounded-xl hover:bg-surface-lowest text-on-surface-variant transition-all flex items-center gap-1.5"
              >
                <Printer size={16} />
                <span className="text-[13px] hidden md:inline">Print</span>
              </button>
              <button 
                onClick={() => setIsExportModalOpen(true)}
                className="p-2.5 rounded-xl hover:bg-surface-lowest text-on-surface-variant transition-all flex items-center gap-1.5"
              >
                <Share2 size={16} />
                <span className="text-[13px] hidden md:inline">Export</span>
              </button>
           </div>
        </div>

        {/* Carousel Control Wrapper */}
        <div className="relative group">
           
           {/* Left Arrow */}
           <button 
             onClick={handlePrev}
             disabled={currentIndex === 0}
             className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-surface-low border border-on-surface/[0.08] text-on-surface hover:text-primary transition-all disabled:opacity-30 disabled:hover:text-on-surface"
           >
             <ArrowLeft size={18} />
           </button>

           {/* Header */}
           <header className="apple-card p-6 border-l-[3px] border-primary">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1.5">
                      <p className="text-[12px] text-primary font-medium">Inspection Report</p>
                      <span className="px-2 py-0.5 rounded-md bg-surface-lowest text-[10px] text-on-surface-variant">
                         {currentIndex + 1} of {activeReports.length}
                      </span>
                   </div>
                   <h1 className="text-[24px] md:text-[28px] font-semibold tracking-tight text-on-surface leading-tight mb-4">{report.subject}</h1>
                   <div className="flex flex-wrap items-center gap-5">
                      <MetaItem label="Project" value={report.project} />
                      <MetaItem label="Date" value={report.date} />
                      <MetaItem label="Time" value={`${report.startTime} – ${report.endTime}`} />
                   </div>
                </div>
                <div className="px-5 py-3 bg-surface-lowest rounded-xl text-center shrink-0">
                   <div className="text-[11px] text-on-surface-variant mb-1">Score</div>
                   <div className="text-[28px] font-semibold text-primary tracking-tight">{report.score}<span className="text-[12px] text-on-surface-variant ml-0.5">/100</span></div>
                </div>
              </div>
              
              {/* Mobile Swipe Buttons */}
              <div className="flex md:hidden justify-between items-center mt-6 pt-5 border-t border-on-surface/[0.08]">
                 <button onClick={handlePrev} disabled={currentIndex === 0} className="flex items-center gap-1.5 text-[13px] font-medium text-on-surface-variant disabled:opacity-30">
                    <ArrowLeft size={16} /> Prev
                 </button>
                 <button onClick={handleNext} disabled={currentIndex === activeReports.length - 1} className="flex items-center gap-1.5 text-[13px] font-medium text-on-surface hover:text-primary disabled:opacity-30">
                    Next <ArrowRight size={16} />
                 </button>
              </div>
           </header>

           {/* Right Arrow */}
           <button 
             onClick={handleNext}
             disabled={currentIndex === activeReports.length - 1}
             className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-surface-low border border-on-surface/[0.08] text-on-surface hover:text-primary transition-all disabled:opacity-30 disabled:hover:text-on-surface"
           >
             <ArrowRight size={18} />
           </button>
        </div>

        {/* Inspector & Foremen */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
           <div className="xl:col-span-4 space-y-3">
              <div className="apple-card p-4 border-l-2 border-primary">
                 <p className="text-[12px] text-on-surface-variant mb-3">Inspector</p>
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl ring-2 ring-primary/20 overflow-hidden shrink-0">
                       <img src={mockInspectorsData[report.inspector]?.avatar || mockInspectorsData['Mr. Menghour'].avatar} className="w-full h-full object-cover" alt="Inspector" />
                    </div>
                    <h2 className="text-[14px] font-medium text-on-surface">{report.inspector}</h2>
                 </div>
              </div>

              <div className="apple-card p-4">
                 <p className="text-[12px] text-on-surface-variant mb-3">Foremen</p>
                 <div className="flex items-start gap-3 overflow-x-auto no-scrollbar pb-2 pt-2 px-1 -mx-1">
                    {mockForemen.map(f => (
                       <div 
                         key={f.id} 
                         onClick={() => setSelectedForeman(f)}
                         className="flex flex-col items-center gap-1.5 cursor-pointer transition-all shrink-0 w-12 group"
                       >
                          <div className={`w-10 h-10 rounded-full ring-2 overflow-hidden bg-surface-lowest transition-all ${selectedForeman.id === f.id ? 'ring-primary ring-offset-2 ring-offset-surface scale-110' : 'ring-on-surface/[0.08] opacity-60 group-hover:opacity-100'}`}>
                             <img src={f.avatar} className="w-full h-full object-cover" alt="Foreman" />
                          </div>
                          <h2 className={`text-[10px] leading-tight text-center truncate w-full transition-colors ${selectedForeman.id === f.id ? 'text-primary font-medium' : 'text-on-surface-variant group-hover:text-on-surface'}`}>{f.name}</h2>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* OT Data */}
           <div className="xl:col-span-8 space-y-3">
              <div className="apple-card p-5 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                   <div className="px-2.5 py-1 rounded-md bg-primary/[0.08] text-primary text-[11px] font-medium">Validated</div>
                </div>
                <h3 className="text-[13px] text-on-surface-variant mb-5">Operational Details</h3>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-4">
                   <OTItem label="Service Class" value="Cross-Functional" />
                   <OTItem label="Deployment" value="All Zones" />
                   <OTItem label="Active Period" value={report.date || 'N/A'} />
                   <OTItem label="Time Range" value={`${report.startTime} – ${report.endTime}`} />
                   <OTItem label="Manpower" value={`${mockForemen.reduce((acc, f) => acc + (f.manpower || 0), 0)} Personnel`} />
                   <OTItem label="Duration" value="8 hours" />
                   <OTItem label="Merit Average" value={`${(mockForemen.reduce((acc, f) => acc + (f.score || 0), 0) / mockForemen.length).toFixed(1)}/12`} />
                   <OTItem label="Signature" value="Digital" isHighlighted />
                </div>
              </div>

              {/* Foreman Summary */}
              <div className="apple-card p-5 border-l-2 border-viewed-cyan">
                 <h4 className="text-[13px] text-viewed-cyan font-medium mb-4">Summary: {selectedForeman.name}</h4>
                 <div className="space-y-2.5">
                    {selectedForeman.findings?.map((finding, fIdx) => (
                       <div key={fIdx} className="flex items-start gap-2.5 group">
                          <div className="w-1 h-1 rounded-full bg-viewed-cyan mt-2 shrink-0" />
                          <p className="text-[13px] text-on-surface/80 leading-relaxed group-hover:text-on-surface transition-colors">{finding}</p>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Checklist */}
        <div className="mb-4 border-b border-on-surface/[0.06] pb-3">
           <p className="text-[12px] text-on-surface-variant mb-0.5">Checklist</p>
           <h3 className="text-[17px] font-semibold tracking-tight text-on-surface">{selectedForeman.name}'s Report</h3>
        </div>
        <section className="grid grid-cols-1 gap-3 pb-8">
           {mockChecklist.map((section, sIdx) => {
             const isExpanded = expandedSections.includes(sIdx);
             return (
               <div key={sIdx} className="apple-card overflow-hidden transition-all">
                  <div 
                    onClick={() => toggleSection(sIdx)}
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-lowest/50 transition-colors"
                  >
                     <div className="flex items-center gap-2.5">
                        <div className="h-0.5 w-5 bg-primary rounded-full" />
                        <h3 className="text-[13px] font-medium text-on-surface">{section.section}</h3>
                     </div>
                     <div className="text-on-surface-variant">
                       {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                     </div>
                  </div>
                  
                  <div className={`transition-all duration-400 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="space-y-1.5 p-4 pt-0 border-t border-on-surface/[0.04]">
                       {section.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between gap-3 p-3 rounded-lg group hover:bg-surface-lowest/50 transition-all">
                            <div className="flex items-center gap-3 flex-1">
                               <div className="w-7 h-7 rounded-lg bg-surface-lowest flex flex-shrink-0 items-center justify-center text-[11px] text-on-surface-variant group-hover:text-primary transition-all">
                                  {item.id}
                               </div>
                               <p className="text-[13px] text-on-surface/80 group-hover:text-on-surface transition-colors leading-tight">
                                  {item.desc}
                               </p>
                            </div>
                            <div className="flex items-center gap-1.5">
                               <Badge value={item.status} active={item.status === 'Yes'} color="primary" />
                               <Badge value="No" active={item.status === 'No'} color="amber" />
                            </div>
                          </div>
                       ))}
                    </div>
                  </div>
               </div>
             );
           })}
        </section>

        {/* Summary Note */}
        <div className="mb-4 mt-8 border-b border-on-surface/[0.06] pb-3">
           <p className="text-[12px] text-on-surface-variant mb-0.5">Assessment</p>
           <h3 className="text-[17px] font-semibold tracking-tight text-on-surface">Final Remarks</h3>
        </div>
        <div className="apple-card p-5 mb-8 border border-on-surface/[0.04]">
            <p className="text-[13px] text-on-surface/80 leading-relaxed">
               The operation proceeded efficiently with high compliance marks across all major zones. Minor infrastructural anomalies were noted by the foremen, which have been logged for the upcoming maintenance cycle. Safety protocols were rigorously maintained, and no critical violations or immediate hazards were observed. Team deployment remains optimal.
            </p>
        </div>

        {/* Site Photos */}
        <div className="mb-4 border-b border-on-surface/[0.06] pb-3">
           <p className="text-[12px] text-on-surface-variant mb-0.5">Evidence</p>
           <h3 className="text-[17px] font-semibold tracking-tight text-on-surface">Site Photos: {selectedForeman.name}</h3>
        </div>
        {selectedForeman.photos && selectedForeman.photos.length > 0 ? (
           <section className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-8">
               {selectedForeman.photos.map((photo, pIdx) => (
                  <div key={pIdx} className="aspect-square rounded-xl overflow-hidden border border-on-surface/[0.06] bg-surface-lowest group cursor-pointer hover:shadow-card transition-all">
                      <img src={photo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={`Site evidence`} />
                  </div>
               ))}
           </section>
        ) : (
           <div className="pb-8 text-center text-[13px] text-on-surface-variant/50">No photos submitted by this foreman.</div>
        )}

        {/* Review Actions Footer */}
        <div className="flex items-center justify-between pt-6 mt-4 border-t border-on-surface/[0.06]">
           <button 
             onClick={handlePrev} 
             disabled={currentIndex === 0}
             className="px-4 md:px-5 py-2.5 rounded-xl border border-on-surface/[0.08] text-[13px] font-medium text-on-surface transition-all disabled:opacity-30 hover:bg-surface-lowest"
           >
             Prev
           </button>

           <div className="flex gap-2">
             <button 
               onClick={handleFinishReview}
               className="px-4 md:px-5 py-2.5 rounded-xl bg-red-50 text-red-600 text-[13px] font-medium hover:bg-red-100 transition-all border border-red-100"
             >
               Finish Review
             </button>
             <button 
               onClick={handleNext} 
               disabled={currentIndex === activeReports.length - 1}
               className="px-4 md:px-5 py-2.5 rounded-xl bg-primary text-white text-[13px] font-medium hover:opacity-90 transition-all disabled:opacity-30"
             >
               Next
             </button>
           </div>
        </div>

      </main>

      <ExportIntelligenceModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        reportData={{
          id: report.id,
          project: report.project,
          subject: report.subject,
          date: report.date,
          score: report.score,
          inspector: report.inspector,
          findingsCount: reportMetrics.totalFindings,
          violationsCount: reportMetrics.violations
        }}
      />
    </div>
  );
}

function OTItem({ label, value, isHighlighted }: { label: string, value: string, isHighlighted?: boolean }) {
  return (
    <div className="flex flex-col">
       <span className="text-[11px] text-on-surface-variant mb-0.5">{label}</span>
       <span className={`text-[13px] font-medium ${isHighlighted ? 'text-primary' : 'text-on-surface'}`}>{value}</span>
    </div>
  );
}

function MetaItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col">
       <span className="text-[11px] text-on-surface-variant">{label}</span>
       <span className="text-[13px] font-medium text-on-surface">{value}</span>
    </div>
  );
}

function Badge({ value, active, color }: { value: string, active: boolean, color: 'primary' | 'amber' | 'gray' }) {
  const styles = {
    primary: active ? 'bg-primary text-white' : 'text-on-surface-variant/40 bg-on-surface/[0.03]',
    amber: active ? 'bg-review-amber text-white' : 'text-on-surface-variant/40 bg-on-surface/[0.03]',
    gray: 'text-on-surface-variant/40 bg-on-surface/[0.03]'
  };

  return (
    <div className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${styles[color]}`}>
       {active && <CheckCircle2 size={10} className="inline mr-0.5 -mt-0.5" />}
       {value}
    </div>
  );
}
