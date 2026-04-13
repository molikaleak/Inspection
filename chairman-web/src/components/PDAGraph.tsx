import React, { useMemo } from 'react';
import { Download } from 'lucide-react';

interface PDAGraphProps {
  title: string;
  data: number[];
  labels: string[];
  color?: string;
  height?: number;
  valueSuffix?: string;
}

export function PDAGraph({ title, data, labels, color = '#10b981', height = 200, valueSuffix = '' }: PDAGraphProps) {
  const maxValue = Math.max(...data, 1);
  const padding = 40;
  const graphId = useMemo(() => title.replace(/\s+/g, '-').toLowerCase(), [title]);
  
  const points = useMemo(() => {
    const width = 800; // Reference width
    const stepX = (width - padding * 2) / (data.length - 1);
    return data.map((val, i) => {
      const x = padding + i * stepX;
      const y = height - padding - (val / maxValue) * (height - padding * 2);
      return { x, y };
    });
  }, [data, height, maxValue]);

  const pathData = useMemo(() => {
    if (points.length < 2) return '';
    // Use cubic bezier for smooth curves
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const curr = points[i];
        const next = points[i + 1];
        const cp1x = curr.x + (next.x - curr.x) / 2;
        const cp1y = curr.y;
        const cp2x = curr.x + (next.x - curr.x) / 2;
        const cp2y = next.y;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }
    return d;
  }, [points]);

  const areaData = useMemo(() => {
    if (!pathData) return '';
    return `${pathData} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;
  }, [pathData, points, height]);

  return (
    <div className="editorial-card p-6 flex flex-col gap-4 bg-on-surface/[0.01] overflow-hidden group">
      <div className="flex items-center justify-between">
        <div>
           <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant leading-none">{title}</h4>
           </div>
           <p className="text-[8px] font-bold text-on-surface-variant/40 uppercase tracking-widest leading-none">30-Day Intelligence Aggregate</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
             <div className="text-2xl font-black text-on-surface tracking-tighter italic leading-none">
               {data[data.length - 1]}{valueSuffix}
             </div>
             <div className="text-[8px] font-black text-primary uppercase tracking-widest mt-1">Latest Vector</div>
          </div>
          <button 
            onClick={() => {
              // Simulated tactical data export
              const csvContent = "data:text/csv;charset=utf-8," + labels.join(",") + "\n" + data.join(",");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", `${title.toLowerCase().replace(/\s+/g, '-')}-archive.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="w-8 h-8 rounded-lg bg-on-surface/5 border border-on-surface/10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all active:scale-75 group/btn"
            title={`Export ${title} Data`}
          >
            <Download size={14} className="group-hover/btn:animate-bounce" />
          </button>
        </div>
      </div>

      <div className="relative mt-4 flex-1 h-[200px]">
        <svg viewBox={`0 0 800 ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`gradient-${graphId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
            <line 
              key={i}
              x1={padding} 
              y1={padding + p * (height - padding * 2)} 
              x2={800 - padding} 
              y2={padding + p * (height - padding * 2)} 
              stroke="white" 
              strokeOpacity="0.03" 
              strokeWidth="1"
            />
          ))}

          {/* Vertical axis markers */}
          {points.filter((_, i) => i % 5 === 0).map((p, i) => (
            <line 
              key={i}
              x1={p.x} 
              y1={padding} 
              x2={p.x} 
              y2={height - padding} 
              stroke="white" 
              strokeOpacity="0.03" 
              strokeWidth="1"
            />
          ))}

          {/* Area fill */}
          <path 
            d={areaData} 
            fill={`url(#gradient-${graphId})`} 
            className="animate-reveal-area" 
          />
          
          {/* Line */}
          <path 
            d={pathData} 
            fill="none" 
            stroke={color} 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="animate-draw-path drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
          />

          {/* End point glow */}
          <circle 
            cx={points[points.length - 1].x} 
            cy={points[points.length - 1].y} 
            r="4" 
            fill={color} 
            className="animate-glow-bloom shadow-glow"
          />
        </svg>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes drawPath {
            from { stroke-dashoffset: 2000; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes revealArea {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowBloom {
            0% { transform: scale(0); opacity: 0; }
            80% { transform: scale(1.5); opacity: 1; }
            100% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 8px ${color}); }
          }
          .animate-draw-path {
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: drawPath 3s cubic-bezier(0.65, 0, 0.35, 1) forwards;
          }
          .animate-reveal-area {
            animation: revealArea 2s ease-out 1s both;
          }
          .animate-glow-bloom {
            animation: glowBloom 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2.8s both;
          }
        `}} />

        {/* Labels - Dynamic Density for Mobile */}
        <div className="flex justify-between mt-4 px-2">
           {labels.filter((_, i) => {
             // Show only 4 labels on mobile, 7 on desktop
             const density = typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 5;
             return i % density === 0 || i === labels.length - 1;
           }).map((lbl, i) => (
             <span key={i} className="text-[7px] font-black text-on-surface-variant uppercase tracking-widest">{lbl}</span>
           ))}
        </div>
      </div>
    </div>
  );
}
