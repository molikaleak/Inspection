import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockForemen } from '../data/mockData';
import { 
  Search, 
  Plus, 
  User, 
  History,
  X,
  FileText,
  Save,
  Camera,
  Calendar,
  Briefcase
} from 'lucide-react';

interface Appointment {
  id: string;
  project: string;
  subject: string;
  inspectorName: string;
  inspectorCompany: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  status: 'Pending' | 'Active' | 'Completed';
  description: string;
  foremen: string[];
}

const mockAppointments: Appointment[] = [
  {
    id: 'APT-001',
    project: 'J-Trust Inspection',
    subject: 'Sector B Night Audit',
    inspectorName: 'Mr. Menghour',
    inspectorCompany: 'Global Audit Inc.',
    startDate: '11/03/2026',
    startTime: '4:00 PM',
    endDate: '11/03/2026',
    endTime: '9:00 PM',
    status: 'Completed',
    description: 'Quarterly safety inspection focusing on night-shift illumination and PPE compliance.',
    foremen: ['f1', 'f2']
  },
  {
    id: 'APT-002',
    project: 'Riverside Plaza',
    subject: 'Foundation Audit',
    inspectorName: 'Kimsour',
    inspectorCompany: 'SiteSafe Ltd',
    startDate: '12/03/2026',
    startTime: '8:00 AM',
    endDate: '12/03/2026',
    endTime: '5:00 PM',
    status: 'Active',
    description: 'Soil stability and foundation reinforcement audit for Phase 1.',
    foremen: ['f3']
  },
  {
    id: 'APT-003',
    project: 'Industrial Park Zone B',
    subject: 'Heavy Equipment Logistics',
    inspectorName: 'Dara',
    inspectorCompany: 'EquipInspect',
    startDate: '12/03/2026',
    startTime: '10:00 AM',
    endDate: '12/03/2026',
    endTime: '2:00 PM',
    status: 'Pending',
    description: 'Audit functioning condition of crane operations and transport trucks.',
    foremen: ['f4', 'f5']
  },
  {
    id: 'APT-004',
    project: 'Metro Bridge Phase 2',
    subject: 'Steel Construction Review',
    inspectorName: 'Channary',
    inspectorCompany: 'Structura Check',
    startDate: '13/03/2026',
    startTime: '7:30 AM',
    endDate: '13/03/2026',
    endTime: '12:00 PM',
    status: 'Pending',
    description: 'Checking integrity of welded joints and suspension cabling.',
    foremen: ['f1', 'f3']
  },
  {
    id: 'APT-005',
    project: 'J-Trust Inspection',
    subject: 'Electrical Safety Sweep',
    inspectorName: 'Sokha',
    inspectorCompany: 'Global Audit Inc.',
    startDate: '13/03/2026',
    startTime: '1:00 PM',
    endDate: '13/03/2026',
    endTime: '4:30 PM',
    status: 'Pending',
    description: 'Routine visual and equipment inspection of temporary electrical nodes.',
    foremen: ['f2']
  },
  {
    id: 'APT-006',
    project: 'Riverside Plaza',
    subject: 'Plumbing & Water Flow',
    inspectorName: 'Vannak',
    inspectorCompany: 'SiteSafe Ltd',
    startDate: '14/03/2026',
    startTime: '9:00 AM',
    endDate: '14/03/2026',
    endTime: '3:00 PM',
    status: 'Pending',
    description: 'Pressure testing of lower level pumping and pipe installations.',
    foremen: ['f4']
  }
];

