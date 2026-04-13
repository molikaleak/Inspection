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
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ease-out"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-surface border border-on-surface/10 rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in duration-300">
        
        {/* Left: Configuration Panel */}
        <div className="flex-1 p-8 md:p-12 space-y-10 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Export Protocol</p>
              <h2 className="text-3xl font-black tracking-tighter text-on-surface">Intelligence Configuration</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-on-surface/5 text-on-surface-variant transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Format Selection */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Select Output Vector</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormatOption 
                icon={<FileText size={20} />} 
                label="PDF Dossier" 
                desc="Executive Grade" 
                active={format === 'pdf'} 
                onClick={() => setFormat('pdf')} 
              />
              <FormatOption 
                icon={<Table size={20} />} 
                label="XLSX Grid" 
                desc="Raw Analytics" 
                active={format === 'excel'} 
                onClick={() => setFormat('excel')} 
              />
              <FormatOption 
                icon={<Presentation size={20} />} 
                label="Briefing" 
                desc="Presentation" 
                active={format === 'slides'} 
                onClick={() => setFormat('slides')} 
              />
            </div>
          </div>

          {/* Scope Selection */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Define Payload Scope</h3>
            <div className="space-y-3">
              <ScopeOption 
                label="Full Intelligence Dossier" 
                desc="Include all checklist items, photos, and team metadata."
                active={scope === 'full'}
                onClick={() => setScope('full')}
              />
              <ScopeOption 
                label="Executive PDA Summary" 
                desc="Condensed overview highlighting key metrics and high-level findings."
                active={scope === 'summary'}
                onClick={() => setScope('summary')}
              />
              <ScopeOption 
                label="Critical Violation Stream" 
                desc="Only include failed checklist items and immediate action requirements."
                active={scope === 'violations'}
                onClick={() => setScope('violations')}
              />
            </div>
          </div>

          {/* Enrichment Toggles */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Metadata Enrichment</h3>
            <div className="flex flex-wrap gap-3">
              <EnrichmentChip 
                label="Visual Evidence" 
                active={enrichments.includes('visuals')} 
                onClick={() => toggleEnrichment('visuals')} 
              />
              <EnrichmentChip 
                label="Foreman Merit Scores" 
                active={enrichments.includes('merit')} 
                onClick={() => toggleEnrichment('merit')} 
              />
              <EnrichmentChip 
                label="GPS/Time Validation" 
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

        {/* Right: Meaningful Summary Preview */}
        <div className="w-full md:w-[350px] bg-on-surface/[0.03] border-l border-on-surface/5 p-8 flex flex-col justify-between">
          <div className="space-y-8">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-6">Payload Summary Preview</h3>
              <div className="editorial-card p-6 bg-surface-lowest shadow-glow border-l-2 border-primary">
                <div className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">{reportData.project}</div>
                <div className="text-xl font-black text-on-surface tracking-tighter leading-tight mb-4">{reportData.subject}</div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <div className="text-[8px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Audit Score</div>
                    <div className="text-2xl font-black text-primary tracking-tighter italic">{reportData.score}%</div>
                  </div>
                  <div>
                    <div className="text-[8px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Status</div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
                      <div className="text-[10px] font-black text-on-surface uppercase tracking-widest">Validated</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-on-surface/5 text-primary">
                  <Info size={14} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-on-surface">Intelligence Summary</div>
                  <p className="text-[9px] font-bold text-on-surface-variant leading-tight mt-1">
                    {reportData.findingsCount} data points analyzed across {reportData.violationsCount} operational vectors. Overall compliance is within target parameters.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="flex-1 space-y-1">
                    <div className="text-[9px] font-black text-review-amber uppercase tracking-widest flex items-center gap-1">
                       <AlertCircle size={10} /> {reportData.violationsCount} Risks Detected
                    </div>
                    <div className="h-1 w-full bg-on-surface/5 rounded-full overflow-hidden">
                       <div className="h-full bg-review-amber w-1/3" />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link 
              to={`/report/${reportData.id}/preview`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-on-surface/10 text-on-surface-variant font-black text-[10px] uppercase tracking-widest hover:bg-on-surface/[0.05] transition-all"
            >
              <Eye size={14} /> Full Document Preview
            </Link>
            
            <button className="w-full group relative flex items-center justify-center gap-3 py-5 rounded-[20px] bg-primary text-on-primary font-black text-xs uppercase tracking-[0.2em] shadow-glow overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]">
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <Download size={18} /> Generate Protocol
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
      className={`p-5 rounded-2xl border text-left transition-all duration-300 ${active ? 'bg-on-surface text-surface border-on-surface shadow-glow' : 'bg-surface-lowest text-on-surface-variant border-on-surface/5 hover:border-primary/30'}`}
    >
      <div className={`${active ? 'text-primary' : 'text-primary/60'} mb-3`}>{icon}</div>
      <div className="text-[11px] font-black uppercase tracking-widest leading-none mb-1">{label}</div>
      <div className={`text-[9px] font-bold opacity-60 leading-tight ${active ? 'text-surface' : ''}`}>{desc}</div>
    </button>
  );
}

function ScopeOption({ label, desc, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full p-5 rounded-2xl border flex items-center justify-between gap-6 text-left transition-all duration-300 ${active ? 'bg-on-surface/5 border-primary shadow-sm' : 'bg-surface-lowest border-on-surface/10 hover:border-primary/20'}`}
    >
      <div className="flex-1">
        <div className={`text-xs font-black tracking-tight mb-1 ${active ? 'text-on-surface' : 'text-on-surface-variant'}`}>{label}</div>
        <div className="text-[10px] font-medium opacity-60 leading-relaxed">{desc}</div>
      </div>
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${active ? 'bg-primary border-primary' : 'border-on-surface/20'}`}>
        {active && <Check size={14} className="text-on-primary" />}
      </div>
    </button>
  );
}

function EnrichmentChip({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-5 py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${active ? 'bg-primary/20 border-primary text-on-surface shadow-lg' : 'bg-surface-lowest border-on-surface/5 text-on-surface-variant hover:border-primary/30'}`}
    >
      {label}
    </button>
  );
}
