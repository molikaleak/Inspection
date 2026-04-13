import { useState } from 'react';
import { mockForemen, mockChecklist } from '../data/mockData';
import { Plus, Search, MoreVertical, FileText, Users, Edit3, Trash2, ShieldCheck, ClipboardList, PenTool, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Config() {
  const [activeTab, setActiveTab] = useState<'forms' | 'foremen' | 'display'>('forms');
  const { isLight, toggleTheme } = useTheme();

  return (
    <div className="flex-1 lg:pl-64 min-h-screen bg-surface">
      <main className="max-w-6xl mx-auto p-5 md:p-10 space-y-12 pb-32 lg:pb-10">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-on-surface/5">
          <h1 className="text-2xl font-black tracking-tighter text-on-surface">Settings</h1>
          {activeTab !== 'display' && (
            <button className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl emerald-gradient text-on-surface text-[10px] font-black uppercase tracking-widest hover:shadow-glow transition-all">
              <Plus size={16} /> {activeTab === 'forms' ? 'New Form' : 'Add Person'}
            </button>
          )}
        </header>

        {/* Compressed Navigation */}
        <nav className="flex flex-wrap items-center gap-8 mb-4">
          <TabItem 
            active={activeTab === 'forms'} 
            onClick={() => setActiveTab('forms')} 
            label="Forms" 
            icon={<ClipboardList size={18} />} 
          />
          <TabItem 
            active={activeTab === 'foremen'} 
            onClick={() => setActiveTab('foremen')} 
            label="Team" 
            icon={<Users size={18} />} 
          />
          <TabItem 
            active={activeTab === 'display'} 
            onClick={() => setActiveTab('display')} 
            label="Display" 
            icon={<Monitor size={18} />} 
          />
        </nav>

        {/* Search Bar (Compact) */}
        {activeTab !== 'display' && (
          <div className="relative group mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" size={16} />
            <input 
              type="text" 
              placeholder={`Search ${activeTab === 'forms' ? 'Forms' : 'Team'}...`} 
              className="pl-12 pr-6 py-3 rounded-2xl bg-on-surface/[0.02] border border-on-surface/5 focus:ring-2 ring-primary/10 w-full text-[10px] font-black uppercase tracking-widest outline-none transition-all"
            />
          </div>
        )}

        {activeTab === 'forms' && <FormsGrid />}
        {activeTab === 'foremen' && <ForemenGrid />}
        {activeTab === 'display' && (
          <div className="max-w-xl">
            <div className="editorial-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-on-surface/5 hover:border-primary/20 transition-all cursor-pointer" onClick={toggleTheme}>
              <div>
                <h3 className="text-sm font-black text-on-surface mb-1 tracking-tight">Day & Night Mode</h3>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Switch between bright and dark screen color</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
                className={`relative w-16 h-8 rounded-full transition-colors flex items-center px-1 shrink-0 ${
                  isLight ? 'emerald-gradient' : 'bg-surface-low border border-on-surface/10'
                }`}
              >
                <div 
                  className={`w-6 h-6 rounded-full bg-white transition-transform ${
                    isLight ? 'translate-x-8 shadow-[0_0_10px_rgba(0,0,0,0.1)]' : 'translate-x-0 bg-on-surface-variant'
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function FormsGrid() {
  const forms = [
    { title: 'Standard Inspection', sections: 4, usage: 142 },
    { title: 'Night Audit Protocol', sections: 2, usage: 89 },
    { title: 'Safety Equipment Log', sections: 3, usage: 204 },
    { title: 'Site Prep Logistics', sections: 5, usage: 56 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {forms.map((form, i) => (
        <div key={i} className="editorial-card group hover:bg-on-surface/[0.03] transition-all p-6 flex flex-col justify-between cursor-default bg-on-surface/[0.01]">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-lg bg-on-surface/5 flex items-center justify-center text-primary shadow-glow group-hover:emerald-gradient group-hover:text-on-surface transition-all">
              <FileText size={20} />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black text-on-surface mb-2 tracking-tight group-hover:text-primary">{form.title}</h3>
            <div className="text-[8px] font-black text-on-surface-variant uppercase tracking-widest opacity-80 space-y-1">
               <p>{form.sections} Sections</p>
               <p className="text-primary italic">{form.usage} Records</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ForemenGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {mockForemen.map((f) => (
        <div key={f.id} className="editorial-card group hover:scale-105 transition-all p-4 flex flex-col items-center text-center cursor-default bg-on-surface/[0.01]">
          <div className="relative mb-4 shrink-0">
            <img 
              src={f.avatar} 
              alt={f.name} 
              className="w-16 h-16 rounded-2xl ring-1 ring-on-surface/10 group-hover:shadow-glow transition-all object-cover" 
            />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full emerald-gradient text-on-surface flex items-center justify-center text-[8px] font-black border-2 border-surface-lowest shadow-glow">
              {f.score}
            </div>
          </div>
          <h3 className="text-[10px] font-black text-on-surface leading-tight mb-1">{f.name}</h3>
          <p className="text-[7px] font-black text-primary uppercase tracking-[0.2em]">Inspector Alpha</p>
        </div>
      ))}
    </div>
  );
}



function TabItem({ active, onClick, label, icon }: { active: boolean, onClick: () => void, label: string, icon: any }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-6 text-sm font-black uppercase tracking-widest transition-all relative ${
        active ? 'text-primary' : 'text-on-surface-variant opacity-60 hover:opacity-100 hover:text-on-surface'
      }`}
    >
      {icon}
      {label}
      {active && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full" />}
    </button>
  );
}
