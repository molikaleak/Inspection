import { Link } from 'react-router-dom';
import { mockReports } from '../data/mockData';
import { ChevronLeft, Printer } from 'lucide-react';
import ReportDocument from '../components/ReportDocument';

export default function ReportsPrintAll() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 min-h-screen bg-surface-low print:bg-white pb-20">
      {/* Top Bar - Hidden during print */}
      <div className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-on-surface/[0.06] px-6 py-4 flex items-center justify-between print:hidden shadow-ambient">
        <div className="flex items-center gap-4">
          <Link to="/archive" className="p-2 rounded-full hover:bg-surface-lowest transition-colors text-on-surface-variant hover:text-on-surface">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-[15px] font-semibold text-on-surface leading-none mb-0.5">Batch Print Stream</h1>
            <p className="text-[12px] text-on-surface-variant">{mockReports.length} Reports Queued</p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-[13px] font-medium hover:opacity-90 transition-all shadow-ambient"
          >
            <Printer size={16} /> Print All
          </button>
        </div>
      </div>

      <div className="max-w-[210mm] mx-auto space-y-12 py-8 print:py-0 print:space-y-0">
        {mockReports.map((report) => (
          <div key={report.id} className="shadow-card print:shadow-none overflow-hidden rounded-2xl print:rounded-none">
             <ReportDocument report={report as any} />
          </div>
        ))}
      </div>

      <div className="max-w-xs mx-auto mt-16 text-center print:hidden">
         <p className="text-[12px] text-on-surface-variant/50">End of queue</p>
      </div>
    </div>
  );
}
