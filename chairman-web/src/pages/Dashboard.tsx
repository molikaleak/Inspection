import { useState, useMemo } from 'react';
import { mockProjects, mockForemen, mockReports, mockInspectorsData } from '../data/mockData';
import { ChevronRight, Filter, Printer, Activity, ShieldCheck, Users, TrendingUp, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FilterDrawer from '../components/FilterDrawer';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Dashboard() {
  useScrollReveal();
  const navigate = useNavigate();
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

  return (
    <div className="flex-1 lg:pl-60 min-h-screen bg-surface transition-all overflow-hidden flex flex-col">
      <main className="flex-1 max-w-[1400px] mx-auto w-full p-5 md:p-8 space-y-6 overflow-y-auto no-scrollbar pb-32 lg:pb-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-on-surface/[0.06]">
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
