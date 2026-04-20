import { X, FileText, Table, Presentation, Check, Download, AlertCircle, Info, Eye } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ExportIntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportData: {
    id: string;
    project: string;
    subject: string;
    date: string;
    score: number;
    inspector: string;
    findingsCount: number;
    violationsCount: number;
  };
}

export default function ExportIntelligenceModal({ isOpen, onClose, reportData }: ExportIntelligenceModalProps) {
  const [format, setFormat] = useState<'pdf' | 'excel' | 'slides'>('pdf');
  const [scope, setScope] = useState<'full' | 'summary' | 'violations'>('full');
  const [enrichments, setEnrichments] = useState<string[]>(['visuals', 'merit']);

  if (!isOpen) return null;

  const toggleEnrichment = (id: string) => {
    setEnrichments(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-surface border border-on-surface/[0.08] rounded-2xl shadow-elevated overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Left: Configuration */}
        <div className="flex-1 p-6 md:p-8 space-y-7 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[13px] text-primary font-medium mb-1">Export</p>
              <h2 className="text-[22px] font-semibold tracking-tight text-on-surface">Configure Export</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-surface-lowest text-on-surface-variant transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Format Selection */}
          <div className="space-y-3">
            <h3 className="text-[13px] text-on-surface-variant">Output Format</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FormatOption 
                icon={<FileText size={18} />} 
                label="PDF" 
                desc="Document" 
                active={format === 'pdf'} 
                onClick={() => setFormat('pdf')} 
              />
              <FormatOption 
                icon={<Table size={18} />} 
                label="Excel" 
                desc="Spreadsheet" 
                active={format === 'excel'} 
                onClick={() => setFormat('excel')} 
              />
              <FormatOption 
                icon={<Presentation size={18} />} 
                label="Slides" 
                desc="Presentation" 
                active={format === 'slides'} 
                onClick={() => setFormat('slides')} 
              />
            </div>
          </div>

          {/* Scope */}
          <div className="space-y-3">
            <h3 className="text-[13px] text-on-surface-variant">Scope</h3>
            <div className="space-y-2">
              <ScopeOption 
                label="Full Report" 
                desc="All checklist items, photos, and metadata."
                active={scope === 'full'}
                onClick={() => setScope('full')}
              />
              <ScopeOption 
                label="Executive Summary" 
                desc="Key metrics and high-level findings."
                active={scope === 'summary'}
                onClick={() => setScope('summary')}
              />
              <ScopeOption 
                label="Violations Only" 
                desc="Failed items and action requirements."
                active={scope === 'violations'}
                onClick={() => setScope('violations')}
              />
            </div>
          </div>

          {/* Enrichments */}
          <div className="space-y-3">
            <h3 className="text-[13px] text-on-surface-variant">Include</h3>
            <div className="flex flex-wrap gap-2">
              <EnrichmentChip 
                label="Photos" 
                active={enrichments.includes('visuals')} 
                onClick={() => toggleEnrichment('visuals')} 
              />
              <EnrichmentChip 
                label="Merit Scores" 
                active={enrichments.includes('merit')} 
                onClick={() => toggleEnrichment('merit')} 
              />
              <EnrichmentChip 
                label="GPS Data" 
                active={enrichments.includes('gps')} 
                onClick={() => toggleEnrichment('gps')} 
              />
              <EnrichmentChip 
                label="Digital Signature" 
                active={enrichments.includes('sig')} 
                onClick={() => toggleEnrichment('sig')} 
              />
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="w-full md:w-[320px] bg-surface-lowest/50 border-l border-on-surface/[0.04] p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h3 className="text-[13px] text-on-surface-variant mb-4">Preview</h3>
              <div className="apple-card p-5 border-l-2 border-primary">
                <div className="text-[12px] text-primary font-medium mb-0.5">{reportData.project}</div>
                <div className="text-[17px] font-semibold text-on-surface tracking-tight leading-tight mb-4">{reportData.subject}</div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] text-on-surface-variant mb-0.5">Score</div>
                    <div className="text-[20px] font-semibold text-primary tracking-tight">{reportData.score}%</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-on-surface-variant mb-0.5">Status</div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <div className="text-[13px] font-medium text-on-surface">Validated</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-surface-lowest text-primary">
                  <Info size={14} />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-on-surface">Summary</div>
                  <p className="text-[12px] text-on-surface-variant leading-relaxed mt-0.5">
                    {reportData.findingsCount} data points across {reportData.violationsCount} categories. Compliance within target.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                 <div className="flex-1 space-y-1">
                    <div className="text-[12px] text-review-amber font-medium flex items-center gap-1">
                       <AlertCircle size={10} /> {reportData.violationsCount} risks
                    </div>
                    <div className="h-1 w-full bg-on-surface/[0.04] rounded-full overflow-hidden">
                       <div className="h-full bg-review-amber rounded-full w-1/3" />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <Link 
              to={`/report/${reportData.id}/preview`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-on-surface/[0.08] text-on-surface-variant text-[13px] font-medium hover:bg-surface transition-all"
            >
              <Eye size={14} /> Preview
            </Link>
            
            <button className="w-full group relative flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-white font-medium text-[13px] overflow-hidden transition-all hover:opacity-90 active:scale-[0.98]">
              <Download size={16} /> Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormatOption({ icon, label, desc, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`p-4 rounded-xl border text-left transition-all ${active ? 'bg-primary border-primary text-white' : 'bg-surface border-on-surface/[0.06] text-on-surface-variant hover:border-primary/20'}`}
    >
      <div className={`${active ? 'text-white/80' : 'text-primary/60'} mb-2`}>{icon}</div>
      <div className="text-[13px] font-medium leading-none mb-0.5">{label}</div>
      <div className={`text-[11px] opacity-60`}>{desc}</div>
    </button>
  );
}

function ScopeOption({ label, desc, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full p-4 rounded-xl border flex items-center justify-between gap-4 text-left transition-all ${active ? 'bg-primary/[0.04] border-primary/30' : 'bg-surface border-on-surface/[0.06] hover:border-primary/20'}`}
    >
      <div className="flex-1">
        <div className={`text-[13px] font-medium mb-0.5 ${active ? 'text-on-surface' : 'text-on-surface-variant'}`}>{label}</div>
        <div className="text-[12px] text-on-surface-variant/70 leading-relaxed">{desc}</div>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${active ? 'bg-primary border-primary' : 'border-on-surface/[0.15]'}`}>
        {active && <Check size={12} className="text-white" />}
      </div>
    </button>
  );
}

function EnrichmentChip({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-3.5 py-2 rounded-xl border text-[12px] transition-all ${active ? 'bg-primary/[0.08] border-primary/30 text-primary font-medium' : 'bg-surface border-on-surface/[0.06] text-on-surface-variant hover:border-primary/20'}`}
    >
      {label}
    </button>
  );
}
