import { mockProjects, mockReports, mockInspectorsData } from '../data/mockData';
import { Download, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import ExportIntelligenceModal from '../components/ExportIntelligenceModal';
import { PDAGraph } from '../components/PDAGraph';

export default function Insights() {
  const globalScore = 94.8;
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const portfolioMetrics = useMemo(() => {
    const totalFindings = 124;
    const violations = 8;
    return { totalFindings, violations };
  }, []);

  // Generate 30 days of mock data
  const days = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
  const complianceTrend = [90, 88, 92, 94, 91, 89, 93, 95, 92, 90, 93, 94, 96, 95, 93, 94, 92, 91, 89, 92, 94, 95, 93, 94, 96, 97, 95, 94, 96, 98];
  const workHoursTrend = [42, 38, 45, 52, 48, 40, 35, 48, 55, 60, 58, 52, 45, 40, 38, 42, 44, 46, 50, 52, 55, 62, 58, 54, 48, 45, 42, 44, 46, 48];

  return (
    <div className="flex-1 lg:pl-60 min-h-screen bg-surface">
      <main className="max-w-6xl mx-auto p-5 md:p-8 space-y-8 pb-32 lg:pb-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-5 border-b border-on-surface/[0.06]">
          <div>
            <p className="text-[13px] text-primary font-medium mb-1">Portfolio Intelligence</p>
            <h1 className="text-[28px] font-semibold tracking-tight text-on-surface leading-none">Strategic Review</h1>
          </div>
           <button 
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-on-surface text-surface text-[13px] font-medium hover:opacity-90 transition-all shrink-0"
          >
            <Download size={15} /> Export
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Charts & Filters */}
           <div className="lg:col-span-4 space-y-5">
              <div className="apple-card p-5 space-y-4">
                 <div className="flex items-center gap-2">
                    <div className="w-1 h-3.5 bg-primary rounded-full" />
                    <span className="text-[13px] text-on-surface-variant">Date Range</span>
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                       <label className="text-[11px] text-on-surface-variant ml-1">Start</label>
                       <input 
                          type="date" 
                          defaultValue="2026-04-01"
                          className="w-full p-2.5 bg-surface-low border border-on-surface/[0.06] rounded-lg text-[13px] text-on-surface outline-none focus:border-primary/50 transition-all cursor-pointer" 
                       />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[11px] text-on-surface-variant ml-1">End</label>
                       <input 
                          type="date" 
                          defaultValue="2026-04-30"
                          className="w-full p-2.5 bg-surface-low border border-on-surface/[0.06] rounded-lg text-[13px] text-on-surface outline-none focus:border-primary/50 transition-all cursor-pointer" 
                       />
                    </div>
                 </div>
              </div>

               <div className="grid grid-cols-1 gap-4">
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
                    color="#32ADE6" 
                    valueSuffix="hrs" 
                  />
               </div>
           </div>

           {/* Project Grid */}
           <section className="lg:col-span-8 space-y-5">
              <h2 className="text-[17px] font-semibold tracking-tight text-on-surface px-1">Project Intelligence</h2>
              
              <div className="grid grid-cols-1 gap-5">
                {mockProjects.map((p) => {
                  const reports = mockReports.filter(r => r.project.includes(p.name) || p.name.includes(r.project));
                  return (
                    <div key={p.id} className="apple-card p-6 group border border-on-surface/[0.04]">
                       <div className="flex items-center justify-between mb-6">
                          <div>
                             <h3 className="text-[17px] font-semibold tracking-tight text-on-surface">{p.name}</h3>
                             <p className="text-[12px] text-on-surface-variant mt-0.5">Project overview</p>
                          </div>
                          <div className="text-[28px] font-semibold text-primary tracking-tight tabular-nums">{p.avgScore}<span className="text-[12px] text-on-surface-variant ml-0.5">%</span></div>
                       </div>

                       <div className="relative h-1 w-full bg-on-surface/[0.04] rounded-full overflow-hidden mb-6">
                          <div 
                            className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                            style={{ width: `${p.avgScore}%` }} 
                          />
                       </div>

                       {/* Reports per Project */}
                       <div className="space-y-3">
                          <div className="flex justify-between items-center px-0.5">
                             <h4 className="text-[13px] text-on-surface-variant">Archived Reports</h4>
                             <span className="text-[12px] text-primary font-medium">{reports.length} found</span>
                          </div>
                          <div className="grid grid-cols-1 gap-1.5">
                             {reports.map((report) => (
                                <Link 
                                  to={`/report/${report.id}`}
                                  key={report.id} 
                                  className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-lowest transition-all group/item"
                                >
                                   <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-lg bg-surface-lowest flex items-center justify-center text-primary">
                                         <FileText size={14} />
                                      </div>
                                      <div>
                                         <p className="text-[13px] font-medium text-on-surface">{report.subject}</p>
                                         <p className="text-[11px] text-on-surface-variant">{report.date} · {report.inspector}</p>
                                      </div>
                                   </div>
                                   <div className="flex items-center gap-3">
                                      <div className="text-[13px] font-medium text-primary">{report.score}%</div>
                                      <ChevronRight size={14} className="text-on-surface-variant/30 group-hover/item:text-primary transition-all" />
                                   </div>
                                </Link>
                             ))}
                             {reports.length === 0 && (
                                <div className="p-4 rounded-xl border border-dashed border-on-surface/[0.08] text-center text-[13px] text-on-surface-variant">
                                   No archived reports for this project.
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
