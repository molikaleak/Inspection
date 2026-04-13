import { Link } from 'react-router-dom';
import { mockReports } from '../data/mockData';
import { ChevronLeft, Printer, Download, LayoutGrid } from 'lucide-react';
import ReportDocument from '../components/ReportDocument';

export default function ReportsPrintAll() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-900 print:bg-white pb-20">
      {/* Top Bar - Hidden during print */}
      <div className="sticky top-0 z-50 bg-slate-900 border-b border-white/5 px-6 py-4 flex items-center justify-between shadow-2xl print:hidden">
        <div className="flex items-center gap-4">
          <Link to="/archive" className="p-2 rounded-full hover:bg-white/5 transition-colors text-white">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-sm font-black text-white uppercase tracking-widest leading-none">Batch Intelligence Stream</h1>
            <p className="text-[10px] font-bold text-slate-400 mt-1">{mockReports.length} Dossiers Queued for Output</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-3 px-6 py-2.5 rounded-xl bg-primary text-on-primary text-[10px] font-black uppercase tracking-widest hover:shadow-glow transition-all"
          >
            <Printer size={16} /> Print All Intelligence
          </button>
        </div>
      </div>

      <div className="max-w-[210mm] mx-auto space-y-20 py-10 print:py-0 print:space-y-0">
        {mockReports.map((report) => (
          <div key={report.id} className="shadow-2xl print:shadow-none overflow-hidden rounded-[2rem] print:rounded-none">
             <ReportDocument report={report as any} />
          </div>
        ))}
      </div>

      <div className="max-w-xs mx-auto mt-20 text-center print:hidden">
         <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">End of Collection</p>
      </div>
    </div>
  );
}
