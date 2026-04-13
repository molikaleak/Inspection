import { mockProjects, mockReports, mockInspectorsData } from '../data/mockData';
import { Download, TrendingUp, CheckCircle2, MoreHorizontal, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import ExportIntelligenceModal from '../components/ExportIntelligenceModal';
import { PDAGraph } from '../components/PDAGraph';

export default function Insights() {
  const globalScore = 94.8;
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const portfolioMetrics = useMemo(() => {
    const totalFindings = 124; // Aggregated mock
    const violations = 8;     // Aggregated mock
    return { totalFindings, violations };
  }, []);

  // Generate 30 days of mock data
  const days = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
  const complianceTrend = [90, 88, 92, 94, 91, 89, 93, 95, 92, 90, 93, 94, 96, 95, 93, 94, 92, 91, 89, 92, 94, 95, 93, 94, 96, 97, 95, 94, 96, 98];
  const workHoursTrend = [42, 38, 45, 52, 48, 40, 35, 48, 55, 60, 58, 52, 45, 40, 38, 42, 44, 46, 50, 52, 55, 62, 58, 54, 48, 45, 42, 44, 46, 48];

  return (
    <div className="flex-1 lg:pl-64 min-h-screen bg-surface">
      <main className="max-w-6xl mx-auto p-5 md:p-10 space-y-12 pb-32 lg:pb-10">
        
        {/* Compressed Insights Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-on-surface/5">
          <div>
            <div className="text-[8px] uppercase font-black tracking-[0.4em] text-primary mb-2">Portfolio Intelligence</div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface leading-none">Strategic Review</h1>
          </div>
           <button 
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-on-surface text-surface text-[10px] font-black uppercase tracking-widest hover:shadow-glow transition-all shrink-0"
          >
            <Download size={16} /> Export Intelligence
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Tactical Date Filter & Charts */}
           <div className="lg:col-span-4 space-y-8">
              <div className="editorial-card p-6 space-y-6 bg-on-surface/[0.02]">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-4 bg-primary rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Temporal Range</span>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Start Vector</label>
                       <input 
                          type="date" 
                          defaultValue="2026-04-01"
                          className="w-full p-3 bg-surface-low border border-on-surface/5 rounded-xl text-[10px] font-bold text-on-surface outline-none focus:border-primary/50 transition-all cursor-pointer" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">End Vector</label>
                       <input 
                          type="date" 
                          defaultValue="2026-04-30"
                          className="w-full p-3 bg-surface-low border border-on-surface/5 rounded-xl text-[10px] font-bold text-on-surface outline-none focus:border-primary/50 transition-all cursor-pointer" 
                       />
                    </div>
                 </div>
              </div>

               <div className="grid grid-cols-1 gap-6">
                  <PDAGraph 
                    title="Average Compliance" 
                    data={complianceTrend} 
                    labels={days} 
                    valueSuffix="%" 
                  />
                  <PDAGraph 
                    title="Completed Work" 
                    data={workHoursTrend} 
                    labels={days} 
                    color="#06b6d4" 
                    valueSuffix="hrs" 
                  />
               </div>
           </div>

           {/* Project Intelligence Grid */}
           <section className="lg:col-span-8 space-y-8">
              <div className="flex items-center justify-between px-1">
                 <h2 className="text-lg font-black tracking-tight text-on-surface italic uppercase">Project Intelligence Archive</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {mockProjects.map((p) => {
                  const reports = mockReports.filter(r => r.project.includes(p.name) || p.name.includes(r.project));
                  return (
                    <div key={p.id} className="editorial-card p-8 group border border-on-surface/5 hover:border-primary/30 transition-all bg-surface-lowest">
                       <div className="flex items-center justify-between mb-8">
                          <div>
                             <h3 className="text-xl font-black tracking-tighter text-on-surface">{p.name}</h3>
                             <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mt-1">Project Command Center</p>
                          </div>
                          <div className="text-4xl font-black text-primary tracking-tighter tabular-nums italic">{p.avgScore}<span className="text-xs opacity-40 ml-0.5">%</span></div>
                       </div>

                       <div className="relative h-1.5 w-full bg-on-surface/5 rounded-full overflow-hidden mb-10">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out emerald-gradient shadow-glow`}
                            style={{ width: `${p.avgScore}%` }} 
                          />
                       </div>

                       {/* List of Reports per Project */}
                       <div className="space-y-4">
                          <div className="flex justify-between items-center px-1">
                             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Archived Intelligence Reports</h4>
                             <span className="text-[9px] font-bold text-primary italic">{reports.length} Logs Found</span>
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                             {reports.map((report) => (
                                <Link 
                                  to={`/report/${report.id}`}
                                  key={report.id} 
                                  className="flex items-center justify-between p-4 rounded-xl bg-on-surface/[0.02] border border-on-surface/5 hover:bg-on-surface/[0.04] transition-all group/item"
                                >
                                   <div className="flex items-center gap-4">
                                      <div className="w-8 h-8 rounded-lg bg-surface-lowest flex items-center justify-center text-primary border border-on-surface/5">
                                         <FileText size={14} />
                                      </div>
                                      <div>
                                         <p className="text-[11px] font-black text-on-surface">{report.subject}</p>
                                         <p className="text-[8px] font-bold text-on-surface-variant uppercase tracking-widest">{report.date} • {report.inspector}</p>
                                      </div>
                                   </div>
                                   <div className="flex items-center gap-4">
                                      <div className="text-[11px] font-black text-primary">{report.score}%</div>
                                      <ChevronRight size={14} className="text-on-surface-variant group-hover/item:text-primary transition-all" />
                                   </div>
                                </Link>
                             ))}
                             {reports.length === 0 && (
                                <div className="p-4 rounded-xl border border-dashed border-on-surface/10 text-center text-[10px] font-bold text-on-surface-variant">
                                   No archived intelligence for this project node.
                                </div>
                             )}
                          </div>
                       </div>
                    </div>
                  );
                })}
              </div>
           </section>
        </div>


      </main>

      <ExportIntelligenceModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        reportData={{
          id: 'PF-2026-Q2',
          project: 'Portfolio-Wide',
          subject: 'Quarterly Resilience Audit',
          date: 'Q2 2026',
          score: globalScore,
          inspector: 'Executive Terminal',
          findingsCount: portfolioMetrics.totalFindings,
          violationsCount: portfolioMetrics.violations
        }}
      />
    </div>
  );
}

