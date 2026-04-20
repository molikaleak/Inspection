import { useState, useMemo, useEffect } from 'react';
import { FileSpreadsheet, Search, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockReports, mockForemen, mockInspectorsData } from '../data/mockData';

const trackerData = [
  { no: 1, project: 'SHV Seaport', id: '6610', position: 'Foreman', khmerName: 'អឹម អាន', englishName: 'Em An', hours: 1094, men: 15, statM: '15M', color: '#fca5a5' },
  { no: 2, project: 'SHV Seaport', id: '6609', position: 'Foreman', khmerName: 'ទូច វណ្ណៈ', englishName: 'Touch Vannak', hours: 685, men: 8, statM: '8M', color: '#fca5a5' },
  { no: 3, project: 'FTB Tower', id: '0400', position: 'Foreman', khmerName: 'ប៉ែន ឈាន', englishName: 'Pen Chhean', hours: 639, men: 18, statM: '18M', color: '#fca5a5' },
  { no: 4, project: 'HQ', id: '0294', position: 'Senior Foreman', khmerName: 'ពាង សុផាណា', englishName: 'Peang Sophana', hours: 610, men: 25, statM: '25M', color: '#fca5a5' },
  { no: 5, project: 'SHV Seaport', id: '6608', position: 'Foreman', khmerName: 'ចេង សុភាព', englishName: 'Cheng Soheap', hours: 559, men: 8, statM: '8M', color: '#fca5a5' },
  { no: 6, project: 'FTB Tower', id: '0370', position: 'Foreman', khmerName: 'ហ៊ូ វុទ្ធី', englishName: 'Hou Vuthy', hours: 514, men: 21, statM: '21M', color: '#fca5a5' },
  { no: 7, project: 'FTB Tower', id: '4838', position: 'Foreman', khmerName: 'អូច គឹមហាត', englishName: 'Ouch Koemheat', hours: 491, men: 15, statM: '15M', color: '#fca5a5' },
  { no: 8, project: 'SHV Seaport', id: '4133', position: 'Foreman', khmerName: 'សាក់ ធុនា', englishName: 'Sakk Thona', hours: 478, men: 9, statM: '9M', color: '#fca5a5' },
  { no: 9, project: 'Wing Tower', id: '2295', position: 'Foreman', khmerName: 'ហម ចាន់ណន', englishName: 'Horm Channorn', hours: 445, men: 9, statM: '9M', color: '#fca5a5' },
  { no: 10, project: 'FTB Tower', id: '0114', position: 'Foreman', khmerName: 'ស៊ន សោម', englishName: 'Soun Saem', hours: 420, men: 11, statM: '11M', color: '#fca5a5' },
  { no: 11, project: 'FTB Tower', id: '0046', position: 'Foreman', khmerName: 'ផាន់ អេន', englishName: 'Phan En', hours: 334, men: 7, statM: '7M', color: '#fca5a5' },
  { no: 12, project: 'J Trust Tower', id: '2353', position: 'Foreman', khmerName: 'លួន រស្មី', englishName: 'Luon Rasmey', hours: 305, men: 10, statM: '10M', color: '#fca5a5' },
  { no: 13, project: 'FTB Tower', id: '3436', position: 'Foreman', khmerName: 'ទួន ប៊ុនធឿន', englishName: 'Toun Bontheun', hours: 286, men: 12, statM: '12M', color: '#fca5a5' },
  { no: 14, project: 'HQ', id: '5939', position: 'Foreman', khmerName: 'លី សារិន', englishName: 'Ly Sarin', hours: 246, men: 8, statM: '8M', color: '#fca5a5' },
  { no: 15, project: 'FTB Tower', id: '0233', position: 'Foreman', khmerName: 'ហៀប សុខុន', englishName: 'Heap Sokoun', hours: 219, men: 7, statM: '7M', color: '#fca5a5' },
  { no: 16, project: 'J Trust Tower', id: '0076', position: 'Foreman', khmerName: 'ទៀង ចក់', englishName: 'Tien Chak', hours: 218, men: 9, statM: '9M', color: '#fca5a5' },
  { no: 17, project: 'Production', id: '0417', position: 'Foreman', khmerName: 'ឆាន់ ភារៈ', englishName: 'Chhan Phearak', hours: 175, men: 59, statM: '59M', color: '#fca5a5' },
  { no: 18, project: 'J Trust Tower', id: '0534', position: 'Foreman', khmerName: 'រស់ ផល្លាប', englishName: 'Ros Pholleab', hours: 169, men: 8, statM: '8M', color: '#fca5a5' },
  { no: 19, project: 'OISHI', id: '0475', position: 'Foreman', khmerName: 'ឈិន សោវី', englishName: 'Chhin Saory', hours: 149, men: 8, statM: '8M', color: '#fca5a5' },
  { no: 20, project: 'J Trust Tower', id: '0051', position: 'Foreman', khmerName: 'រឿន ចាន់រ៉េត', englishName: 'Roeun Chanreth', hours: 146, men: 9, statM: '9M', color: '#fca5a5' },
  { no: 21, project: 'J Trust Tower', id: '0101', position: 'Foreman', khmerName: 'ស្រ៊ិន ចាន់ណាក់', englishName: 'Srin Channak', hours: 104, men: 5, statM: '5M', color: '#fca5a5' },
  { no: 22, project: 'J Trust Tower', id: '0306', position: 'Foreman', khmerName: 'ម៉េង ចាន់ធឿន', englishName: 'Meng Chanthoeurn', hours: 84, men: 6, statM: '6M', color: '#fca5a5' },
  { no: 23, project: 'CHANG', id: '0256', position: 'Foreman', khmerName: 'ប្រាក់ វុទ្ធី', englishName: 'Prak Vuthy', hours: 78, men: 11, statM: '11M', color: '#fca5a5' },
  { no: 24, project: 'OISHI', id: '1846', position: 'Foreman', khmerName: 'ចាប មករា', englishName: 'Chab Makara', hours: 75, men: 4, statM: '4M', color: '#fca5a5' },
  { no: 25, project: 'CHANG', id: '0015', position: 'Foreman', khmerName: 'ជា សារុំ', englishName: 'Chea Sarom', hours: 46, men: 8, statM: '8M', color: '#fca5a5' },
  { no: 26, project: 'J Trust Tower', id: '0361', position: 'Foreman', khmerName: 'ផេង សុភា', englishName: 'Pheng Sophea', hours: 44, men: 6, statM: '7M', color: '#fca5a5' },
  { no: 27, project: 'J Trust Tower', id: '0434', position: 'Foreman', khmerName: 'ផាន់ រ៉ាវ៉េត', englishName: 'Phann Ravet', hours: 44, men: 7, statM: '6M', color: '#fca5a5' },
  { no: 28, project: 'WCIS', id: '0115', position: 'Foreman', khmerName: 'វុធ ពិសិដ្ឋ', englishName: 'Vuth Piseth', hours: 40, men: 3, statM: '3M', color: '#fca5a5' },
  { no: 29, project: 'WCIS', id: '0502', position: 'Foreman', khmerName: 'នូ ស៊ីចាន់', englishName: 'Nou Sichan', hours: 20, men: 5, statM: '5M', color: '#fca5a5' },
  { no: 30, project: 'OISHI', id: '0802', position: 'Foreman', khmerName: 'កេត សុផានរ៉ាត់', englishName: 'Ket Sophanrat', hours: 15, men: 2, statM: '2M', color: '#fca5a5' },
  { no: 31, project: 'WCIS', id: '2466', position: 'Foreman', khmerName: 'ឈន ចារ៉ាត់', englishName: 'Chhon Jarat', hours: 12, men: 5, statM: '5M', color: '#fca5a5' },
];

