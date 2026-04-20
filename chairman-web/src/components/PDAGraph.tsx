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

export function PDAGraph({ title, data, labels, color = '#007AFF', height = 200, valueSuffix = '' }: PDAGraphProps) {
  const maxValue = Math.max(...data, 1);
  const padding = 40;
  const graphId = useMemo(() => title.replace(/\s+/g, '-').toLowerCase(), [title]);
  
  const points = useMemo(() => {
    const width = 800;
    const stepX = (width - padding * 2) / (data.length - 1);
    return data.map((val, i) => {
      const x = padding + i * stepX;
      const y = height - padding - (val / maxValue) * (height - padding * 2);
      return { x, y };
    });
  }, [data, height, maxValue]);

  const pathData = useMemo(() => {
    if (points.length < 2) return '';
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
    <div className="apple-card p-5 flex flex-col gap-3 overflow-hidden group">
      <div className="flex items-center justify-between">
        <div>
           <div className="flex items-center gap-2 mb-0.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              <h4 className="text-[13px] font-medium text-on-surface">{title}</h4>
           </div>
           <p className="text-[11px] text-on-surface-variant">30-day trend</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
             <div className="text-[20px] font-semibold text-on-surface tracking-tight leading-none">
               {data[data.length - 1]}{valueSuffix}
             </div>
             <div className="text-[11px] text-primary font-medium mt-0.5">Latest</div>
          </div>
          <button 
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," + labels.join(",") + "\n" + data.join(",");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", `${title.toLowerCase().replace(/\s+/g, '-')}-data.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="w-7 h-7 rounded-lg bg-surface-lowest flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/[0.08] transition-all active:scale-90"
            title={`Export ${title} Data`}
          >
            <Download size={13} />
          </button>
        </div>
      </div>

      <div className="relative mt-2 flex-1 h-[200px]">
        <svg viewBox={`0 0 800 ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`gradient-${graphId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.15" />
              <stop offset="100%" stopColor={color} stopOpacity="0.02" />
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
              stroke="currentColor" 
              strokeOpacity="0.04" 
              strokeWidth="1"
              className="text-on-surface"
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
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="animate-draw-path"
          />

          {/* End point */}
          <circle 
            cx={points[points.length - 1].x} 
            cy={points[points.length - 1].y} 
            r="3.5" 
            fill={color} 
            className="animate-glow-bloom"
          />
        </svg>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes drawPath {
            from { stroke-dashoffset: 2000; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes revealArea {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes glowBloom {
            0% { transform: scale(0); opacity: 0; }
            80% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-draw-path {
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: drawPath 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          .animate-reveal-area {
            animation: revealArea 1.5s ease-out 0.8s both;
          }
          .animate-glow-bloom {
            animation: glowBloom 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2s both;
          }
        `}} />

        {/* Labels */}
        <div className="flex justify-between mt-3 px-1">
           {labels.filter((_, i) => {
             const density = typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 5;
             return i % density === 0 || i === labels.length - 1;
           }).map((lbl, i) => (
             <span key={i} className="text-[10px] text-on-surface-variant">{lbl}</span>
           ))}
        </div>
      </div>
    </div>
  );
}
