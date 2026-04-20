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
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-surface h-full shadow-elevated border-l border-on-surface/[0.06] flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <header className="px-6 py-5 flex items-center justify-between border-b border-on-surface/[0.06]">
          <h2 className="text-[20px] font-semibold text-on-surface tracking-tight">Filters</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-lowest text-on-surface-variant transition-colors">
            <X size={20} />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="p-6 space-y-8">
            
            {/* Search */}
            <div className="space-y-2">
              <span className="text-[13px] text-on-surface-variant">Search</span>
              <div className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Search reports..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-surface-lowest rounded-xl text-[13px] border border-on-surface/[0.06] focus:border-primary/30 focus:bg-surface outline-none transition-all placeholder:text-on-surface-variant/40"
                />
              </div>
            </div>

            {/* Project */}
            <FilterSection 
              label="Project" 
              options={projects} 
              selectedValue={filters.project} 
              onSelect={(val) => handleSelect('project', val)} 
            />

            {/* Inspector */}
            <FilterSection 
              label="Inspector" 
              options={inspectors} 
              selectedValue={filters.inspector} 
              onSelect={(val) => handleSelect('inspector', val)} 
            />

            {/* Status */}
            <FilterSection 
              label="Status" 
              options={['All Statuses', 'Viewed', 'Needs Review']} 
              selectedValue={filters.status} 
              onSelect={(val) => handleSelect('status', val)} 
            />

          </div>
        </div>

        {/* Footer */}
        <footer className="p-6 border-t border-on-surface/[0.06] bg-surface-lowest/50 flex flex-col gap-3">
          <div className="flex gap-3">
            <button 
              onClick={onClear}
              className="flex-1 py-3.5 text-[13px] text-on-surface-variant bg-surface border border-on-surface/[0.08] rounded-xl hover:bg-surface-lowest transition-all active:scale-95"
            >
              Reset
            </button>
            <button 
              onClick={onClose}
              className="flex-[2] py-3.5 text-[13px] font-medium text-white bg-primary rounded-xl hover:opacity-90 transition-all active:scale-95"
            >
              Show {resultCount} results
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

function FilterSection({ label, options, selectedValue, onSelect }: { label: string, options: string[], selectedValue: string, onSelect: (val: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-on-surface-variant">{label}</span>
        <span className="text-[12px] text-on-surface-variant/50">{options.length}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => {
          const isSelected = selectedValue === opt;
          return (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={`p-3 rounded-xl text-[12px] transition-all border text-left ${
                isSelected 
                ? 'bg-primary border-primary text-white font-medium' 
                : 'bg-surface border-on-surface/[0.06] text-on-surface-variant hover:border-primary/20 hover:text-on-surface'
              }`}
            >
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="truncate">{opt}</span>
                {isSelected && (
                  <div className="flex items-center gap-0.5 text-[10px] opacity-80">
                    <Check size={8} strokeWidth={3} /> Selected
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