export default function Tracker() {
  const navigate = useNavigate();
  const [mainTab, setMainTab] = useState<'ot' | 'inspection'>('ot');

  // OT Tracker state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('All');
  const [viewMode, setViewMode] = useState<'smart' | 'excel'>('excel');
  const [showHint, setShowHint] = useState(true);

  // Inspection Tracker state
  const [inspSearchQuery, setInspSearchQuery] = useState('');
  const [inspViewMode, setInspViewMode] = useState<'smart' | 'excel'>('excel');
  const [showInspHint, setShowInspHint] = useState(true);

  // Auto-hide the hint after 6 seconds to not be annoying
  useEffect(() => {
     const timer = setTimeout(() => { setShowHint(false); setShowInspHint(false); }, 6000);
     return () => clearTimeout(timer);
  }, []);

  const filteredData = useMemo(() => {
    return trackerData.filter(row => {
      const query = searchQuery.toLowerCase();
      return row.project.toLowerCase().includes(query) || 
             row.englishName.toLowerCase().includes(query) || 
             row.khmerName.toLowerCase().includes(query) || 
             row.id.includes(query);
    });
  }, [searchQuery]);

  const filteredInspData = useMemo(() => {
    return mockReports.filter(row => {
      const query = inspSearchQuery.toLowerCase();
      return row.project.toLowerCase().includes(query) || 
             row.subject.toLowerCase().includes(query) || 
             row.inspector.toLowerCase().includes(query) || 
             row.id.toLowerCase().includes(query);
    });
  }, [inspSearchQuery]);

  const maxHours = Math.max(...trackerData.map(d => d.hours), 1);

  return (
    <div className="flex-1 lg:pl-60 min-h-screen bg-[#f3f4f6] transition-all overflow-hidden flex flex-col relative w-full pt-4">
      <main className="max-w-6xl mx-auto w-full p-4 pb-32 lg:pb-8">
        <div className="flex items-center gap-3 mb-6">
           <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm shrink-0">
             <FileSpreadsheet className="text-white" size={20} />
           </div>
           <div>
             <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-tight uppercase">Master Reports</h1>
             <p className="text-[13px] text-gray-500 font-medium tracking-wide">Data Repository</p>
           </div>
        </div>

        {/* Parent Tabs */}
        <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm mb-6 max-w-sm">
           <button 
             onClick={() => setMainTab('ot')}
             className={`flex-1 px-4 py-2 rounded-lg text-[13px] font-bold transition-all ${mainTab === 'ot' ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' : 'text-gray-500 hover:text-gray-900'}`}
           >
             OT Report
           </button>
           <button 
             onClick={() => setMainTab('inspection')}
             className={`flex-1 px-4 py-2 rounded-lg text-[13px] font-bold transition-all ${mainTab === 'inspection' ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' : 'text-gray-500 hover:text-gray-900'}`}
           >
             Inspection Report
           </button>
        </div>

        {mainTab === 'ot' && (
          <div className="animate-in fade-in duration-300">
            {/* Filter & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm mb-6">
               <div className="flex gap-1 overflow-x-auto no-scrollbar">
                  {['All', 'Today', 'This Week', 'This Month'].map(f => (
                     <button 
                       key={f} 
                       onClick={() => setFilterDate(f)}
                       className={`px-4 py-2 rounded-xl text-[13px] whitespace-nowrap transition-all ${filterDate === f ? 'bg-gray-100/80 text-gray-900 font-medium border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
                     >
                       {f}
                     </button>
                  ))}
               </div>
               <div className="flex items-center gap-2 w-full md:w-auto">
                  {/* View Mode Toggle */}
                  <div className="flex gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100 shrink-0">
                     <div className="relative">
                       <button 
                         onClick={() => { setViewMode('smart'); setShowHint(false); }}
                         className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${viewMode === 'smart' ? 'bg-white shadow-sm text-gray-900 border border-gray-200/60' : 'text-gray-500 hover:text-gray-900'}`}
                       >
                         Smart Mode
                       </button>
                       
                       {/* Teaching Hint Tooltip (Only on Mobile) */}
                       {showHint && viewMode === 'excel' && (
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg animate-bounce z-20 pointer-events-none md:hidden">
                           Tap for better view!
                           <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-blue-600"></div>
                         </div>
                       )}
                     </div>
                     <button 
                       onClick={() => setViewMode('excel')}
                       className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${viewMode === 'excel' ? 'bg-white shadow-sm text-gray-900 border border-gray-200/60' : 'text-gray-500 hover:text-gray-900'}`}
                     >
                       Excel Form
                     </button>
                  </div>

                  <div className="relative group flex-1 md:max-w-xs shrink-0">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                     <input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search OT entries..." 
                        className="w-full pl-8 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-[13px] outline-none focus:ring-2 ring-green-600/20 placeholder:text-gray-400 transition-all text-gray-900"
                     />
                  </div>
               </div>
            </div>

            {/* Mobile Smart Mode Layout */}
            {viewMode === 'smart' && (
            <div className="space-y-3 animate-in fade-in duration-300">
              {filteredData.length === 0 ? (
                 <div className="text-center p-8 bg-white rounded-xl border border-gray-100 text-[13px] text-gray-500">No entries match your search.</div>
              ) : (
              filteredData.map((row, idx) => (
                 <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3 relative overflow-hidden">
                    <div className="flex justify-between items-start z-10">
                       <div>
                         <h3 className="font-bold text-[14px] text-gray-900 leading-none mb-1">{row.englishName}</h3>
                         <p className="text-[13px] font-khmer text-gray-500 mb-1">{row.khmerName}</p>
                         <p className="text-[11px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-md inline-block">{row.project} • {row.id}</p>
                       </div>
                       <div className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                          NO. {row.no}
                       </div>
                    </div>

                    <div className="flex items-center gap-6 mt-1 z-10">
                       <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Total OT</span>
                          <span className="font-bold text-[14px] text-gray-900">{row.hours} <span className="text-gray-500 text-[11px] font-normal">hrs</span></span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Manpower</span>
                          <span className="font-bold text-[14px] text-gray-900">{row.men} <span className="text-gray-500 text-[11px] font-normal">men</span></span>
                       </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full relative h-5 rounded-lg overflow-hidden bg-gray-50 mt-1 flex items-center z-10 border border-gray-100">
                       {row.hours > 0 ? (
                          <>
                            <div className="absolute top-0 left-0 h-full bg-red-300 transition-all" style={{ width: `${(row.hours / maxHours) * 100}%` }}></div>
                            <span className="relative z-10 text-[10px] font-bold text-gray-900 ml-2 tracking-tight">{row.hours} HR • {row.statM}</span>
                          </>
                       ) : (
                          <span className="relative z-10 text-[10px] font-medium text-gray-400 ml-2 tracking-tight">0hr 0M</span>
                       )}
                    </div>
                 </div>
              )))}
            </div>
            )}

            {/* Desktop Spreadsheet Layout */}
            {viewMode === 'excel' && (
            <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-x-auto animate-in fade-in duration-300">
              <table className="w-full border-collapse text-[12px] min-w-[800px]">
                <thead>
                  <tr className="bg-[#10b981] text-white">
                    <th className="border border-white/20 px-2 py-2 text-center w-12 font-semibold tracking-wide">NO.</th>
                    <th className="border border-white/20 px-3 py-2 text-left font-semibold tracking-wide">Project</th>
                    <th className="border border-white/20 px-2 py-2 text-center w-16 font-semibold tracking-wide">ID</th>
                    <th className="border border-white/20 px-3 py-2 text-left font-semibold tracking-wide">Position</th>
                    <th className="border border-white/20 px-3 py-2 text-left font-semibold tracking-wide">Khmer Name</th>
                    <th className="border border-white/20 px-3 py-2 text-left font-semibold tracking-wide">English Name</th>
                    <th className="border border-white/20 px-2 py-2 text-center font-semibold tracking-wide">Hours</th>
                    <th className="border border-white/20 px-2 py-2 text-center font-semibold tracking-wide">Men</th>
                    <th className="border border-white/20 px-4 py-2 text-left bg-[#f3f4f6] text-green-700 w-[350px]">
                       <div className="text-[11px] font-bold leading-tight">FOREMAN OT TRACKER</div>
                       <div className="text-[10px] opacity-80">21 JAN 2026-20 FEB 2026</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                     <tr>
                        <td colSpan={9} className="border border-gray-300 py-8 text-center text-gray-500">
                           No data matches your search query.
                        </td>
                     </tr>
                  ) : (
                    filteredData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="border border-gray-300 px-2 py-1.5 text-center text-gray-900 bg-white">{row.no}</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-gray-800 bg-white">{row.project}</td>
                      <td className="border border-gray-300 px-2 py-1.5 text-center text-gray-800 bg-white">{row.id}</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-gray-800 bg-white">{row.position}</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-gray-800 bg-white font-khmer">{row.khmerName}</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-gray-900 bg-white">{row.englishName}</td>
                      <td className="border border-gray-300 px-2 py-1.5 text-center font-medium text-gray-900 bg-white">{row.hours}</td>
                      <td className="border border-gray-300 px-2 py-1.5 text-center text-gray-800 bg-white">{row.men}</td>
                      <td className="border border-gray-300 py-1.5 px-0 relative bg-white">
                         {row.hours > 0 ? (
                           <div className="flex items-center w-full h-full">
                              <div 
                                 className="h-6 bg-[#fca5a5] flex items-center justify-end px-2"
                                 style={{ width: `${(row.hours / maxHours) * 90}%` }}
                              >
                                 <span className="text-[10px] text-gray-800 tracking-tighter whitespace-nowrap">{row.hours}hr</span>
                              </div>
                              <span className="text-[10px] font-medium text-blue-700 ml-1.5 tracking-tighter">{row.statM}</span>
                           </div>
                         ) : (
                           <div className="flex items-center w-full h-full px-2 text-[10px] text-gray-600 tracking-tighter">
                              0hr 0M
                           </div>
                         )}
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
            )}
          </div>
        )}

        {mainTab === 'inspection' && (
          <div className="animate-in fade-in duration-300">
            {/* Filter & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm mb-6">
               <div className="flex gap-1 overflow-x-auto no-scrollbar">
                  {['All', 'Today', 'This Week', 'This Month'].map(f => (
                     <button 
                       key={f} 
                       className={`px-4 py-2 rounded-xl text-[13px] whitespace-nowrap transition-all ${f === 'All' ? 'bg-gray-100/80 text-gray-900 font-medium border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
                     >
                       {f}
                     </button>
                  ))}
               </div>
               <div className="flex items-center gap-2 w-full md:w-auto">
                  {/* View Mode Toggle */}
                  <div className="flex gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100 shrink-0">
                     <div className="relative">
                       <button 
                         onClick={() => { setInspViewMode('smart'); setShowInspHint(false); }}
                         className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${inspViewMode === 'smart' ? 'bg-white shadow-sm text-gray-900 border border-gray-200/60' : 'text-gray-500 hover:text-gray-900'}`}
                       >
                         Smart Mode
                       </button>
                       
                       {/* Teaching Hint Tooltip (Only on Mobile) */}
                       {showInspHint && inspViewMode === 'excel' && (
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg animate-bounce z-20 pointer-events-none md:hidden">
                           Tap for better view!
                           <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-blue-600"></div>
                         </div>
                       )}
                     </div>
                     <button 
                       onClick={() => setInspViewMode('excel')}
                       className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${inspViewMode === 'excel' ? 'bg-white shadow-sm text-gray-900 border border-gray-200/60' : 'text-gray-500 hover:text-gray-900'}`}
                     >
                       Excel Form
                     </button>
                  </div>

                  <div className="relative group flex-1 md:max-w-xs shrink-0">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                     <input 
                        value={inspSearchQuery}
                        onChange={(e) => setInspSearchQuery(e.target.value)}
                        placeholder="Search inspections..." 
                        className="w-full pl-8 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-[13px] outline-none focus:ring-2 ring-blue-600/20 placeholder:text-gray-400 transition-all text-gray-900"
                     />
                  </div>
               </div>
            </div>

            {/* Smart Mode Cards Layout */}
            {inspViewMode === 'smart' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-300">
               {filteredInspData.length === 0 ? (
                 <div className="col-span-full text-center p-8 bg-white rounded-xl border border-gray-100 text-[13px] text-gray-500">No inspections match your search.</div>
               ) : (
                 filteredInspData.map((report) => (
                   <div key={report.id} onClick={() => navigate(`/report/${report.id}`)} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group">
                      {/* Header */}
                      <div className="flex justify-between items-center pb-4 border-b border-gray-50 mb-4">
                         <div className="flex items-center gap-3">
                            <img src={mockInspectorsData[report.inspector]?.avatar} className="w-10 h-10 rounded-full object-cover shadow-sm bg-gray-100" alt={report.inspector} />
                            <div>
                               <h3 className="font-semibold text-gray-900 text-[15px] leading-tight">{report.inspector}</h3>
                               <p className="text-[12px] text-gray-500">Inspector</p>
                            </div>
                         </div>
                         <span className={`text-[12px] font-semibold ${report.status === 'Viewed' ? 'text-blue-500' : 'text-orange-500'}`}>
                            {report.status}
                         </span>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-2 gap-y-4 mb-5">
                         <div>
                            <p className="text-[11px] text-gray-400 mb-0.5">Project</p>
                            <p className="text-[13px] text-blue-600 font-medium leading-tight">{report.project}</p>
                         </div>
                         <div>
                            <p className="text-[11px] text-gray-400 mb-0.5">Location</p>
                            <p className="text-[13px] text-gray-900 font-medium leading-tight">{report.subject}</p>
                         </div>
                         <div>
                            <p className="text-[11px] text-gray-400 mb-0.5">Date</p>
                            <p className="text-[13px] text-gray-900 font-medium leading-tight">{report.date}</p>
                         </div>
                         <div>
                            <p className="text-[11px] text-gray-400 mb-0.5">Time</p>
                            <p className="text-[13px] text-gray-900 font-medium leading-tight">{report.startTime} – {report.endTime}</p>
                         </div>
                      </div>

                      {/* Foremen Scores */}
                      <div className="mt-auto">
                         <div className="flex justify-between items-center mb-3">
                            <h4 className="text-[12px] font-medium text-gray-400">Foremen Scores</h4>
                            <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                         </div>
                         <div className="space-y-1.5">
                            {mockForemen.slice(0, report.foremenCount).map((fm, i) => (
                               <div key={i} className="flex justify-between items-center bg-gray-50/70 p-2 rounded-lg border border-gray-100/50">
                                  <div className="flex items-center gap-2">
                                     <img src={fm.avatar} className="w-6 h-6 rounded-full object-cover shadow-sm bg-white" alt={fm.name} />
                                     <span className="text-[13px] text-gray-700">{fm.name}</span>
                                  </div>
                                  <span className="text-[13px] font-semibold text-blue-600 pr-1">{fm.score}/12</span>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                 ))
               )}
            </div>
            )}

            {/* Excel Row Form */}
            {inspViewMode === 'excel' && (
            <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-x-auto animate-in fade-in duration-300">
              <table className="w-full border-collapse text-[12px] min-w-[800px]">
                <thead>
                  <tr className="bg-[#3b82f6] text-white">
                    <th className="border border-white/20 px-3 py-2 text-left font-semibold tracking-wide">ID</th>
                    <th className="border border-white/20 px-3 py-2 text-left font-semibold tracking-wide">Date</th>
                    <th className="border border-white/20 px-3 py-2 text-left font-semibold tracking-wide">Time</th>
                    <th className="border border-white/20 px-3 py-2 text-left font-semibold tracking-wide">Inspector</th>
                    <th className="border border-white/20 px-3 py-2 text-left font-semibold tracking-wide">Project</th>
                    <th className="border border-white/20 px-3 py-2 text-left font-semibold tracking-wide">Location (Subject)</th>
                    <th className="border border-white/20 px-3 py-2 text-center font-semibold tracking-wide">Foremen Audited</th>
                    <th className="border border-white/20 px-3 py-2 text-left font-semibold tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInspData.length === 0 ? (
                     <tr>
                        <td colSpan={8} className="border border-gray-300 py-8 text-center text-gray-500">
                           No inspections match your search.
                        </td>
                     </tr>
                  ) : (
                    filteredInspData.map((report) => (
                    <tr key={report.id} onClick={() => navigate(`/report/${report.id}`)} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                      <td className="border border-gray-300 px-3 py-1.5 text-gray-900 font-medium bg-white uppercase text-center w-12 group-hover:bg-blue-50/30 transition-colors">{report.id}</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-gray-800 bg-white whitespace-nowrap group-hover:bg-blue-50/30 transition-colors">{report.date}</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-gray-800 bg-white whitespace-nowrap group-hover:bg-blue-50/30 transition-colors">{report.startTime} - {report.endTime}</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-gray-800 bg-white font-medium group-hover:bg-blue-50/30 transition-colors">{report.inspector}</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-blue-600 bg-white group-hover:bg-blue-50/30 transition-colors">{report.project}</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-gray-900 bg-white truncate max-w-xs group-hover:bg-blue-50/30 transition-colors">{report.subject}</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-gray-900 bg-white text-center font-semibold group-hover:bg-blue-50/30 transition-colors">{report.foremenCount}</td>
                      <td className="border border-gray-300 px-3 py-1.5 bg-white font-semibold group-hover:bg-blue-50/30 transition-colors" style={{ color: report.status === 'Viewed' ? '#3b82f6' : '#f97316' }}>{report.status}</td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
