import { mockReports, mockProjects, mockInspectorsData } from '../data/mockData';
import { ChevronRight, Filter, Calendar, FileText, Printer, X, Search } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FilterDrawer from '../components/FilterDrawer';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Archive() {
  useScrollReveal();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    project: 'All Projects',
    inspector: 'All Inspectors',
    status: 'All Statuses'
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Derived data for filters
  const inspectors = useMemo(() => ['All Inspectors', ...Object.keys(mockInspectorsData)], []);
  const projects = useMemo(() => ['All Projects', ...mockProjects.map(p => p.name)], []);

  // Filtering Logic
  const filteredReports = useMemo(() => {
    return mockReports.filter(report => {
      const matchesSearch = report.subject.toLowerCase().includes(filters.search.toLowerCase()) || 
                           report.id.toLowerCase().includes(filters.search.toLowerCase()) ||
                           report.project.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesProject = filters.project === 'All Projects' || report.project === filters.project;
      const matchesInspector = filters.inspector === 'All Inspectors' || report.inspector === filters.inspector;
      const matchesStatus = filters.status === 'All Statuses' || report.status === filters.status;

      return matchesSearch && matchesProject && matchesInspector && matchesStatus;
    });
  }, [filters]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);
  const paginatedReports = filteredReports.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
    <div className="flex-1 lg:pl-64 min-h-screen bg-surface">
      <main className="max-w-6xl mx-auto p-5 md:p-10 space-y-12 pb-32 lg:pb-10">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-on-surface/5">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface leading-none">Intelligence Archive</h1>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mt-2 underline underline-offset-4 decoration-primary/20">Archived Field Dossiers</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
               onClick={() => setIsDrawerOpen(true)}
               className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-surface-low border border-on-surface/5 text-[10px] font-black uppercase tracking-widest hover:bg-on-surface hover:text-surface transition-all group relative"
            >
               <Filter size={16} className="text-on-surface-variant group-hover:text-inherit" />
               Filter Intelligence
               {activeFilterCount > 0 && (
                 <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-surface rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg shadow-primary/20">{activeFilterCount}</span>
               )}
            </button>
            <Link 
              to="/reports/print-all"
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-on-surface text-surface text-[10px] font-black uppercase tracking-widest hover:shadow-glow transition-all shrink-0"
            >
              <Printer size={16} /> Print All
            </Link>
          </div>
        </header>

        {/* Applied Filter Chips (Inline) */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-300 reveal-on-scroll">
             {filters.project !== 'All Projects' && <ActiveChip label={filters.project} onClear={() => setFilters({...filters, project: 'All Projects'})} />}
             {filters.inspector !== 'All Inspectors' && <ActiveChip label={filters.inspector} onClear={() => setFilters({...filters, inspector: 'All Inspectors'})} />}
             {filters.status !== 'All Statuses' && <ActiveChip label={filters.status} onClear={() => setFilters({...filters, status: 'All Statuses'})} />}
             <button onClick={clearFilters} className="text-[10px] font-bold text-primary px-3 uppercase tracking-widest hover:underline transition-all">Clear All</button>
          </div>
        )}

        {/* Global Reports Table/List (High-Density) */}
        <section className="pb-20 overflow-hidden editorial-card reveal-on-scroll">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead className="bg-on-surface/[0.02] border-b border-on-surface/5">
                     <tr>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Intelligence ID</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Operational Subject</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Project Vector</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Executive</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-on-surface/[0.03]">
                     {paginatedReports.map((report) => (
                       <tr 
                         key={report.id}
                         onClick={() => navigate(`/report/${report.id}`)}
                         className="group hover:bg-on-surface/[0.01] transition-all cursor-pointer"
                       >
                          <td className="px-6 py-6">
                             <div className="flex flex-col">
                                <span className="text-xs font-black text-on-surface tracking-tighter">#{report.id}</span>
                                <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">{report.date}</span>
                             </div>
                          </td>
                          <td className="px-6 py-6">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-surface-low border border-on-surface/5 flex items-center justify-center text-primary">
                                   <FileText size={16} />
                                </div>
                                <span className="text-sm font-black text-on-surface tracking-tight">{report.subject}</span>
                             </div>
                          </td>
                          <td className="px-6 py-6">
                             <span className="text-[10px] font-black text-primary uppercase tracking-widest border-b border-primary/20 pb-0.5">{report.project}</span>
                          </td>
                          <td className="px-6 py-6">
                             <div className="flex items-center gap-2">
                                <img src={mockInspectorsData[report.inspector]?.avatar} className="w-6 h-6 rounded-full border border-on-surface/10" alt="" />
                                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{report.inspector}</span>
                             </div>
                          </td>
                          <td className="px-6 py-6 text-right">
                             <ChevronRight size={18} className="inline text-on-surface-variant/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </td>
                       </tr>
                     ))}
                  </tbody>
              </table>
              {filteredReports.length === 0 && (
                <div className="py-20 text-center">
                   <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em]">No matching intelligence dossiers found</p>
                </div>
              )}
           </div>
        </section>

        {/* PDA Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-on-surface/5">
             <div className="flex items-center gap-4">
               <button 
                 onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                 disabled={currentPage === 1}
                 className="px-4 py-2 rounded-xl bg-surface-low border border-on-surface/5 text-[10px] font-black uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-on-surface hover:text-surface transition-all"
               >
                 Prev
               </button>
               <div className="flex items-center gap-1">
                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                   <button
                     key={page}
                     onClick={() => setCurrentPage(page)}
                     className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${
                       currentPage === page 
                         ? 'bg-primary text-surface shadow-lg shadow-primary/20' 
                         : 'text-on-surface-variant hover:bg-on-surface/5'
                     }`}
                   >
                     {page}
                   </button>
                 ))}
               </div>
               <button 
                 onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                 disabled={currentPage === totalPages}
                 className="px-4 py-2 rounded-xl bg-surface-low border border-on-surface/5 text-[10px] font-black uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-on-surface hover:text-surface transition-all"
               >
                 Next
               </button>
             </div>
          </div>
        )}

        <FilterDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          projects={projects}
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

function ActiveChip({ label, onClear }: any) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest">
       {label}
       <button onClick={onClear} className="p-0.5 rounded-full hover:bg-primary/20"><X size={12} /></button>
    </div>
  );
}
