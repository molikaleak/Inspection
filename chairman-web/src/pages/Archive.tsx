import { mockReports, mockProjects, mockInspectorsData } from '../data/mockData';
import { ChevronRight, Filter, FileText, Printer, X, Search } from 'lucide-react';
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
    <div className="flex-1 lg:pl-60 min-h-screen bg-surface">
      <main className="max-w-6xl mx-auto p-5 md:p-8 space-y-6 pb-32 lg:pb-8">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-5 border-b border-on-surface/[0.06]">
          <div>
            <h1 className="text-[28px] font-semibold tracking-tight text-on-surface leading-none">Archive</h1>
            <p className="text-[13px] text-primary font-medium mt-1">Archived field reports</p>
          </div>
          <div className="flex items-center gap-2.5">
            <button 
               onClick={() => setIsDrawerOpen(true)}
               className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-low border border-on-surface/[0.06] text-[13px] text-on-surface-variant hover:text-on-surface transition-all relative"
            >
               <Filter size={15} />
               Filters
               {activeFilterCount > 0 && (
                 <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-medium">{activeFilterCount}</span>
               )}
            </button>
            <Link 
              to="/reports/print-all"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-on-surface text-surface text-[13px] font-medium hover:opacity-90 transition-all shrink-0"
            >
              <Printer size={15} /> Print All
            </Link>
          </div>
        </header>

        {/* Applied Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 reveal-on-scroll">
             {filters.project !== 'All Projects' && <ActiveChip label={filters.project} onClear={() => setFilters({...filters, project: 'All Projects'})} />}
             {filters.inspector !== 'All Inspectors' && <ActiveChip label={filters.inspector} onClear={() => setFilters({...filters, inspector: 'All Inspectors'})} />}
             {filters.status !== 'All Statuses' && <ActiveChip label={filters.status} onClear={() => setFilters({...filters, status: 'All Statuses'})} />}
             <button onClick={clearFilters} className="text-[13px] text-primary px-2 hover:underline transition-all">Clear all</button>
          </div>
        )}

        {/* Reports Table */}
        <section className="apple-card overflow-hidden reveal-on-scroll">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-low/50 border-b border-on-surface/[0.06]">
                     <tr>
                        <th className="px-5 py-3 text-[12px] font-medium text-on-surface-variant">ID</th>
                        <th className="px-5 py-3 text-[12px] font-medium text-on-surface-variant">Subject</th>
                        <th className="px-5 py-3 text-[12px] font-medium text-on-surface-variant">Project</th>
                        <th className="px-5 py-3 text-[12px] font-medium text-on-surface-variant">Inspector</th>
                        <th className="px-5 py-3 text-[12px] font-medium text-on-surface-variant text-right"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-on-surface/[0.04]">
                     {paginatedReports.map((report) => (
                       <tr 
                         key={report.id}
                         onClick={() => navigate(`/report/${report.id}`)}
                         className="group hover:bg-surface-lowest/50 transition-all cursor-pointer"
                       >
                          <td className="px-5 py-4">
                             <div className="flex flex-col">
                                <span className="text-[13px] font-medium text-on-surface">#{report.id}</span>
                                <span className="text-[11px] text-on-surface-variant mt-0.5">{report.date}</span>
                             </div>
                          </td>
                          <td className="px-5 py-4">
                             <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-surface-low flex items-center justify-center text-primary">
                                   <FileText size={14} />
                                </div>
                                <span className="text-[13px] font-medium text-on-surface">{report.subject}</span>
                             </div>
                          </td>
                          <td className="px-5 py-4">
                             <span className="text-[13px] text-primary font-medium">{report.project}</span>
                          </td>
                          <td className="px-5 py-4">
                             <div className="flex items-center gap-2">
                                <img src={mockInspectorsData[report.inspector]?.avatar} className="w-6 h-6 rounded-full" alt="" />
                                <span className="text-[13px] text-on-surface-variant">{report.inspector}</span>
                             </div>
                          </td>
                          <td className="px-5 py-4 text-right">
                             <ChevronRight size={16} className="inline text-on-surface-variant/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                          </td>
                       </tr>
                     ))}
                  </tbody>
              </table>
              {filteredReports.length === 0 && (
                <div className="py-16 text-center">
                   <p className="text-[13px] text-on-surface-variant">No matching reports found</p>
                </div>
              )}
           </div>
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4">
             <div className="flex items-center gap-2">
               <button 
                 onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                 disabled={currentPage === 1}
                 className="px-3.5 py-2 rounded-lg bg-surface-low border border-on-surface/[0.06] text-[13px] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-on-surface hover:text-surface transition-all"
               >
                 Previous
               </button>
               <div className="flex items-center gap-1">
                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                   <button
                     key={page}
                     onClick={() => setCurrentPage(page)}
                     className={`w-8 h-8 rounded-lg text-[13px] transition-all ${
                       currentPage === page 
                         ? 'bg-primary text-white' 
                         : 'text-on-surface-variant hover:bg-on-surface/[0.04]'
                     }`}
                   >
                     {page}
                   </button>
                 ))}
               </div>
               <button 
                 onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                 disabled={currentPage === totalPages}
                 className="px-3.5 py-2 rounded-lg bg-surface-low border border-on-surface/[0.06] text-[13px] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-on-surface hover:text-surface transition-all"
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
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/[0.08] text-[13px] text-primary">
       {label}
       <button onClick={onClear} className="p-0.5 rounded-full hover:bg-primary/20"><X size={12} /></button>
    </div>
  );
}
