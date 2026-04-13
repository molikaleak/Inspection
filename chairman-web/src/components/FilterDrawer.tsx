import { X, Check, Search } from 'lucide-react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  projects: string[];
  inspectors: string[];
  filters: {
    project: string;
    inspector: string;
    status: string;
    search: string;
  };
  setFilters: (filters: any) => void;
  onClear: () => void;
  resultCount: number;
}

export default function FilterDrawer({ 
  isOpen, 
  onClose, 
  projects, 
  inspectors, 
  filters, 
  setFilters,
  onClear,
  resultCount
}: FilterDrawerProps) {
  if (!isOpen) return null;

  const handleSelect = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <header className="px-8 py-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-2xl font-black text-gray-900 tracking-tighter">Operational Filters</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-50 text-gray-400 transition-colors">
            <X size={24} />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="p-8 space-y-10">
            
            {/* Search Section */}
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">PDA Search</span>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Query intelligence..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl text-sm font-bold border-2 border-transparent focus:border-gray-100 focus:bg-white focus:ring-0 outline-none transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Project Vector */}
            <FilterSection 
              label="Project Vector" 
              options={projects} 
              selectedValue={filters.project} 
              onSelect={(val) => handleSelect('project', val)} 
            />

            {/* Audit Executive */}
            <FilterSection 
              label="Audit Executive" 
              options={inspectors} 
              selectedValue={filters.inspector} 
              onSelect={(val) => handleSelect('inspector', val)} 
            />

            {/* Status Vector */}
            <FilterSection 
              label="Status Vector" 
              options={['All Statuses', 'Viewed', 'Needs Review']} 
              selectedValue={filters.status} 
              onSelect={(val) => handleSelect('status', val)} 
            />

          </div>
        </div>

        {/* Footer */}
        <footer className="p-8 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-4">
          <div className="flex gap-4">
            <button 
              onClick={onClear}
              className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all active:scale-95"
            >
              Reset All
            </button>
            <button 
              onClick={onClose}
              className="flex-[2] py-5 text-[10px] font-black uppercase tracking-widest text-white bg-black rounded-2xl hover:bg-black/90 transition-all shadow-xl shadow-black/10 active:scale-95"
            >
              Display {resultCount} Dossiers
            </button>
          </div>
          <p className="text-center text-[9px] font-bold text-gray-300 uppercase tracking-widest">Chairman Protocol v1.4.2</p>
        </footer>
      </div>
    </div>
  );
}

function FilterSection({ label, options, selectedValue, onSelect }: { label: string, options: string[], selectedValue: string, onSelect: (val: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{label}</span>
        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{options.length} Units</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSelected = selectedValue === opt;
          return (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 text-left relative group ${
                isSelected 
                ? 'bg-black border-black text-white shadow-xl shadow-black/20 scale-[1.02] z-10' 
                : 'bg-white border-gray-100 text-gray-400 hover:border-black/10 hover:text-black'
              }`}
            >
              <div className="flex flex-col gap-1 min-w-0">
                <span className="truncate">{opt}</span>
                {isSelected && (
                  <div className="flex items-center gap-1 text-[8px] opacity-60">
                    <Check size={8} strokeWidth={4} /> Selected
                  </div>
                )}
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
