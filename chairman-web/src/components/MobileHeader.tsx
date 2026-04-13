import { ShieldCheck, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function MobileHeader() {
  const { pathname } = useLocation();

  const getPageTitle = (path: string) => {
    if (path === '/') return 'Overview';
    if (path === '/insights') return 'PDA Insights';
    if (path === '/archive') return 'Intelligence Archive';
    if (path === '/appointments') return 'Field Schedule';
    if (path === '/config') return 'System Config';
    if (path.startsWith('/report/')) return 'Dossier Analysis';
    return 'Inspector';
  };

  return (
    <header className="lg:hidden sticky top-0 left-0 right-0 z-[55] bg-surface/80 backdrop-blur-xl border-b border-on-surface/5 px-6 pt-12 pb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg emerald-gradient flex items-center justify-center shadow-glow">
          <ShieldCheck className="text-white" size={18} />
        </div>
        <div>
          <h1 className="text-sm font-black text-on-surface uppercase tracking-tight leading-none">
            {getPageTitle(pathname)}
          </h1>
          <p className="text-[7px] uppercase tracking-[0.2em] font-bold text-primary mt-0.5">Chairman Portal</p>
        </div>
      </div>

      <div className="w-8 h-8 rounded-full bg-surface-low border border-on-surface/10 flex items-center justify-center text-on-surface-variant">
        <User size={16} />
      </div>
    </header>
  );
}
