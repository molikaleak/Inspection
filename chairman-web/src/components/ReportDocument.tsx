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
    <div className="bg-white p-4 md:p-[20mm] min-h-[297mm] relative print:break-after-page print:p-[20mm]">
      {/* Document Header */}
      <header className="flex flex-col md:flex-row justify-between md:items-start gap-4 border-b border-black/[0.06] pb-6 md:pb-8 print:flex-row print:pb-8">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2 md:mb-3 print:mb-3">
             <ShieldCheck size={28} strokeWidth={2} />
             <span className="font-semibold text-xl md:text-2xl print:text-2xl tracking-tight text-black">Inspector</span>
          </div>
          <h2 className="text-[24px] md:text-[32px] print:text-[32px] font-semibold text-black tracking-tight leading-none text-balance">Inspection Report</h2>
          <div className="mt-4 md:mt-6 print:mt-6 flex flex-wrap gap-x-6 md:gap-x-8 gap-y-3">
             <DocMetaItem icon={<FileText size={14}/>} label="Report ID" value={report.id} />
             <DocMetaItem icon={<Calendar size={14}/>} label="Date" value={report.date} />
             <DocMetaItem icon={<MapPin size={14}/>} label="Location" value={report.project} />
          </div>
        </div>
        <div className="md:text-right print:text-right flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start">
           <div className="text-[11px] text-black/50 md:mb-1 print:mb-1">Status</div>
           <div className="px-3 md:px-4 py-1.5 rounded-lg bg-surface-low text-black font-medium text-[12px] md:text-[13px] print:text-[13px]">Validated</div>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="mt-6 md:mt-10 print:mt-10">
        <h3 className="text-[14px] md:text-[15px] font-medium text-black mb-3 md:mb-5 print:mb-5">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 print:grid-cols-12 print:gap-8">
          <div className="md:col-span-8 print:col-span-8 flex flex-col justify-between">
            <p className="text-[13px] text-black/70 leading-relaxed">
              This inspection was conducted on <span className="text-black font-medium">{report.date}</span> at the <span className="text-black font-medium">{report.project}</span> site. The objective was to validate operational compliance, supervise teams, and review safety protocols during the <span className="text-black font-medium">{report.subject}</span> window.
            </p>
            <div className="flex items-center gap-4 md:gap-6 print:gap-6 mt-5 md:mt-6 print:mt-6">
               <div className="flex items-center gap-3">
                  <img src={mockInspectorsData[report.inspector]?.avatar} className="w-8 h-8 md:w-10 md:h-10 print:w-10 print:h-10 rounded-full border border-black/10" alt="" />
                  <div>
                     <div className="text-[12px] md:text-[13px] print:text-[13px] font-medium text-black">{report.inspector}</div>
                     <div className="text-[11px] text-black/50">{mockInspectorsData[report.inspector]?.title}</div>
                  </div>
               </div>
               <div className="w-px h-8 bg-black/10" />
               <div>
                  <div className="text-[10px] md:text-[11px] print:text-[11px] text-black/50">Signature Hash</div>
                  <div className="text-[10px] md:text-[11px] print:text-[11px] font-mono text-black/40 mt-0.5">#AF92-K55L</div>
               </div>
            </div>
          </div>
          <div className="md:col-span-4 print:col-span-4 bg-surface-lowest rounded-xl p-4 md:p-5 print:p-5 border border-black/[0.04] flex flex-col items-center justify-center text-center">
            <div className="text-[11px] md:text-[12px] text-black/50 mb-1">Score</div>
            <div className="text-[36px] md:text-[48px] print:text-[48px] font-semibold text-black tracking-tight leading-none">{report.score}<span className="text-[16px] md:text-[20px] print:text-[20px] font-medium text-black/40">%</span></div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-8 md:mt-10 print:mt-10 grid grid-cols-2 md:grid-cols-4 print:grid-cols-4 gap-3 md:gap-4 print:gap-4">
         <StatBox label="Personnel" value={`${mockForemen.reduce((acc, f) => acc + (f.manpower || 0), 0)}`} sub="Total" />
         <StatBox label="Duration" value="8.0" sub="Hours" />
         <StatBox label="Findings" value={`${allFindings.length}`} sub="Noted" />
         <StatBox label="Photos" value={`${allPhotos.length}`} sub="Attached" />
      </section>

      {/* Checklist Audit */}
      <section className="mt-12">
        <h3 className="text-[15px] font-medium text-black mb-5">Audit Details</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black/[0.06]">
              <th className="py-2 text-[12px] font-medium text-black/50">ID</th>
              <th className="py-2 text-[12px] font-medium text-black/50">Item</th>
              <th className="py-2 text-[12px] font-medium text-black/50 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockChecklist.map((section) => (
              <>
                <tr key={section.section}>
                  <td colSpan={3} className="pt-6 pb-2 text-[13px] font-medium text-black">{section.section}</td>
                </tr>
                {section.items.slice(0, 5).map((item) => (
                  <tr key={item.id} className="border-b border-black/[0.04]">
                    <td className="py-3 font-mono text-[11px] text-black/40 w-16">{item.id}</td>
                    <td className="py-3 text-[12px] text-black/80 pr-6">{item.desc}</td>
                    <td className="py-3 text-right">
                      <span className={`px-2 py-1 rounded-md text-[11px] font-medium ${item.status === 'Yes' ? 'bg-primary/10 text-primary' : 'bg-orange-50 text-orange-600'}`}>
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

      {/* Footer */}
      <footer className="mt-16 pt-6 border-t border-black/[0.06] flex justify-between items-center text-[10px] text-black/40">
         <span>Report #{report.id}</span>
         <span>Generated {new Date().toLocaleDateString()}</span>
      </footer>
    </div>
  );
}

function DocMetaItem({ icon, label, value }: any) {
  return (
     <div className="flex items-center gap-2.5">
        <div className="text-black/40">{icon}</div>
        <div>
           <div className="text-[10px] text-black/50 mb-0.5">{label}</div>
           <div className="text-[12px] font-medium text-black">{value}</div>
        </div>
     </div>
  );
}

function StatBox({ label, value, sub }: any) {
   return (
      <div className="p-4 rounded-xl border border-black/[0.06] text-center">
         <div className="text-[11px] text-black/50 mb-1">{label}</div>
         <div className="text-[24px] font-semibold text-black tracking-tight mb-0.5 leading-none">{value}</div>
         <div className="text-[11px] text-black/40">{sub}</div>
      </div>
   );
}
