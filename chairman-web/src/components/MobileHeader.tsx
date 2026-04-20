import { ShieldCheck, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function MobileHeader() {
  const { pathname } = useLocation();

  const getPageTitle = (path: string) => {
    if (path === '/') return 'Overview';
    if (path === '/insights') return 'Insights';
    if (path === '/archive') return 'Archive';
    if (path === '/appointments') return 'Schedule';
    if (path === '/config') return 'Settings';
    if (path.startsWith('/report/')) return 'Report';
    return 'Inspector';
  };

  return (
    <header className="lg:hidden sticky top-0 left-0 right-0 z-[55] bg-surface/72 backdrop-blur-xl backdrop-saturate-[180%] border-b border-on-surface/[0.06] px-5 pt-12 pb-3 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
          <ShieldCheck className="text-white" size={14} />
        </div>
        <div>
          <h1 className="text-[15px] font-semibold text-on-surface leading-none">
            {getPageTitle(pathname)}
          </h1>
          <p className="text-[10px] text-on-surface-variant mt-0.5">Chairman Portal</p>
        </div>
      </div>

      <div className="w-8 h-8 rounded-full bg-surface-low flex items-center justify-center text-on-surface-variant">
        <User size={16} />
      </div>
    </header>
  );
}
