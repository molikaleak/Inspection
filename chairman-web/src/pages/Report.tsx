import { useState, useMemo } from 'react';
import { mockForemen, mockChecklist, mockReports, mockInspectorsData } from '../data/mockData';
import { ChevronLeft, Printer, Share2, AlertCircle, CheckCircle2, MoreVertical, ShieldCheck, ChevronUp, ChevronDown } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ExportIntelligenceModal from '../components/ExportIntelligenceModal';

export default function Report() {
  const { id } = useParams();
  const report = mockReports.find(r => r.id === id) || mockReports[0];
  const foreman = mockForemen[0]; // Logic for ID fetch
  const [selectedForeman, setSelectedForeman] = useState(mockForemen[0]);
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Calculate metrics for Export Summary
  const reportMetrics = useMemo(() => {
    let violations = 0;
    mockChecklist.forEach(section => {
      section.items.forEach(item => {
        if (item.status === 'No') violations++;
      });
    });

    const totalFindings = mockForemen.reduce((acc, f) => acc + (f.findings?.length || 0), 0);

    return {
      violations,
      totalFindings
    };
  }, []);

  const toggleSection = (idx: number) => {
    if (expandedSections.includes(idx)) {
      setExpandedSections(expandedSections.filter(i => i !== idx));
    } else {
      setExpandedSections([...expandedSections, idx]);
    }
  };

  return (
    <div className="flex-1 lg:pl-64 min-h-screen bg-surface transition-all">
      <main className="max-w-4xl mx-auto p-5 md:p-10 space-y-10 pb-32 lg:pb-10">
        
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center mb-10">
           <Link to="/" className="flex items-center gap-2 text-on-surface-variant font-bold hover:text-primary transition-all">
              <ChevronLeft size={20} />
              Return to Overview
           </Link>
           <div className="flex gap-4">
              <button 
                onClick={() => setIsExportModalOpen(true)}
                className="p-3 rounded-xl hover:bg-on-surface hover:text-surface text-on-surface-variant transition-all shadow-sm bg-surface-lowest flex items-center gap-2 group"
              >
                  <Printer size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Print Intelligence</span>
              </button>
              <button 
                onClick={() => setIsExportModalOpen(true)}
                className="p-3 rounded-xl hover:bg-on-surface hover:text-surface text-on-surface-variant transition-all shadow-sm bg-surface-lowest flex items-center gap-2 group"
              >
                  <Share2 size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Export</span>
              </button>
           </div>
        </div>

        {/* High-Density Header */}
        <header className="editorial-card p-8 bg-on-surface/[0.02] border-l-4 border-primary relative overflow-hidden flex items-center justify-between gap-8">
           <div className="absolute top-0 right-0 w-32 h-32 emerald-gradient opacity-[0.05] blur-[50px] pointer-events-none" />
           <div className="flex-1">
              <p className="text-[8px] font-black uppercase tracking-[0.4em] text-primary mb-2 opacity-80 underline underline-offset-4 decoration-primary/30">Site Assessment Vector</p>
              <h1 className="text-3xl font-black tracking-tighter text-on-surface leading-none mb-4">Inspection Intelligence</h1>
              <div className="flex flex-wrap items-center gap-6 mt-4">
                 <MetaItem label="Project Name" value={report.project} />
                 <MetaItem label="Inspection Name" value={report.subject} />
                 <MetaItem label="Date" value={report.date} />
                 <MetaItem label="Schedule" value={`${report.startTime} - ${report.endTime}`} />
              </div>
           </div>
           <div className="px-8 py-4 bg-surface-lowest rounded-2xl border border-on-surface/5 shadow-glow text-center shrink-0">
              <div className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-1">Audit Score</div>
              <div className="text-4xl font-black text-primary tracking-tighter">{report.score}<span className="text-sm opacity-40 ml-0.5">/100</span></div>
           </div>
        </header>

        {/* Workforce Intelligence & OT Data */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
           {/* Primary Identifiers */}
           <div className="xl:col-span-4 space-y-4">
              <div className="editorial-card p-6 bg-on-surface/[0.01] border-l-2 border-primary">
                 <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Inspector</p>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl ring-2 ring-primary/20 overflow-hidden shrink-0">
                       <img src={mockInspectorsData[report.inspector]?.avatar || mockInspectorsData['Mr. Menghour'].avatar} className="w-full h-full object-cover" alt="Inspector" />
                    </div>
                    <div>
                       <h2 className="text-sm font-black text-on-surface leading-tight">{report.inspector}</h2>
                    </div>
                 </div>
              </div>

              <div className="editorial-card p-6 bg-on-surface/[0.01]">
                 <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Field Inspectors</p>
                 <div className="flex items-start gap-4 overflow-x-auto no-scrollbar pb-4 pt-4 px-2 -mx-2">
                    {mockForemen.map(f => (
                       <div 
                         key={f.id} 
                         onClick={() => setSelectedForeman(f)}
                         className="flex flex-col items-center gap-2 cursor-pointer transition-all shrink-0 w-14 group"
                       >
                          <div className={`w-12 h-12 rounded-full ring-2 overflow-hidden bg-surface-lowest shadow-sm transition-all duration-300 ${selectedForeman.id === f.id ? 'ring-primary ring-offset-2 ring-offset-surface scale-110' : 'ring-on-surface/10 grayscale-[50%] group-hover:grayscale-0 group-hover:ring-primary/50'}`}>
                             <img src={f.avatar} className="w-full h-full object-cover" alt="Field Inspector" />
                          </div>
                          <h2 className={`text-[9px] font-black leading-tight text-center truncate w-full mt-1 transition-colors ${selectedForeman.id === f.id ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'}`}>{f.name}</h2>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* OT Intelligence Dossier */}
           <div className="xl:col-span-8 space-y-4">
              <div className="editorial-card p-6 bg-on-surface/[0.02] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                   <div className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-widest">OT Dossier Validated</div>
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant mb-8">Operational Intelligence (OT)</h3>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
                   <OTItem label="Service Class" value="Cross-Functional" />
                   <OTItem label="Deployment" value="All Zones" />
                   <OTItem label="Active Period" value={report.date || 'N/A'} />
                   <OTItem label="Time Vector" value={`${report.startTime} - ${report.endTime}`} />
                   <OTItem label="Manpower" value={`${mockForemen.reduce((acc, f) => acc + (f.manpower || 0), 0)} Personnel`} />
                   <OTItem label="Duration" value="8 hours" />
                   <OTItem label="Merit Index Avg" value={`${(mockForemen.reduce((acc, f) => acc + (f.score || 0), 0) / mockForemen.length).toFixed(1)}/12`} />
                   <OTItem label="Signature" value="Digital" isStrong />
                </div>
              </div>

              {/* NEW: Executive Summarizer - Foreman Specifics */}
              <div className="editorial-card p-6 shadow-sm border-l-2 border-viewed-cyan">
                 <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-viewed-cyan mb-6">Intelligence Summary: {selectedForeman.name}</h4>
                 <div className="space-y-3">
                    {selectedForeman.findings?.map((finding, fIdx) => (
                       <div key={fIdx} className="flex items-start gap-3 group">
                          <div className="w-1.5 h-1.5 rounded-full bg-viewed-cyan mt-1 group-hover:scale-150 transition-transform shadow-glow shrink-0" />
                          <p className="text-[10px] font-bold text-on-surface opacity-80 leading-relaxed group-hover:opacity-100 transition-opacity">{finding}</p>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Compact Master Checklist */}
        <div className="mb-6 border-b border-on-surface/5 pb-4">
           <p className="text-[8px] font-black uppercase tracking-[0.4em] text-on-surface-variant mb-1">Checklist Validation</p>
           <h3 className="text-xl font-black tracking-tight text-on-surface">{selectedForeman.name}'s Report</h3>
        </div>
        <section className="grid grid-cols-1 lg:items-start gap-6 pb-12">
           {mockChecklist.map((section, sIdx) => {
             const isExpanded = expandedSections.includes(sIdx);
             return (
               <div key={sIdx} className="editorial-card overflow-hidden transition-all duration-300">
                  <div 
                    onClick={() => toggleSection(sIdx)}
                    className="flex items-center justify-between p-5 cursor-pointer hover:bg-on-surface/[0.03] bg-on-surface/[0.01] transition-colors"
                  >
                     <div className="flex items-center gap-3">
                        <div className="h-0.5 w-6 emerald-gradient rounded-full" />
                        <h3 className="text-xs font-black tracking-[0.1em] text-on-surface uppercase">{section.section}</h3>
                     </div>
                     <div className="text-on-surface-variant">
                       {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                     </div>
                  </div>
                  
                  <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="space-y-2 p-5 pt-0 border-t border-on-surface/5">
                       {section.items.map((item) => (
                          <div key={item.id} className="editorial-card p-4 flex items-center justify-between gap-4 group hover:bg-on-surface/[0.02]">
                            <div className="flex items-center gap-4 flex-1">
                               <div className="w-8 h-8 rounded-lg bg-on-surface/5 flex flex-shrink-0 items-center justify-center font-black text-[8px] text-on-surface-variant group-hover:text-primary transition-all">
                                  {item.id}
                               </div>
                               <p className="font-bold text-[11px] text-on-surface opacity-80 group-hover:opacity-100 transition-opacity leading-tight">
                                  {item.desc}
                               </p>
                            </div>
                            <div className="flex items-center gap-2">
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


        {/* Site Visual Evidence */}
        <div className="mb-6 mt-12 border-b border-on-surface/5 pb-4">
           <p className="text-[8px] font-black uppercase tracking-[0.4em] text-on-surface-variant mb-1">Visual Evidence</p>
           <h3 className="text-xl font-black tracking-tight text-on-surface">Site Photos: {selectedForeman.name}</h3>
        </div>
        {selectedForeman.photos && selectedForeman.photos.length > 0 ? (
           <section className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12">
               {selectedForeman.photos.map((photo, pIdx) => (
                  <div key={pIdx} className="aspect-square rounded-2xl overflow-hidden border border-on-surface/10 bg-surface-lowest group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                      <img src={photo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={`Site evidence by ${selectedForeman.name}`} />
                  </div>
               ))}
           </section>
        ) : (
           <div className="pb-12 text-center text-sm font-bold text-on-surface-variant/50">No visual evidence submitted by this inspector.</div>
        )}


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

function OTItem({ label, value, isStrong }: { label: string, value: string, isStrong?: boolean }) {
  return (
    <div className="flex flex-col">
       <span className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50 mb-1">{label}</span>
       <span className={`text-[10px] font-black tracking-tight ${isStrong ? 'text-primary' : 'text-on-surface'}`}>{value}</span>
    </div>
  );
}

function MetaItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col">
       <span className="text-[10px] font-black uppercase tracking-[.25em] text-on-surface-variant/60">{label}</span>
       <span className="text-sm font-bold text-on-surface">{value}</span>
    </div>
  );
}

function Badge({ value, active, color }: { value: string, active: boolean, color: 'primary' | 'amber' | 'gray' }) {
  const styles = {
    primary: active ? 'bg-primary text-on-surface border-primary shadow-lg scale-110' : 'text-on-surface-variant border-on-surface/5 opacity-50',
    amber: active ? 'bg-amber-600 text-on-surface border-amber-600 shadow-lg scale-110' : 'text-on-surface-variant border-on-surface/5 opacity-50',
    gray: 'text-on-surface-variant border-on-surface/5 opacity-50'
  };

  return (
    <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${styles[color]}`}>
       {active && <CheckCircle2 size={10} className="inline mr-1 -mt-0.5" />}
       {value}
    </div>
  );
}