export default function Appointments() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);
  const [viewMode, setViewMode] = useState<'schedule' | 'project' | 'calendar'>('calendar');
  const navigate = useNavigate();

  const openDrawer = (apt?: Appointment) => {
    setSelectedApt(apt || null);
    setIsDrawerOpen(true);
  };

  const aptsByDate = mockAppointments.reduce((acc, apt) => {
    (acc[apt.startDate] = acc[apt.startDate] || []).push(apt);
    return acc;
  }, {} as Record<string, Appointment[]>);

  const aptsByProject = mockAppointments.reduce((acc, apt) => {
    (acc[apt.project] = acc[apt.project] || []).push(apt);
    return acc;
  }, {} as Record<string, Appointment[]>);

  const getStatusColor = (status: string) => {
    if (status === 'Pending') return 'text-review-amber bg-review-amber/10';
    if (status === 'Active') return 'text-viewed-cyan bg-viewed-cyan/10';
    return 'text-primary bg-primary/[0.08]';
  };

  return (
    <div className="flex-1 lg:pl-60 min-h-screen bg-surface transition-all">
      <main className="max-w-[1400px] mx-auto p-5 md:p-8 space-y-6 pb-32 lg:pb-8">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-5 border-b border-on-surface/[0.06]">
          <div>
            <p className="text-[13px] text-primary font-medium mb-1">Schedule</p>
            <h1 className="text-[28px] font-semibold tracking-tight text-on-surface">Inspection Appointments</h1>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" size={14} />
              <input 
                type="text" 
                placeholder="Search inspectors..." 
                className="pl-8 pr-4 py-2.5 rounded-xl bg-surface-low border border-on-surface/[0.06] focus:ring-2 ring-primary/20 w-56 text-[13px] outline-none transition-all placeholder:text-on-surface-variant/50"
              />
            </div>
            <button 
              onClick={() => openDrawer()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-[13px] font-medium hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus size={14} /> Create
            </button>
          </div>
        </header>

        {/* View Tabs */}
        <div className="flex gap-1 p-1 bg-surface-lowest rounded-xl w-fit">
           <button 
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] transition-all ${viewMode === 'calendar' ? 'bg-surface shadow-sm text-on-surface font-medium' : 'text-on-surface-variant hover:text-on-surface'}`}
           >
              <Calendar size={14} /> Calendar
           </button>
           <button 
              onClick={() => setViewMode('schedule')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] transition-all ${viewMode === 'schedule' ? 'bg-surface shadow-sm text-on-surface font-medium' : 'text-on-surface-variant hover:text-on-surface'}`}
           >
              <History size={14} /> By Date
           </button>
           <button 
              onClick={() => setViewMode('project')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] transition-all ${viewMode === 'project' ? 'bg-surface shadow-sm text-on-surface font-medium' : 'text-on-surface-variant hover:text-on-surface'}`}
           >
              <Briefcase size={14} /> By Project
           </button>
        </div>

        {/* View Layouts */}
        <section>
           {viewMode === 'calendar' && (
              <CalendarInterface appointments={mockAppointments} onSelect={openDrawer} getStatusColor={getStatusColor} />
           )}

           {viewMode === 'schedule' && (
              <div className="space-y-6">
                 {Object.entries(aptsByDate).map(([date, apts]) => (
                    <div key={date} className="space-y-3">
                       <h3 className="text-[14px] font-medium text-on-surface flex items-center gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {date}
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                          {apts.map(apt => (
                             <AptCard key={apt.id} apt={apt} onClick={() => openDrawer(apt)} getStatusColor={getStatusColor} />
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
           )}

           {viewMode === 'project' && (
              <div className="space-y-5">
                 {Object.entries(aptsByProject).map(([proj, apts]) => (
                    <div key={proj} className="apple-card p-5">
                       <h3 className="text-[14px] font-medium text-on-surface mb-4 pb-3 border-b border-on-surface/[0.04] flex items-center gap-2.5">
                          <Briefcase size={16} className="text-primary" /> {proj}
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {apts.map(apt => (
                             <AptCard key={apt.id} apt={apt} onClick={() => openDrawer(apt)} getStatusColor={getStatusColor} />
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
           )}
        </section>

        {/* Appointment Detail / Create Drawer */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <div 
              className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
              onClick={() => setIsDrawerOpen(false)}
            />
            <div className="relative w-full max-w-xl bg-surface h-full shadow-elevated border-l border-on-surface/[0.06] flex flex-col animate-in slide-in-from-right duration-300">
              
              <header className="p-5 border-b border-on-surface/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white">
                    <Plus size={18} />
                  </div>
                  <div>
                    <h2 className="text-[17px] font-semibold tracking-tight text-on-surface">
                      {selectedApt ? 'Edit Appointment' : 'New Appointment'}
                    </h2>
                    <p className="text-[12px] text-on-surface-variant">Fill in the details below</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-surface-lowest text-on-surface-variant hover:text-on-surface transition-all"
                >
                  <X size={18} />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                
                {/* Mission Scope */}
                <div className="space-y-4">
                  <SectionDivider label="Scope" />
                  
                  <div className="grid grid-cols-1 gap-4">
                    <InputField label="Subject" placeholder="e.g., Sector B Night Audit" defaultValue={selectedApt?.subject} />
                    <div className="grid grid-cols-2 gap-3">
                      <InputField label="Start Date" type="date" defaultValue="2026-03-11" />
                      <div className="grid grid-cols-2 gap-2">
                        <InputField label="Start" type="time" defaultValue="16:00" />
                        <InputField label="End" type="time" defaultValue="21:00" />
                      </div>
                    </div>
                    <TextAreaField label="Description" placeholder="Define inspection goals..." defaultValue={selectedApt?.description} />
                  </div>
                </div>

                {/* Personnel */}
                <div className="space-y-4">
                  <SectionDivider label="Personnel" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="apple-card p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] text-primary font-medium">Inspector</span>
                        <Camera size={14} className="text-on-surface-variant" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-surface-lowest border border-dashed border-on-surface/[0.12] flex items-center justify-center group cursor-pointer hover:border-primary transition-all">
                          <Plus size={14} className="text-on-surface-variant/40 group-hover:text-primary" />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                          <input 
                            placeholder="Name" 
                            className="bg-transparent text-[13px] font-medium text-on-surface border-b border-on-surface/[0.06] focus:border-primary outline-none py-1"
                            defaultValue={selectedApt?.inspectorName}
                          />
                          <input 
                            placeholder="Company" 
                            className="bg-transparent text-[11px] text-on-surface-variant outline-none"
                            defaultValue={selectedApt?.inspectorCompany}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="apple-card p-4 space-y-3">
                      <span className="text-[12px] text-viewed-cyan font-medium">Foremen</span>
                      <div className="flex -space-x-2 hover:space-x-1 transition-all">
                        {mockForemen.slice(0, 3).map(f => (
                           <img key={f.id} src={f.avatar} className="w-9 h-9 rounded-xl ring-3 ring-surface object-cover cursor-pointer hover:scale-110 active:scale-90 transition-all" />
                        ))}
                        <button className="w-9 h-9 rounded-xl bg-surface-lowest border border-on-surface/[0.08] flex items-center justify-center text-primary text-[12px] hover:bg-primary hover:text-white transition-all">
                          +
                        </button>
                      </div>
                      <p className="text-[11px] text-on-surface-variant">3 foremen assigned</p>
                    </div>
                  </div>
                </div>

                {/* Audit Trail */}
                {selectedApt && (
                  <div className="space-y-4">
                    <SectionDivider label="Activity Log" />
                    
                    <div className="apple-card overflow-hidden">
                      <table className="w-full text-left text-[12px]">
                        <thead>
                          <tr className="bg-surface-lowest border-b border-on-surface/[0.04]">
                            <th className="p-3 text-on-surface-variant font-medium">Date</th>
                            <th className="p-3 text-on-surface-variant font-medium">Action</th>
                            <th className="p-3 text-on-surface-variant font-medium">Field</th>
                            <th className="p-3 text-on-surface-variant font-medium">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-on-surface/[0.04] text-on-surface/70">
                          <tr>
                            <td className="p-3">08/04 10:20</td>
                            <td className="p-3 text-viewed-cyan font-medium">Update</td>
                            <td className="p-3">Status</td>
                            <td className="p-3 text-on-surface">Draft → Pending</td>
                          </tr>
                          <tr>
                            <td className="p-3">07/04 14:15</td>
                            <td className="p-3 text-primary font-medium">Create</td>
                            <td className="p-3">Record</td>
                            <td className="p-3 text-on-surface">Initialized</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>

              <footer className="p-5 border-t border-on-surface/[0.06] bg-surface-lowest flex items-center justify-between">
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-[13px] text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  Discard
                </button>
                <div className="flex gap-2.5">
                   {selectedApt?.status === 'Completed' ? (
                      <button 
                         onClick={() => navigate(`/report/${selectedApt.id.toLowerCase()}`)}
                         className="px-5 py-2.5 rounded-xl bg-primary text-white text-[13px] font-medium hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
                      >
                         <FileText size={14} /> View Report
                      </button>
                   ) : (
                      <>
                        <button className="px-4 py-2.5 rounded-xl bg-surface border border-on-surface/[0.08] text-[13px] hover:bg-on-surface/[0.04] transition-all flex items-center gap-2">
                           <FileText size={14} /> Save Draft
                        </button>
                        <button className="px-5 py-2.5 rounded-xl bg-primary text-white text-[13px] font-medium hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
                           <Save size={14} /> Save
                        </button>
                      </>
                   )}
                </div>
              </footer>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-on-surface/[0.06]" />
      <span className="text-[12px] text-on-surface-variant">{label}</span>
      <div className="h-px flex-1 bg-on-surface/[0.06]" />
    </div>
  );
}

function InputField({ label, placeholder, defaultValue, type = "text" }: { label: string, placeholder?: string, defaultValue?: string, type?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[12px] text-on-surface-variant ml-0.5">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full bg-surface-lowest border border-on-surface/[0.06] rounded-xl px-3.5 py-2.5 text-[13px] text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 ring-primary/20 outline-none transition-all"
      />
    </div>
  );
}

function TextAreaField({ label, placeholder, defaultValue }: { label: string, placeholder?: string, defaultValue?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[12px] text-on-surface-variant ml-0.5">{label}</label>
      <textarea 
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={3}
        className="w-full bg-surface-lowest border border-on-surface/[0.06] rounded-xl px-3.5 py-2.5 text-[13px] text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 ring-primary/20 outline-none transition-all no-scrollbar"
      />
    </div>
  );
}


function CalendarInterface({ appointments, onSelect, getStatusColor }: { appointments: Appointment[], onSelect: (apt: Appointment) => void, getStatusColor: (s: string) => string }) {
  const hours = Array.from({ length: 15 }, (_, i) => i + 7);
  const dates = [...new Set(appointments.map(a => a.startDate))].sort();

  const toMinutes = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    let [h, m] = time.split(':').map(Number);
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    return h * 60 + (m || 0);
  };

  const getTimePosition = (timeStr: string) => {
    const totalMinutes = toMinutes(timeStr);
    const startMinutes = 7 * 60;
    return ((totalMinutes - startMinutes) / 60) * 100;
  };

  const getDurationHeight = (start: string, end: string) => {
    const sPos = getTimePosition(start);
    const ePos = getTimePosition(end);
    return Math.max(ePos - sPos, 40);
  };

  const getDailyLayout = (dailyApts: Appointment[]) => {
    const sorted = [...dailyApts].sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));
    const layout: Record<string, { left: string, width: string }> = {};
    
    const clusters: Appointment[][] = [];
    sorted.forEach(apt => {
       const aptStart = toMinutes(apt.startTime);
       let foundCluster = false;
       for (const cluster of clusters) {
          if (cluster.some(c => {
             const cStart = toMinutes(c.startTime);
             const cEnd = toMinutes(c.endTime);
             const aptEnd = toMinutes(apt.endTime);
             return (aptStart < cEnd && aptEnd > cStart);
          })) {
             cluster.push(apt);
             foundCluster = true;
             break;
          }
       }
       if (!foundCluster) clusters.push([apt]);
    });

    clusters.forEach(cluster => {
       cluster.forEach((apt, idx) => {
          layout[apt.id] = {
             left: `${(idx * 100) / cluster.length}%`,
             width: `${100 / cluster.length}%`
          };
       });
    });

    return layout;
  };

  return (
    <div className="apple-card overflow-hidden">
       <div className="flex border-b border-on-surface/[0.06] bg-surface-lowest/50">
          <div className="w-16 shrink-0 p-3 border-r border-on-surface/[0.04] text-[11px] text-on-surface-variant">Time</div>
          {dates.map(date => (
             <div key={date} className="flex-1 p-3 border-r border-on-surface/[0.04] last:border-r-0 text-center">
                <span className="text-[13px] font-medium text-on-surface">{date}</span>
             </div>
          ))}
       </div>

       <div className="relative flex h-[1000px] overflow-y-auto no-scrollbar">
          {/* Time Labels */}
          <div className="w-16 shrink-0 border-r border-on-surface/[0.04] bg-surface-lowest/30 sticky left-0 z-10">
             {hours.map(h => (
               <div key={h} className="h-[100px] border-b border-on-surface/[0.03] p-2 flex flex-col justify-between">
                  <span className="text-[11px] text-on-surface-variant/60">{h > 12 ? h - 12 : h}:00 {h >= 12 ? 'PM' : 'AM'}</span>
               </div>
             ))}
          </div>

          {/* Grid Columns */}
          {dates.map(date => {
             const dailyApts = appointments.filter(a => a.startDate === date);
             const layout = getDailyLayout(dailyApts);

             return (
               <div key={date} className="flex-1 relative border-r border-on-surface/[0.04] last:border-r-0 h-[1500px]">
                  {hours.map(h => (
                     <div key={h} className="h-[100px] border-b border-on-surface/[0.02]" />
                  ))}

                  {dailyApts.map(apt => {
                    const top = (getTimePosition(apt.startTime) / 100) * 100;
                    const height = (getDurationHeight(apt.startTime, apt.endTime) / 100) * 100;
                    const { left, width } = layout[apt.id];
                    
                    return (
                      <div 
                        key={apt.id}
                        onClick={() => onSelect(apt)}
                        className="absolute rounded-lg p-2.5 border-l-[3px] overflow-hidden transition-all hover:scale-[1.02] hover:shadow-elevated hover:z-30 cursor-pointer group bg-surface shadow-card flex flex-col justify-between"
                        style={{ 
                          top: `${top}px`, 
                          height: `${height}px`,
                          left: `calc(${left} + 4px)`,
                          width: `calc(${width} - 8px)`,
                          borderColor: apt.status === 'Completed' ? '#007AFF' : apt.status === 'Active' ? '#32ADE6' : '#FF9500',
                        }}
                      >
                         <div className="relative z-10">
                            <p className="text-[10px] text-on-surface-variant mb-0.5">{apt.startTime}</p>
                            <h4 className="text-[11px] font-medium text-on-surface leading-tight group-hover:text-primary transition-colors line-clamp-2">{apt.subject}</h4>
                         </div>
                         <div className="flex items-center justify-between mt-auto">
                            <span className="text-[9px] text-on-surface-variant/50 truncate max-w-[60%]">{apt.project}</span>
                         </div>
                      </div>
                    );
                  })}
               </div>
             );
          })}
       </div>
    </div>
  );
}

function AptCard({ apt, onClick, getStatusColor }: { apt: Appointment, onClick: () => void, getStatusColor: (status: string) => string }) {
  return (
    <div onClick={onClick} className="apple-card p-4 cursor-pointer hover:shadow-card transition-all group flex flex-col gap-3">
      <div className="flex justify-between items-start gap-3">
         <div>
            <h4 className="text-[14px] font-medium text-on-surface leading-tight mb-0.5 group-hover:text-primary transition-colors">{apt.subject}</h4>
            <p className="text-[12px] text-on-surface-variant">{apt.project}</p>
         </div>
         <span className={`shrink-0 px-2 py-0.5 rounded-md text-[11px] font-medium ${getStatusColor(apt.status)}`}>
            {apt.status}
         </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-[12px] pt-3 border-t border-on-surface/[0.04]">
         <div>
            <span className="text-on-surface-variant block mb-0.5">Schedule</span>
            <span className="text-on-surface flex items-center gap-1"><Calendar size={10} className="text-primary/60"/> {apt.startTime} – {apt.endTime}</span>
         </div>
         <div className="flex flex-col">
            <span className="text-on-surface-variant block mb-0.5">Inspector</span>
            <div className="flex items-center gap-1">
               <User size={10} className="text-primary/60" />
               <span className="text-on-surface truncate">{apt.inspectorName}</span>
            </div>
         </div>
      </div>
    </div>
  );
}
