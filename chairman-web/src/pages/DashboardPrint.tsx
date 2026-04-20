import { mockProjects, mockForemen, mockReports } from '../data/mockData';
import { ShieldCheck, Printer, List, Activity, TrendingUp } from 'lucide-react';

export default function DashboardPrint() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 print:p-0">
      {/* Print Controls - Hidden during print */}
      <div className="mb-6 md:mb-8 flex justify-between items-center border-b border-black/[0.06] pb-5 print:hidden">
        <div>
          <h1 className="text-[18px] md:text-[20px] font-semibold text-on-surface">Daily Summary</h1>
          <p className="text-[12px] md:text-[13px] text-on-surface-variant mt-1">Dashboard Snapshot // {new Date().toLocaleDateString()}</p>
        </div>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl bg-primary text-white text-[12px] md:text-[13px] font-medium hover:opacity-90 transition-all"
        >
          <Printer size={15} /> Print
        </button>
      </div>

      {/* Official Print Document */}
      <div className="w-full max-w-[210mm] mx-auto md:p-[15mm] print:p-0">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between md:items-start gap-4 border-b border-black/10 pb-6 mb-8 print:flex-row print:gap-0">
          <div>
            <div className="flex items-center gap-2 text-primary mb-3">
               <ShieldCheck size={24} />
               <span className="font-semibold text-lg text-black">Inspector</span>
            </div>
            <h2 className="text-[24px] md:text-[28px] font-semibold text-black tracking-tight leading-none text-balance">Overview Report</h2>
            <p className="text-[12px] text-black/50 mt-2">Generated for Executive Review</p>
          </div>
          <div className="md:text-right print:text-right">
             <div className="text-[11px] text-black/50 mb-0.5">Date</div>
             <div className="text-[15px] font-medium text-black">{new Date().toLocaleDateString()}</div>
          </div>
        </header>

        {/* Global Stats */}
        <section className="mb-10">
            <h3 className="text-[14px] font-medium text-black mb-4">Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 print:grid-cols-4">
                <PrintStatBox label="Inspectors" value="12" sub="Active" />
                <PrintStatBox label="Foremen" value={mockForemen.length.toString()} sub="On-Site" />
                <PrintStatBox label="Projects" value={mockProjects.length.toString()} sub="Active" />
                <PrintStatBox label="Reports" value={mockReports.length.toString()} sub="Generated" />
            </div>
        </section>

        {/* Project Matrix */}
        <section className="mb-10">
            <h3 className="text-[14px] font-medium text-black mb-4">Project Allocation</h3>
            <div className="overflow-x-auto print:overflow-visible w-full">
                <table className="w-full text-left border-collapse min-w-[500px] print:min-w-full">
                    <thead>
                        <tr className="border-b border-black/[0.06]">
                            <th className="py-2 text-[12px] font-medium text-black/50">Project</th>
                            <th className="py-2 text-[12px] font-medium text-black/50">Status</th>
                            <th className="py-2 text-[12px] font-medium text-black/50">Assigned</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.04]">
                        {mockProjects.map(p => (
                            <tr key={p.id}>
                                <td className="py-3 text-[13px] text-black font-medium">{p.name}</td>
                                <td className="py-3">
                                    <span className={`px-2 py-1 rounded text-[11px] font-medium ${
                                        p.status === 'Review Required' ? 'text-orange-600 bg-orange-50' : 'text-blue-600 bg-blue-50'
                                    }`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="py-3 text-[12px] text-black/60">
                                    {p.inspectors?.join(', ')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

        {/* Feed */}
        <section className="mb-10">
            <h3 className="text-[14px] font-medium text-black mb-4">Recent Reports</h3>
            <div className="grid grid-cols-1 gap-3 print:gap-2">
                {mockReports.map(report => (
                    <div key={report.id} className="p-3 md:p-4 rounded-xl border border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:flex-row print:p-3">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 print:flex-row print:gap-8">
                            <div>
                                <div className="text-[11px] text-black/50 mb-0.5">Inspector</div>
                                <div className="text-[13px] text-black font-medium">{report.inspector}</div>
                            </div>
                            <div>
                                <div className="text-[11px] text-black/50 mb-0.5">Project</div>
                                <div className="text-[13px] text-black font-medium">{report.project}</div>
                            </div>
                            <div>
                                <div className="text-[11px] text-black/50 mb-0.5">Location</div>
                                <div className="text-[13px] text-black font-medium break-words max-w-[150px] md:max-w-none print:max-w-none">{report.subject}</div>
                            </div>
                        </div>
                        <div className="text-left sm:text-right print:text-right border-t border-black/[0.04] sm:border-0 pt-2 sm:pt-0 print:border-0 print:pt-0">
                             <div className="text-[11px] text-black/50 mb-0.5">Score</div>
                             <div className="text-[16px] font-medium text-blue-600">{report.score}%</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 md:mt-16 pt-6 border-t border-black/[0.06] flex justify-between items-center text-[10px] text-black/40">
            <span>Inspector Web Protocol</span>
            <span>Ref: {Math.random().toString(36).substring(7).toUpperCase()}</span>
        </footer>
      </div>
    </div>
  );
}

function PrintStatBox({ label, value, sub }: any) {
    return (
        <div className="p-4 rounded-xl border border-black/[0.06]">
            <div className="text-[11px] text-black/50 mb-1">{label}</div>
            <div className="text-[24px] font-semibold text-black tracking-tight mb-1 leading-none">{value}</div>
            <div className="text-[11px] text-black/50">{sub}</div>
        </div>
    );
}
