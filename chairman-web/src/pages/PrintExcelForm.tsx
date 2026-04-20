import { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { mockReports, mockForemen, mockChecklist, mockInspectorsData } from '../data/mockData';
import ExcelFormView from '../components/ExcelFormView';
import { Printer, ChevronLeft } from 'lucide-react';

export default function PrintExcelForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const report = mockReports.find(r => r.id === id);
  const scope = searchParams.get('scope') || 'single';
  const foremanId = searchParams.get('foremanId');

  const getForemenForInspector = (inspectorName: string) => {
    if (inspectorName === 'Mr. Menghour') return mockForemen.slice(0, 3);
    if (inspectorName === 'Kimsour') return mockForemen.slice(2, 5);
    if (inspectorName === 'Dara') return [mockForemen[0], mockForemen[4]];
    if (inspectorName === 'Channary') return mockForemen.slice(1, 4);
    return mockForemen;
  };

  if (!report) return <div>Report not found</div>;

  const relevantForemen = scope === 'all' 
     ? getForemenForInspector(report.inspector)
     : mockForemen.filter(f => f.id === foremanId);

  return (
    <div className="bg-surface-low min-h-screen pb-20 print:bg-white print:p-0">
      <div className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-on-surface/[0.06] px-6 py-4 flex items-center justify-between print:hidden shadow-ambient">
         <div className="flex items-center gap-4">
           <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-surface-lowest transition-colors text-on-surface-variant hover:text-on-surface">
             <ChevronLeft size={20} />
           </button>
           <div>
             <h1 className="text-[15px] font-semibold text-on-surface leading-none mb-0.5">Export Document</h1>
             <p className="text-[12px] text-on-surface-variant">{relevantForemen.length} Foreman Report(s) Generated</p>
           </div>
         </div>
         <div className="flex gap-2.5">
           <button 
             onClick={() => window.print()}
             className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-[13px] font-medium hover:opacity-90 transition-all shadow-ambient"
           >
             <Printer size={16} /> Print / Save as PDF
           </button>
         </div>
      </div>

      <div className="py-8 print:py-0">
         {relevantForemen.map((f, i) => (
             <div key={f.id} className={`${i > 0 ? 'print:break-before-page mt-16 print:mt-0' : ''}`}>
                 <ExcelFormView report={report} foreman={f} checklist={mockChecklist} inspectorImage={mockInspectorsData[report.inspector]?.avatar} />
             </div>
         ))}
      </div>
    </div>
  );
}
