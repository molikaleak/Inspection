import { useState, useMemo } from 'react';
import { mockProjects, mockForemen, mockReports, mockInspectorsData } from '../data/mockData';
import { ChevronRight, Filter, Download, Printer, Activity, ShieldCheck, Users, TrendingUp, Search, X } from 'lucide-react';
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
    <div className="flex-1 lg:pl-64 min-h-screen bg-surface transition-all overflow-hidden flex flex-col">
      <main className="flex-1 max-w-[1600px] mx-auto w-full p-4 md:p-6 space-y-6 overflow-y-auto no-scrollbar pb-32 lg:pb-6">
        
        {/* Compressed Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-on-surface/5">
          <div className="relative group flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search intelligence..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface-low border border-on-surface/5 text-[10px] font-black uppercase tracking-widest outline-none transition-all focus:ring-2 ring-primary/20"
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-surface-low border border-on-surface/5 text-[10px] font-black uppercase tracking-widest hover:bg-on-surface hover:text-surface transition-all group relative"
            >
              <Filter size={16} className="text-on-surface-variant group-hover:text-inherit" />
              Filter
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-surface rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => navigate('/dashboard/print')}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-on-surface text-surface text-[10px] font-black uppercase tracking-widest hover:shadow-glow transition-all"
            >
              <Printer size={16} /> Print Report
            </button>
          </div>
        </header>

        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
             {filters.project !== 'All Projects' && <ActiveChip label={filters.project} onClear={() => setFilters({...filters, project: 'All Projects'})} />}
             {filters.inspector !== 'All Inspectors' && <ActiveChip label={filters.inspector} onClear={() => setFilters({...filters, inspector: 'All Inspectors'})} />}
             {filters.status !== 'All Statuses' && <ActiveChip label={filters.status} onClear={() => setFilters({...filters, status: 'All Statuses'})} />}
             <button onClick={clearFilters} className="text-[10px] font-bold text-primary px-3 uppercase tracking-widest hover:underline transition-all">Clear All</button>
          </div>
        )}

        {/* High-Density Stats Console */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 reveal-on-scroll">
          <StatCard icon={<ShieldCheck className="text-primary" />} label="Field Inspectors" value="12" sub="Active" progress={85} />
          <StatCard icon={<Users className="text-primary" />} label="Foremen" value={mockForemen.length.toString()} sub="Active" progress={92} />
          <StatCard icon={<Activity className="text-primary" />} label="Projects" value={mockProjects.length.toString()} sub="Assigned" progress={78} />
          <StatCard icon={<TrendingUp className="text-primary" />} label="Reports" value={mockReports.length.toString()} sub="Generated" progress={100} />
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 reveal-on-scroll">
           {/* Detailed Profile View (Compressed) */}
           <div className="xl:col-span-4 editorial-card overflow-hidden flex flex-col">
               <div className="p-6 border-b border-on-surface/5 bg-on-surface/[0.01]">
                 <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-on-surface-variant mb-4">Projects & Inspectors</h4>
                 <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
                    {mockProjects.map(p => (
                       <div key={p.id} className="flex flex-col gap-2 border-b border-on-surface/5 pb-3 last:border-0 last:pb-0">
                          <div className="flex items-start justify-between gap-4">
                             <div className="text-sm font-black text-on-surface leading-tight">{p.name}</div>
                             <div className={`px-2 py-0.5 rounded border text-[6px] font-black uppercase tracking-widest shrink-0 ${
                                p.status === 'Review Required' ? 'text-review-amber border-review-amber/30 bg-review-amber/5' : 'text-primary border-primary/30 bg-emerald-500/5'
                             }`}>
                                {p.status}
                             </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                             {p.inspectors?.map((insp, idx) => (
                                <span key={idx} className="bg-surface-lowest text-[9px] font-bold text-on-surface-variant px-2 py-1 rounded-lg border border-on-surface/5 shadow-sm">
                                   {insp}
                                </span>
                             ))}
                          </div>
                       </div>
                    ))}
                 </div>
               </div>
              <div className="p-6 space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black text-on-surface-variant uppercase tracking-widest">Inspector Merit</span>
                    <button className="text-[8px] font-black text-primary uppercase">Rankings</button>
                 </div>
                 <div className="flex justify-between items-center bg-surface-lowest p-3 rounded-lg border border-on-surface/5">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full emerald-gradient flex items-center justify-center text-on-surface text-xs font-bold">AVG</div>
                     <span className="text-xs font-black text-on-surface uppercase tracking-widest">All Inspectors</span>
                   </div>
                   <div className="text-sm font-black text-primary bg-primary/10 px-2 py-1 rounded">11.5 / 12</div>
                 </div>
              </div>
           </div>

            {/* Inspection Report */}
            <div className="xl:col-span-8 space-y-4">
               <div className="flex justify-between items-center px-1">
                 <h2 className="text-xl font-black tracking-tighter text-on-surface italic">Inspection Report</h2>
                 <button className="text-[8px] font-black text-primary uppercase tracking-[0.3em] border-b border-primary/30">View All</button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {filteredReports.slice(0, 4).map((report) => (
                  <div 
                    key={report.id} 
                    onClick={() => navigate(`/report/${report.id}`)}
                    className="editorial-card group hover:bg-on-surface/[0.02] p-4 flex flex-col gap-4 cursor-pointer transition-all border-on-surface/5"
                  >
                    <div className="flex justify-between items-start">
                       <div className="flex items-center gap-3 min-w-0">
                          <img src={mockInspectorsData[report.inspector]?.avatar || mockInspectorsData['Mr. Menghour'].avatar} className="w-8 h-8 rounded-full border border-on-surface/10 object-cover shrink-0" alt="Inspector" />
                          <div className="min-w-0">
                             <h5 className="text-[11px] font-black text-on-surface leading-none truncate mb-1">{report.inspector}</h5>
                             <p className="text-[8px] text-on-surface-variant font-bold uppercase tracking-widest truncate">{mockInspectorsData[report.inspector]?.title || 'Senior Auditor'}</p>
                          </div>
                       </div>
                       <div className={`shrink-0 ml-2 px-2 py-1 rounded text-[8px] font-black tracking-widest uppercase border ${
                          report.status === 'Needs Review' ? 'text-review-amber border-review-amber/20 bg-review-amber/10' : 'text-viewed-cyan border-viewed-cyan/20 bg-viewed-cyan/10'
                       }`}>
                          {report.status}
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-3 border-t border-on-surface/5">
                       <div className="flex flex-col">
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50 mb-0.5">Project</span>
                          <span className="text-[9px] font-black tracking-tight text-primary truncate border-b border-primary/20 pb-0.5 inline-block">{report.project}</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50 mb-0.5">Location</span>
                          <span className="text-[9px] font-black tracking-tight text-on-surface truncate">{report.subject}</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50 mb-0.5">Date</span>
                          <span className="text-[9px] font-black tracking-tight text-on-surface">{report.date}</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50 mb-0.5">Time</span>
                          <span className="text-[9px] font-black tracking-tight text-on-surface">{report.startTime} - {report.endTime}</span>
                       </div>
                    </div>
                    
                    <div className="pt-3 border-t border-on-surface/5">
                       <div className="flex justify-between items-center mb-2">
                          <div className="text-[9px] font-black text-on-surface uppercase tracking-[0.2em] opacity-60">Foremen Scores</div>
                          <ChevronRight size={14} className="text-on-surface/20 group-hover:text-primary transition-all shrink-0" />
                       </div>
                       <div className="space-y-1.5">
                         {mockForemen.map(f => (
                           <div key={f.id} className="flex items-center justify-between bg-surface-lowest px-2 py-1.5 rounded border border-on-surface/5">
                             <div className="flex items-center gap-2">
                               <img src={f.avatar} className="w-5 h-5 rounded object-cover shrink-0" />
                               <span className="text-[10px] font-bold text-on-surface leading-none">{f.name}</span>
                             </div>
                             <span className="text-[10px] font-black text-primary leading-none">{f.score}/12</span>
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
    <div className="editorial-card p-6 flex flex-col gap-4 group hover:bg-primary/[0.02] relative overflow-hidden animate-float" style={{ animationDelay: `${Math.random()}s` }}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-lg shadow-inner group-hover:scale-110 group-hover:bg-primary transition-all group-hover:text-white shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-[10px] uppercase font-black tracking-[0.2em] text-on-surface-variant mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
             <span className="text-2xl font-black text-on-surface tracking-tighter tabular-nums">{value}</span>
             <span className="text-[10px] font-black text-primary">{sub}</span>
          </div>
        </div>
      </div>
      
      {progress && (
        <div className="space-y-2 mt-2">
          <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-on-surface-variant/40">
            <span>Operational Growth</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-on-surface/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary growth-bar shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
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
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest shrink-0">
       {label}
       <button onClick={onClear} className="p-0.5 rounded-full hover:bg-primary/20"><X size={12} /></button>
    </div>
  );
}
