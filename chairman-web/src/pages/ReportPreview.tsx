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
    <div className="flex-1 min-h-screen bg-surface-low print:bg-white pb-20">
      {/* Top Bar - Hidden during print */}
      <div className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-on-surface/[0.06] px-6 py-4 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <Link to={`/report/${report.id}`} className="p-2 rounded-full hover:bg-surface-lowest transition-colors">
            <ChevronLeft size={20} className="text-on-surface-variant" />
          </Link>
          <div>
            <h1 className="text-[15px] font-semibold text-on-surface leading-none mb-0.5">Print Preview</h1>
            <p className="text-[12px] text-on-surface-variant">{report.id} / {report.project}</p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-[13px] font-medium hover:opacity-90 transition-all shadow-ambient"
          >
            <Printer size={16} /> Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-on-surface/[0.08] bg-surface text-on-surface text-[13px] font-medium hover:bg-surface-lowest transition-all">
            <Download size={16} /> PDF
          </button>
        </div>
      </div>

      {/* Report Document Canvas */}
      <main className="max-w-[210mm] mx-auto mt-8 shadow-card print:shadow-none print:mt-0 print:p-0 rounded-2xl overflow-hidden print:rounded-none">
        <ReportDocument report={report as any} />
      </main>
    </div>
  );
}
