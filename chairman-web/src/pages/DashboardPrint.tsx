import { mockProjects, mockForemen, mockReports } from '../data/mockData';
import { ShieldCheck, FileText, List, Activity, TrendingUp } from 'lucide-react';

export default function DashboardPrint() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white p-10 print:p-0">
      {/* Print Controls - Hidden during print */}
      <div className="mb-10 flex justify-between items-center border-b border-slate-100 pb-6 print:hidden">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Daily Intelligence Summary</h1>
          <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest">Dashboard Snapshot • {new Date().toLocaleDateString()}</p>
        </div>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
        >
          <List size={16} /> Execute Print
        </button>
      </div>

      {/* Official Print Document */}
      <div className="max-w-[210mm] mx-auto border border-slate-100 p-[15mm]">
        {/* Header */}
        <header className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
               <ShieldCheck size={28} />
               <span className="font-black text-xl tracking-tighter text-slate-900 uppercase">Chairman Intelligence</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Operational Overview Report</h2>
            <p className="text-[10px] font-bold text-slate-500 mt-4 uppercase tracking-[0.2em]">Generated for Executive Review • Data Node v2.4</p>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Dossier Date</div>
             <div className="text-lg font-black text-slate-900">{new Date().toLocaleDateString()}</div>
          </div>
        </header>

        {/* Global Resilience Stats */}
        <section className="mb-12">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] mb-6 border-l-4 border-emerald-500 pl-4">I. Resilience Metrics</h3>
            <div className="grid grid-cols-4 gap-4">
                <PrintStatBox label="Field Inspectors" value="12" sub="Verified Active" />
                <PrintStatBox label="Foremen Logged" value={mockForemen.length.toString()} sub="On-Site Today" />
                <PrintStatBox label="Live Projects" value={mockProjects.length.toString()} sub="Active Streams" />
                <PrintStatBox label="Daily Reports" value={mockReports.length.toString()} sub="Protocol Commits" />
            </div>
        </section>

        {/* Project Matrix */}
        <section className="mb-12">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] mb-6 border-l-4 border-emerald-500 pl-4">II. Project Allocation Matrix</h3>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-200">
                        <th className="py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Project Name</th>
                        <th className="py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Assigned Personnel</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {mockProjects.map(p => (
                        <tr key={p.id}>
                            <td className="py-4 text-[11px] font-black text-slate-900">{p.name}</td>
                            <td className="py-4">
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                                    p.status === 'Review Required' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                }`}>
                                    {p.status}
                                </span>
                            </td>
                            <td className="py-4 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                {p.inspectors?.join(' • ')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>

        {/* Inspection Intelligence Feed */}
        <section className="mb-12">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] mb-6 border-l-4 border-emerald-500 pl-4">III. Inspection Intelligence Feed</h3>
            <div className="grid grid-cols-1 gap-4">
                {mockReports.map(report => (
                    <div key={report.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <div className="flex gap-10">
                            <div>
                                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Inspector</div>
                                <div className="text-[11px] font-black text-slate-900 leading-none">{report.inspector}</div>
                            </div>
                            <div>
                                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Project</div>
                                <div className="text-[11px] font-black text-slate-900 leading-none">{report.project}</div>
                            </div>
                            <div>
                                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Location</div>
                                <div className="text-[11px] font-black text-slate-900 leading-none">{report.subject}</div>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Operational Score</div>
                             <div className="text-xl font-black text-emerald-600 leading-none italic">{report.score}%</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center text-[8px] font-black text-slate-300 uppercase tracking-[0.6em]">
            <span>Chairman Global Terminal</span>
            <span>Document Checksum: #DASH-{Math.random().toString(36).substring(7).toUpperCase()}</span>
        </footer>
      </div>
    </div>
  );
}

function PrintStatBox({ label, value, sub }: any) {
    return (
        <div className="p-6 rounded-2xl bg-white border border-slate-100 text-center shadow-sm">
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</div>
            <div className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{value}</div>
            <div className="text-[7px] font-bold text-emerald-600 italic uppercase tracking-widest">{sub}</div>
        </div>
    );
}
