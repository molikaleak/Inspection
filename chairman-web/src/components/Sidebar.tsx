import { LayoutDashboard, Archive, BarChart3, LogOut, ShieldCheck, Calendar, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export function Sidebar() {
  const { pathname } = useLocation();
  const { isLight, toggleTheme } = useTheme();

  const navItems = [
    { to: '/', icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { to: '/insights', icon: <BarChart3 size={18} />, label: 'Insights' },
    { to: '/appointments', icon: <Calendar size={18} />, label: 'Schedule' },
    { to: '/archive', icon: <Archive size={18} />, label: 'Archive' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-60 bg-surface-low/60 backdrop-blur-xl border-r border-on-surface/[0.06] p-5 flex-col z-[58]">
        <div className="mb-8 px-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <ShieldCheck className="text-white" size={15} />
            </div>
            <div>
              <h1 className="text-[15px] font-semibold tracking-tight text-on-surface leading-none">Inspector</h1>
              <p className="text-[10px] text-on-surface-variant mt-0.5">Chairman Portal</p>
            </div>
          </div>
          <button 
            onClick={toggleTheme}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-on-surface/[0.04] transition-colors"
          >
            {isLight ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>

        <nav className="flex-1 space-y-0.5">
          {navItems.map((item) => (
            <NavItem 
              key={item.to}
              to={item.to} 
              icon={item.icon} 
              label={item.label} 
              active={pathname === item.to} 
            />
          ))}
        </nav>

        <div className="pt-4 border-t border-on-surface/[0.06]">
          <div className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-on-surface/[0.04] rounded-lg transition-colors group">
            <LogOut size={16} className="text-on-surface-variant group-hover:text-on-surface" />
            <span className="text-[13px] text-on-surface-variant group-hover:text-on-surface">Sign Out</span>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] px-4 pb-5 pt-2 pointer-events-none">
        {/* Theme toggle */}
        <div className="pointer-events-auto flex justify-end mb-3 pr-1">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-surface/80 backdrop-blur-xl border border-on-surface/[0.08] flex items-center justify-center text-on-surface-variant shadow-card transition-all active:scale-90"
          >
            {isLight ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>

        {/* Bottom nav pill */}
        <nav className="pointer-events-auto mobile-tab-bar relative flex items-center justify-between rounded-2xl py-1.5 px-2 mx-auto max-w-sm shadow-elevated">
          {navItems.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`mobile-tab-item relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[56px] ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-on-surface-variant hover:text-on-surface active:scale-90'
                }`}
              >
                <div className={`transition-transform ${isActive ? 'scale-105' : ''}`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] leading-none transition-all ${
                  isActive ? 'font-medium' : 'font-normal'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

function NavItem({ to, icon, label, active = false, onClick }: { to: string, icon: any, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
        active 
          ? 'bg-primary/[0.08] text-primary font-medium' 
          : 'text-on-surface-variant hover:bg-on-surface/[0.04] hover:text-on-surface'
      }`}
    >
      {icon}
      <span className="text-[13px]">{label}</span>
    </Link>
  );
}
