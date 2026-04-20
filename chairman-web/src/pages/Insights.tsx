import { useState, useMemo } from 'react';
import { mockProjects, mockReports, mockInspectorsData, mockForemen } from '../data/mockData';
import { Download, FileText, ChevronRight, Filter, Printer, Activity, ShieldCheck, Users, TrendingUp, Search, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ExportIntelligenceModal from '../components/ExportIntelligenceModal';
import { PDAGraph } from '../components/PDAGraph';
import FilterDrawer from '../components/FilterDrawer';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Insights() {
  useScrollReveal();
  const navigate = useNavigate();
  
  // -- OLD DASHBOARD STATE --
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    project: 'All Projects',
    inspector: 'All Inspectors',
    status: 'All Statuses'
  });

  const inspectors = useMemo(() => ['All Inspectors', ...Object.keys(mockInspectorsData)], []);
  const projectsList = useMemo(() => ['All Projects', ...mockProjects.map(p => p.name)], []);

  const filteredReports = useMemo(() => {
    return mockReports.filter(r => {
      const matchesStatus = filters.status === 'All Statuses' || r.status === filters.status;
      const matchesProject = filters.project === 'All Projects' || r.project === filters.project;
      const matchesSearch = r.subject.toLowerCase().includes(filters.search.toLowerCase()) || 
                           r.project.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesStatus && matchesProject && matchesSearch;
    });
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      search: '',
      project: 'All Projects',
      inspector: 'All Inspectors',
      status: 'All Statuses'
    });
  };

  const activeFilterCount = (filters.project !== 'All Projects' ? 1 : 0) + 
                            (filters.inspector !== 'All Inspectors' ? 1 : 0) + 
                            (filters.status !== 'All Statuses' ? 1 : 0);

  // -- INSIGHTS STATE --
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
      <main className="max-w-[1400px] mx-auto p-5 md:p-8 space-y-8 pb-32 lg:pb-8">
        
        {/* ============================================================== */}
        {/* OLD DASHBOARD SECTION (MOVED HERE) */}
        {/* ============================================================== */}
        <div className="space-y-6 mb-16 pb-12 border-b border-on-surface/[0.06]">
           {/* Old Dashboard Header */}
           <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5">
             <div className="relative group flex-1 max-w-sm">
               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary transition-colors" size={16} />
               <input 
                 type="text"
                 value={filters.search}
                 onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                 placeholder="Search reports..."
                 className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-low border border-on-surface/[0.06] text-[13px] outline-none transition-all focus:ring-2 ring-primary/20 placeholder:text-on-surface-variant/50"
               />
             </div>

             <div className="flex items-center gap-2.5">
               <button 
                 onClick={() => setIsDrawerOpen(true)}
                 className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-low border border-on-surface/[0.06] text-[13px] text-on-surface-variant hover:text-on-surface transition-all relative"
               >
                 <Filter size={15} />
                 Filters
                 {activeFilterCount > 0 && (
                   <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-medium">
                     {activeFilterCount}
                   </span>
                 )}
               </button>

               <button 
                 onClick={() => navigate('/dashboard/print')}
                 className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-on-surface text-surface text-[13px] font-medium hover:opacity-90 transition-all"
               >
                 <Printer size={15} /> Print
               </button>
             </div>
           </header>

           {activeFilterCount > 0 && (
             <div className="flex flex-wrap gap-2">
                {filters.project !== 'All Projects' && <ActiveChip label={filters.project} onClear={() => setFilters({...filters, project: 'All Projects'})} />}
                {filters.inspector !== 'All Inspectors' && <ActiveChip label={filters.inspector} onClear={() => setFilters({...filters, inspector: 'All Inspectors'})} />}
                {filters.status !== 'All Statuses' && <ActiveChip label={filters.status} onClear={() => setFilters({...filters, status: 'All Statuses'})} />}
                <button onClick={clearFilters} className="text-[13px] text-primary px-2 hover:underline transition-all">Clear all</button>
             </div>
           )}

           {/* Stats */}
           <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 reveal-on-scroll">
             <StatCard icon={<ShieldCheck size={20} className="text-primary" />} label="Inspectors" value="12" sub="Active" progress={85} />
             <StatCard icon={<Users size={20} className="text-primary" />} label="Foremen" value={mockForemen.length.toString()} sub="Active" progress={92} />
             <StatCard icon={<Activity size={20} className="text-primary" />} label="Projects" value={mockProjects.length.toString()} sub="Assigned" progress={78} />
             <StatCard icon={<TrendingUp size={20} className="text-primary" />} label="Reports" value={mockReports.length.toString()} sub="Generated" progress={100} />
           </section>

           <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 reveal-on-scroll">
              {/* Projects & Inspectors */}
              <div className="xl:col-span-4 apple-card overflow-hidden flex flex-col">
                  <div className="p-5 border-b border-on-surface/[0.04]">
                    <h4 className="text-[13px] font-medium text-on-surface-variant mb-4">Projects & Inspectors</h4>
                    <div className="space-y-3.5 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
                       {mockProjects.map(p => (
                          <div key={p.id} className="flex flex-col gap-2 border-b border-on-surface/[0.04] pb-3 last:border-0 last:pb-0">
                             <div className="flex items-start justify-between gap-3">
                                <div className="text-[14px] font-medium text-on-surface leading-tight">{p.name}</div>
                                <div className={`px-2 py-0.5 rounded-md text-[11px] font-medium shrink-0 ${
                                   p.status === 'Review Required' ? 'text-review-amber bg-review-amber/10' : 'text-primary bg-primary/[0.08]'
                                }`}>
                                   {p.status}
                                </div>
                             </div>
                             <div className="flex flex-wrap gap-1">
                                {p.inspectors?.map((insp, idx) => (
                                   <span key={idx} className="bg-surface-lowest text-[11px] text-on-surface-variant px-2 py-0.5 rounded-md">
                                      {insp}
                                   </span>
                                ))}
                             </div>
                          </div>
                       ))}
                    </div>
                  </div>
                 <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                       <span className="text-[13px] text-on-surface-variant">Inspector Merit</span>
                       <button className="text-[13px] text-primary font-medium">Rankings</button>
                    </div>
                    <div className="flex justify-between items-center bg-surface-lowest p-3 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-semibold">AVG</div>
                        <span className="text-[13px] font-medium text-on-surface">All Inspectors</span>
                      </div>
                      <div className="text-[14px] font-semibold text-primary bg-primary/[0.08] px-2.5 py-1 rounded-lg">11.5 / 12</div>
                    </div>
                 </div>
              </div>

               {/* Inspection Reports */}
               <div className="xl:col-span-8 space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <h2 className="text-[20px] font-semibold tracking-tight text-on-surface">Inspection Reports</h2>
                    <button className="text-[13px] text-primary font-medium">View all</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredReports.slice(0, 4).map((report) => (
                     <div 
                       key={report.id} 
                       onClick={() => navigate(`/report/${report.id}`)}
                       className="apple-card group p-4 flex flex-col gap-3 cursor-pointer transition-all"
                     >
                       <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2.5 min-w-0">
                             <img src={mockInspectorsData[report.inspector]?.avatar || mockInspectorsData['Mr. Menghour'].avatar} className="w-8 h-8 rounded-full object-cover shrink-0" alt="Inspector" />
                             <div className="min-w-0">
                                <h5 className="text-[13px] font-medium text-on-surface leading-none truncate mb-0.5">{report.inspector}</h5>
                                <p className="text-[11px] text-on-surface-variant truncate">{mockInspectorsData[report.inspector]?.title || 'Senior Auditor'}</p>
                             </div>
                          </div>
                          <div className={`shrink-0 ml-2 px-2 py-0.5 rounded-md text-[11px] font-medium ${
                             report.status === 'Needs Review' ? 'text-review-amber bg-review-amber/10' : 'text-viewed-cyan bg-viewed-cyan/10'
                          }`}>
                             {report.status}
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 pt-3 border-t border-on-surface/[0.04]">
                          <div className="flex flex-col">
                             <span className="text-[11px] text-on-surface-variant mb-0.5">Project</span>
                             <span className="text-[12px] font-medium text-primary truncate">{report.project}</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[11px] text-on-surface-variant mb-0.5">Location</span>
                             <span className="text-[12px] font-medium text-on-surface truncate">{report.subject}</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[11px] text-on-surface-variant mb-0.5">Date</span>
                             <span className="text-[12px] font-medium text-on-surface">{report.date}</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[11px] text-on-surface-variant mb-0.5">Time</span>
                             <span className="text-[12px] font-medium text-on-surface">{report.startTime} – {report.endTime}</span>
                          </div>
                       </div>
                       
                       <div className="pt-3 border-t border-on-surface/[0.04]">
                          <div className="flex justify-between items-center mb-2">
                             <div className="text-[12px] text-on-surface-variant">Foremen Scores</div>
                             <ChevronRight size={14} className="text-on-surface-variant/30 group-hover:text-primary transition-all shrink-0" />
                          </div>
                          <div className="space-y-1.5">
                            {mockForemen.map(f => (
                              <div key={f.id} className="flex items-center justify-between bg-surface-lowest px-2.5 py-1.5 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <img src={f.avatar} className="w-5 h-5 rounded-full object-cover shrink-0" />
                                  <span className="text-[12px] text-on-surface leading-none">{f.name}</span>
                                </div>
                                <span className="text-[12px] font-medium text-primary leading-none">{f.score}/12</span>
                              </div>
                            ))}
                          </div>
                       </div>
                     </div>
                    ))}
                  </div>
               </div>
           </div>
        </div>
        {/* ============================================================== */}
        {/* EXISTING INSIGHTS SECTION */}
        {/* ============================================================== */}
        
        {/* Insights Header */}
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

        <FilterDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          projects={projectsList}
          inspectors={inspectors}
          filters={filters}
          setFilters={setFilters}
          onClear={clearFilters}
          resultCount={filteredReports.length}
        />
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

function StatCard({ icon, label, value, sub, progress }: { icon: any, label: string, value: string, sub: string, progress?: number }) {
  return (
    <div className="apple-card p-5 flex flex-col gap-3 group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/[0.08] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-[12px] text-on-surface-variant mb-0.5">{label}</p>
          <div className="flex items-baseline gap-1.5">
             <span className="text-[22px] font-semibold text-on-surface tracking-tight tabular-nums">{value}</span>
             <span className="text-[11px] text-primary font-medium">{sub}</span>
          </div>
        </div>
      </div>
      
      {progress && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] text-on-surface-variant/60">
            <span>Growth</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 w-full bg-on-surface/[0.04] rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary growth-bar rounded-full" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ActiveChip({ label, onClear }: any) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/[0.08] text-[13px] text-primary shrink-0">
       {label}
       <button onClick={onClear} className="p-0.5 rounded-full hover:bg-primary/20"><X size={12} /></button>
    </div>
  );
}
