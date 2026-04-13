import { LayoutDashboard, Archive, BarChart3, Settings, LogOut, ShieldCheck, Menu, X, Calendar, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export function Sidebar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isLight, toggleTheme } = useTheme();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, mobileIcon: <LayoutDashboard size={22} />, label: 'Overview' },
    { to: '/insights', icon: <BarChart3 size={20} />, mobileIcon: <BarChart3 size={22} />, label: 'Insights' },
    { to: '/appointments', icon: <Calendar size={20} />, mobileIcon: <Calendar size={22} />, label: 'Schedule' },
    { to: '/archive', icon: <Archive size={20} />, mobileIcon: <Archive size={22} />, label: 'Archive' },
  ];

  return (
    <>
      {/* Desktop Sidebar — hidden on mobile */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-surface-low border-r border-on-surface/5 p-6 flex-col z-[58]">

        <div className="mb-10 px-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg emerald-gradient flex items-center justify-center shadow-glow">
              <ShieldCheck className="text-white" size={18} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-on-surface leading-none uppercase">Inspector</h1>
              <p className="text-[8px] uppercase tracking-[0.3em] font-black text-primary">Chairman Portal</p>
            </div>
          </div>
          <button 
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg bg-surface-lowest border border-on-surface/5 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all"
          >
            {isLight ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>

        <nav className="flex-1 space-y-2">
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

        <div className="pt-6 border-t border-on-surface/5">
          <div className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-on-surface/5 rounded-xl transition-colors group">
            <div className="w-8 h-8 rounded-full bg-surface-lowest flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
              <LogOut size={16} />
            </div>
            <span className="text-xs font-bold text-on-surface-variant group-hover:text-on-surface uppercase tracking-widest">Logout</span>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] px-4 pb-6 pt-2 pointer-events-none">
        {/* Theme toggle - floating above the tab bar */}
        <div className="pointer-events-auto flex justify-end mb-4 pr-1">
          <button 
            onClick={toggleTheme}
            className="w-12 h-12 rounded-full bg-surface-low/80 backdrop-blur-2xl border border-on-surface/10 flex items-center justify-center text-on-surface-variant shadow-ambient transition-all active:scale-75 active:rotate-12"
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        {/* Bottom nav pill */}
        <nav className="pointer-events-auto mobile-tab-bar relative flex items-center justify-between rounded-[32px] py-2 px-3 mx-auto max-w-md border border-white/10 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          
          {navItems.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`mobile-tab-item relative flex flex-col items-center justify-center gap-1.5 px-2 py-2.5 rounded-2xl transition-all duration-300 min-w-[64px] ${
                  isActive 
                    ? 'text-white' 
                    : 'text-white/40 hover:text-white/70 active:scale-90'
                }`}
              >
                {/* Active indicator background */}
                {isActive && (
                  <div className="absolute inset-x-1 inset-y-1.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/10 animate-in zoom-in-95 duration-200" />
                )}
                
                <div className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-0.5' : ''}`}>
                  {item.mobileIcon}
                </div>
                
                <span className={`relative z-10 text-[8px] font-black uppercase tracking-widest leading-none transition-all duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-60 text-[7px]'
                }`}>
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute bottom-1 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)] animate-pulse" />
                )}
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
      className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
        active 
          ? 'bg-surface-lowest shadow-glow text-primary border border-primary/20 scale-105 font-bold' 
          : 'text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
      }`}
    >

      {icon}
      <span className="text-sm tracking-tight">{label}</span>
    </Link>
  );
}
