import { ShieldCheck, Calendar, MapPin, FileText } from 'lucide-react';
import { mockInspectorsData, mockForemen, mockChecklist } from '../data/mockData';

interface ReportDocumentProps {
  report: {
    id: string;
    project: string;
    subject: string;
    date: string;
    score: number;
    inspector: string;
    startTime: string;
    endTime: string;
  };
}

export default function ReportDocument({ report }: ReportDocumentProps) {
  const allFindings = mockForemen.flatMap(f => f.findings || []);
  const allPhotos = mockForemen.flatMap(f => f.photos || []);

  return (
    <div className="bg-white p-[20mm] min-h-[297mm] relative print:break-after-page">
      {/* Document Header */}
      <header className="flex justify-between items-start border-b-2 border-slate-900 pb-8">
        <div>
          <div className="flex items-center gap-2 text-primary mb-4">
             <ShieldCheck size={32} strokeWidth={2.5} />
             <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase">Chairman <span className="text-primary italic">Protocol</span></span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Inspection Intelligence Dossier</h2>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
             <DocMetaItem icon={<FileText size={14}/>} label="Report ID" value={report.id} />
             <DocMetaItem icon={<Calendar size={14}/>} label="Date Generated" value={new Date().toLocaleDateString()} />
             <DocMetaItem icon={<MapPin size={14}/>} label="Node Location" value={report.project} />
          </div>
        </div>
        <div className="text-right">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Security Rating</div>
           <div className="px-6 py-2 rounded-xl bg-slate-900 text-white font-black text-2xl tracking-tighter">RESTRICTED</div>
        </div>
      </header>

      {/* Executive Summary Section */}
      <section className="mt-12">
        <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.4em] mb-6 border-l-4 border-primary pl-4">I. Executive Intelligence</h3>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 flex flex-col justify-between">
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              This comprehensive tactical assessment was conducted on <span className="font-bold text-slate-900">{report.date}</span> at the <span className="font-bold text-slate-900">{report.project}</span> site. The objective was to validate operational compliance, team supervision efficacy, and safety protocol adherence during the <span className="font-bold text-slate-900">{report.subject}</span> window.
            </p>
            <div className="flex items-center gap-6 mt-8">
               <div className="flex items-center gap-3">
                  <img src={mockInspectorsData[report.inspector]?.avatar} className="w-10 h-10 rounded-full border-2 border-slate-200" alt="" />
                  <div>
                     <div className="text-xs font-black text-slate-900">{report.inspector}</div>
                     <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{mockInspectorsData[report.inspector]?.title}</div>
                  </div>
               </div>
               <div className="w-px h-10 bg-slate-100" />
               <div>
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Digital Signature Hash</div>
                  <div className="text-[8px] font-mono text-slate-300">#AF92-K55L-92BZ-0021-X99</div>
               </div>
            </div>
          </div>
          <div className="col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Audit Coefficient</div>
            <div className="text-6xl font-black text-slate-900 tracking-tighter italic">{report.score}<span className="text-base font-bold text-primary opacity-60">%</span></div>
            <div className="mt-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest border border-primary/20">
               Stable Output
            </div>
          </div>
        </div>
      </section>

      {/* Summary Statistics */}
      <section className="mt-12 grid grid-cols-4 gap-4">
         <StatBox label="Active Personnel" value={`${mockForemen.reduce((acc, f) => acc + (f.manpower || 0), 0)}`} sub="Total Workforce" />
         <StatBox label="Deployment Time" value="8.0" sub="Hours Logged" />
         <StatBox label="Key Findings" value={`${allFindings.length}`} sub="Protocol Insights" />
         <StatBox label="Visual evidence" value={`${allPhotos.length}`} sub="High-Res captures" />
      </section>

      {/* Checklist Audit */}
      <section className="mt-16">
        <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.4em] mb-8 border-l-4 border-primary pl-4">II. Audit Performance Metrics</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ref. ID</th>
              <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Description</th>
              <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Verification</th>
            </tr>
          </thead>
          <tbody>
            {mockChecklist.map((section) => (
              <>
                <tr key={section.section} className="bg-slate-50/50">
                  <td colSpan={3} className="py-2 px-4 text-[9px] font-black text-slate-900 uppercase tracking-[0.2em]">{section.section}</td>
                </tr>
                {section.items.slice(0, 5).map((item) => ( // Truncated for print-all to save space/demo
                  <tr key={item.id} className="border-b border-slate-100">
                    <td className="py-4 font-mono text-[10px] text-slate-400">{item.id}</td>
                    <td className="py-4 text-[11px] font-bold text-slate-700 pr-12">{item.desc}</td>
                    <td className="py-4 text-right">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${item.status === 'Yes' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </section>

      {/* Simplified Footer for batch print */}
      <footer className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-center text-[8px] font-black text-slate-300 uppercase tracking-[0.5em]">
         <span>Chairman Protocol Dossier #{report.id}</span>
         <span>Page Output {new Date().toLocaleDateString()}</span>
      </footer>
    </div>
  );
}

function DocMetaItem({ icon, label, value }: any) {
  return (
     <div className="flex items-center gap-3">
        <div className="text-primary">{icon}</div>
        <div>
           <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">{label}</div>
           <div className="text-[10px] font-bold text-slate-900 leading-none">{value}</div>
        </div>
     </div>
  );
}

function StatBox({ label, value, sub }: any) {
   return (
      <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
         <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</div>
         <div className="text-xl font-black text-slate-900 tracking-tighter mb-1 leading-none">{value}</div>
         <div className="text-[7px] font-bold text-primary italic uppercase tracking-widest">{sub}</div>
      </div>
   );
}
