import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockForemen } from '../data/mockData';
import { 
  Search, 
  Plus, 
  ChevronRight, 
  User, 
  History,
  Link as LinkIcon,
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
    if (status === 'Pending') return 'text-review-amber border-review-amber/30 bg-review-amber/10';
    if (status === 'Active') return 'text-viewed-cyan border-viewed-cyan/30 bg-viewed-cyan/10';
    return 'text-primary border-primary/30 bg-primary/10';
  };

  return (
    <div className="flex-1 lg:pl-64 min-h-screen bg-surface transition-all">
      <main className="max-w-[1600px] mx-auto p-4 md:p-10 space-y-12 pb-32 lg:pb-10">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-on-surface/5">
          <div>
            <div className="text-[8px] font-black uppercase tracking-[0.4em] text-primary mb-1">Scheduling Protocol</div>
            <h1 className="text-3xl font-black tracking-tighter text-on-surface">Inspection Appointments</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" size={14} />
              <input 
                type="text" 
                placeholder="Search inspectors..." 
                className="pl-8 pr-4 py-2 rounded-xl bg-surface-low border border-on-surface/5 focus:ring-2 ring-primary/20 w-64 text-[10px] font-black uppercase tracking-widest outline-none transition-all"
              />
            </div>
            <button 
              onClick={() => openDrawer()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl emerald-gradient text-on-surface text-[10px] font-black uppercase tracking-widest shadow-glow active:scale-95 transition-all"
            >
              <Plus size={14} /> Create Appointment
            </button>
          </div>
        </header>

        {/* Toggle / Tabs */}
        <div className="flex gap-2 p-1 bg-surface-lowest rounded-xl border border-on-surface/5 w-fit mb-6 shadow-sm">
           <button 
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'calendar' ? 'bg-on-surface/5 text-primary shadow-inner' : 'text-on-surface-variant hover:text-on-surface hover:bg-on-surface/[0.02]'}`}
           >
              <Calendar size={14} /> Calendar View
           </button>
           <button 
              onClick={() => setViewMode('schedule')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'schedule' ? 'bg-on-surface/5 text-primary shadow-inner' : 'text-on-surface-variant hover:text-on-surface hover:bg-on-surface/[0.02]'}`}
           >
              <History size={14} /> Schedule Based
           </button>
           <button 
              onClick={() => setViewMode('project')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'project' ? 'bg-on-surface/5 text-primary shadow-inner' : 'text-on-surface-variant hover:text-on-surface hover:bg-on-surface/[0.02]'}`}
           >
              <Briefcase size={14} /> Project Based
           </button>
        </div>

        {/* View Layouts */}
        <section>
           {viewMode === 'calendar' && (
              <CalendarInterface appointments={mockAppointments} onSelect={openDrawer} getStatusColor={getStatusColor} />
           )}

           {viewMode === 'schedule' && (
              <div className="space-y-8">
                 {Object.entries(aptsByDate).map(([date, apts]) => (
                    <div key={date} className="space-y-4">
                       <h3 className="text-sm font-black text-on-surface flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full emerald-gradient shrink-0 shadow-glow" />
                          {date}
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                          {apts.map(apt => (
                             <AptCard key={apt.id} apt={apt} onClick={() => openDrawer(apt)} getStatusColor={getStatusColor} />
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
           )}

           {viewMode === 'project' && (
              <div className="space-y-8">
                 {Object.entries(aptsByProject).map(([proj, apts]) => (
                    <div key={proj} className="editorial-card p-6 bg-on-surface/[0.01]">
                       <h3 className="text-sm font-black text-on-surface mb-6 border-b border-on-surface/5 pb-4 flex items-center gap-3">
                          <Briefcase size={18} className="text-primary" /> {proj}
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsDrawerOpen(false)}
            />
            <div className="relative w-full max-w-2xl bg-surface-low h-full shadow-2xl border-l border-on-surface/10 flex flex-col animate-in slide-in-from-right duration-500">
              
              <header className="p-6 border-b border-on-surface/5 flex items-center justify-between bg-on-surface/[0.01]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl emerald-gradient flex items-center justify-center text-on-surface shadow-glow">
                    <Plus size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-tighter text-on-surface">
                      {selectedApt ? 'Edit Appointment' : 'New Audit Request'}
                    </h2>
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-primary">Intelligence Command</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-3 rounded-xl bg-surface-lowest border border-on-surface/5 text-on-surface-variant hover:text-on-surface transition-all"
                >
                  <X size={20} />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar">
                
                {/* Section: Subject & Scope */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-on-surface/5" />
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-on-surface-variant">Mission Scope</span>
                    <div className="h-px flex-1 bg-on-surface/5" />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <InputField label="Audit Subject" placeholder="e.g., J-Trust Sector B Night Audit" defaultValue={selectedApt?.subject} />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Start Date" type="date" defaultValue="2026-03-11" />
                      <div className="grid grid-cols-2 gap-2">
                        <InputField label="Start" type="time" defaultValue="16:00" />
                        <InputField label="End" type="time" defaultValue="21:00" />
                      </div>
                    </div>
                    <TextAreaField label="Strategic Description" placeholder="Define inspection goals and priority zones..." defaultValue={selectedApt?.description} />
                  </div>
                </div>

                {/* Section: Personnel Context */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-on-surface/5" />
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-on-surface-variant">Personnel Detail</span>
                    <div className="h-px flex-1 bg-on-surface/5" />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="editorial-card p-6 bg-on-surface/[0.01] space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-black uppercase tracking-widest text-primary">Assigned Inspector</span>
                        <Camera size={14} className="text-on-surface-variant" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-surface-lowest border border-dashed border-on-surface/20 flex items-center justify-center group cursor-pointer hover:border-primary transition-all">
                          <Plus size={16} className="text-on-surface/20 group-hover:text-primary" />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                          <input 
                            placeholder="Inspector Name" 
                            className="bg-transparent text-[11px] font-black text-on-surface border-b border-on-surface/5 focus:border-primary outline-none py-1"
                            defaultValue={selectedApt?.inspectorName}
                          />
                          <input 
                            placeholder="Company Agency" 
                            className="bg-transparent text-[8px] font-bold text-on-surface-variant uppercase outline-none"
                            defaultValue={selectedApt?.inspectorCompany}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="editorial-card p-6 bg-on-surface/[0.01] space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-black uppercase tracking-widest text-viewed-cyan">Field Foremen</span>
                        <div className="w-4 h-4 rounded bg-on-surface/5" />
                      </div>
                      <div className="flex -space-x-3 hover:space-x-1 transition-all">
                        {mockForemen.slice(0, 3).map(f => (
                           <img key={f.id} src={f.avatar} className="w-10 h-10 rounded-xl ring-4 ring-surface-low border border-on-surface/20 object-cover cursor-pointer hover:scale-110 active:scale-90 transition-all" />
                        ))}
                        <button className="w-10 h-10 rounded-xl bg-surface-lowest border border-on-surface/10 flex items-center justify-center text-primary text-[10px] font-black hover:bg-primary hover:text-on-surface transition-all shadow-glow">
                          +
                        </button>
                      </div>
                      <p className="text-[7px] font-bold text-on-surface-variant uppercase tracking-widest">3 Field Inspectors Enlisted</p>
                    </div>
                  </div>
                </div>

                {/* Section: Audit Trail / History */}
                {selectedApt && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-on-surface/5" />
                      <span className="text-[8px] font-black uppercase tracking-[0.4em] text-on-surface-variant">System Audit Trail</span>
                      <div className="h-px flex-1 bg-on-surface/5" />
                    </div>
                    
                    <div className="editorial-card overflow-hidden">
                      <table className="w-full text-left text-[8px] uppercase font-black tracking-widest">
                        <thead>
                          <tr className="bg-on-surface/5 border-b border-on-surface/10">
                            <th className="p-3 text-on-surface-variant">Date/Time</th>
                            <th className="p-3 text-on-surface-variant">Action</th>
                            <th className="p-3 text-on-surface-variant">Field</th>
                            <th className="p-3 text-on-surface-variant">Old/New</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-on-surface/5 text-on-surface/60">
                          <tr>
                            <td className="p-3">08/04 10:20</td>
                            <td className="p-3 text-viewed-cyan">UPDATE</td>
                            <td className="p-3">Status</td>
                            <td className="p-3 text-on-surface">Draft → Pending</td>
                          </tr>
                          <tr>
                            <td className="p-3">07/04 14:15</td>
                            <td className="p-3 text-primary">CREATE</td>
                            <td className="p-3">Identity</td>
                            <td className="p-3 text-on-surface">Audit Initialized</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>

              <footer className="p-8 border-t border-on-surface/10 bg-surface-lowest flex items-center justify-between">
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  Discard Draft
                </button>
                <div className="flex gap-4">
                   {selectedApt?.status === 'Completed' ? (
                      <button 
                         onClick={() => navigate(`/report/${selectedApt.id.toLowerCase()}`)}
                         className="px-8 py-3 rounded-xl emerald-gradient text-on-surface text-[10px] font-black uppercase tracking-widest shadow-glow active:scale-95 transition-all flex items-center gap-2"
                      >
                         <FileText size={14} /> View Final Report
                      </button>
                   ) : (
                      <>
                        <button className="px-6 py-3 rounded-xl bg-on-surface/5 border border-on-surface/10 text-[10px] font-black uppercase tracking-widest hover:bg-on-surface/10 transition-all flex items-center gap-2">
                           <FileText size={14} /> Draft Dossier
                        </button>
                        <button className="px-8 py-3 rounded-xl emerald-gradient text-on-surface text-[10px] font-black uppercase tracking-widest shadow-glow active:scale-95 transition-all flex items-center gap-2">
                           <Save size={14} /> Commit Changes
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

function InputField({ label, placeholder, defaultValue, type = "text" }: { label: string, placeholder?: string, defaultValue?: string, type?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[8px] font-black uppercase tracking-[.25em] text-on-surface-variant/60 ml-1">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full bg-surface-lowest border border-on-surface/5 rounded-xl px-4 py-3 text-[11px] font-bold text-on-surface placeholder:text-on-surface/10 focus:ring-2 ring-primary/20 outline-none transition-all"
      />
    </div>
  );
}

function TextAreaField({ label, placeholder, defaultValue }: { label: string, placeholder?: string, defaultValue?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[8px] font-black uppercase tracking-[.25em] text-on-surface-variant/60 ml-1">{label}</label>
      <textarea 
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={4}
        className="w-full bg-surface-lowest border border-on-surface/5 rounded-xl px-4 py-3 text-[11px] font-bold text-on-surface placeholder:text-on-surface/10 focus:ring-2 ring-primary/20 outline-none transition-all no-scrollbar"
      />
    </div>
  );
}


function CalendarInterface({ appointments, onSelect, getStatusColor }: { appointments: Appointment[], onSelect: (apt: Appointment) => void, getStatusColor: (s: string) => string }) {
  const hours = Array.from({ length: 15 }, (_, i) => i + 7); // 7 AM to 9 PM
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
    const startMinutes = 7 * 60; // Offset for 7 AM
    return ((totalMinutes - startMinutes) / 60) * 100; // Pixels per hour
  };

  const getDurationHeight = (start: string, end: string) => {
    const sPos = getTimePosition(start);
    const ePos = getTimePosition(end);
    return Math.max(ePos - sPos, 40); // Min height 40px
  };

  // Helper to calculate column distribution for overlapping events
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
    <div className="editorial-card overflow-hidden bg-on-surface/[0.01]">
       <div className="flex border-b border-on-surface/5 bg-on-surface/[0.02]">
          <div className="w-20 shrink-0 p-4 border-r border-on-surface/5 text-[8px] font-black uppercase tracking-widest text-on-surface-variant/40">Z-Time</div>
          {dates.map(date => (
             <div key={date} className="flex-1 p-4 border-r border-on-surface/5 last:border-r-0 text-center">
                <span className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em]">{date}</span>
                <p className="text-[8px] font-bold text-primary uppercase mt-1">Active Window</p>
             </div>
          ))}
       </div>

       <div className="relative flex h-[1000px] overflow-y-auto no-scrollbar">
          {/* Time Labels */}
          <div className="w-20 shrink-0 border-r border-on-surface/5 bg-on-surface/[0.01] sticky left-0 z-10">
             {hours.map(h => (
               <div key={h} className="h-[100px] border-b border-on-surface/[0.03] p-2 flex flex-col justify-between">
                  <span className="text-[9px] font-black text-on-surface-variant/60 uppercase">{h > 12 ? h - 12 : h}:00 {h >= 12 ? 'PM' : 'AM'}</span>
               </div>
             ))}
          </div>

          {/* Grid Columns */}
          {dates.map(date => {
             const dailyApts = appointments.filter(a => a.startDate === date);
             const layout = getDailyLayout(dailyApts);

             return (
               <div key={date} className="flex-1 relative border-r border-on-surface/5 last:border-r-0 h-[1500px]">
                  {/* Visual Grid Lines */}
                  {hours.map(h => (
                     <div key={h} className="h-[100px] border-b border-on-surface/[0.02]" />
                  ))}

                  {/* Appointment Blocks */}
                  {dailyApts.map(apt => {
                    const top = (getTimePosition(apt.startTime) / 100) * 100;
                    const height = (getDurationHeight(apt.startTime, apt.endTime) / 100) * 100;
                    const { left, width } = layout[apt.id];
                    
                    return (
                      <div 
                        key={apt.id}
                        onClick={() => onSelect(apt)}
                        className="absolute rounded-xl p-3 border-l-4 overflow-hidden transition-all hover:scale-[1.05] hover:shadow-2xl hover:z-30 cursor-pointer group bg-surface shadow-md flex flex-col justify-between"
                        style={{ 
                          top: `${top}px`, 
                          height: `${height}px`,
                          left: `calc(${left} + 4px)`,
                          width: `calc(${width} - 8px)`,
                          borderColor: apt.status === 'Completed' ? '#10b981' : apt.status === 'Active' ? '#06b6d4' : '#fbbf24',
                          background: apt.status === 'Completed' ? 'rgba(16, 185, 129, 0.05)' : apt.status === 'Active' ? 'rgba(6, 182, 212, 0.05)' : 'rgba(251, 191, 36, 0.05)'
                        }}
                      >
                         <div className="relative z-10">
                            <p className="text-[7px] font-black uppercase tracking-widest text-on-surface-variant/70 mb-1">{apt.startTime}</p>
                            <h4 className="text-[9px] font-black text-on-surface leading-tight group-hover:text-primary transition-colors line-clamp-2">{apt.subject}</h4>
                         </div>
                         <div className="flex items-center justify-between mt-auto">
                            <span className="text-[6px] font-black uppercase text-on-surface-variant/40 tracking-widest truncate max-w-[60%]">{apt.project}</span>
                            <div className="w-1 h-1 rounded-full bg-primary/40" />
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
    <div onClick={onClick} className="editorial-card p-6 cursor-pointer hover:bg-on-surface/[0.02] hover:border-primary/30 transition-all group flex flex-col gap-5 border border-on-surface/5 shadow-sm">
      <div className="flex justify-between items-start gap-4">
         <div>
            <h4 className="text-sm font-black text-on-surface leading-tight mb-1 group-hover:text-primary transition-colors">{apt.subject}</h4>
            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{apt.project}</p>
         </div>
         <span className={`shrink-0 px-2 py-1 rounded text-[8px] font-black tracking-widest uppercase border ${getStatusColor(apt.status)}`}>
            {apt.status}
         </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-[9px] font-black uppercase tracking-widest pt-4 border-t border-on-surface/5">
         <div>
            <span className="text-on-surface-variant/50 block mb-1">Schedule Vector</span>
            <span className="text-on-surface flex items-center gap-1.5"><Calendar size={10} className="text-primary/60"/> {apt.startTime} - {apt.endTime}</span>
         </div>
         <div className="flex flex-col items-start border-l border-on-surface/5 pl-4">
            <span className="text-on-surface-variant/50 block mb-1">Lead Inspector</span>
            <div className="flex items-center gap-1.5">
               <User size={10} className="text-primary/60" />
               <span className="text-on-surface truncate">{apt.inspectorName}</span>
            </div>
         </div>
      </div>
    </div>
  );
}

