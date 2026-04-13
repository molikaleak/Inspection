import { useParams, Link } from 'react-router-dom';
import { mockReports } from '../data/mockData';
import { ChevronLeft, Printer, Download } from 'lucide-react';
import ReportDocument from '../components/ReportDocument';

export default function ReportPreview() {
  const { id } = useParams();
  const report = mockReports.find(r => r.id === id) || mockReports[0];
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-50 print:bg-white pb-20">
      {/* Top Bar - Hidden during print */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm print:hidden">
        <div className="flex items-center gap-4">
          <Link to={`/report/${report.id}`} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <ChevronLeft size={20} className="text-slate-600" />
          </Link>
          <div>
            <h1 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Intelligence Preview</h1>
            <p className="text-[10px] font-bold text-slate-500 mt-1">{report.id} • {report.project}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
          >
            <Printer size={16} /> Print Document
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
            <Download size={16} /> Save as PDF
          </button>
        </div>
      </div>

      {/* Report Document Canvas */}
      <main className="max-w-[210mm] mx-auto mt-10 shadow-2xl print:shadow-none print:mt-0 print:p-0">
        <ReportDocument report={report as any} />
      </main>
    </div>
  );
}
