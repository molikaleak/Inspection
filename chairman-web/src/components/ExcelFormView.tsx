export default function ExcelFormView({ report, foreman, checklist, inspectorImage }: { report: any, foreman: any, checklist: any, inspectorImage?: string }) {
  const getItemTitle = (id: string) => {
    const titles: Record<string, string> = {
      '1.1': 'OT List', '1.2': 'Fatigue Check', '1.3': 'Rest Breaks', '1.4': 'Skills Check',
      '1.5': 'Solo Workers', '1.6': 'Night Briefing', '1.7': 'Team Focus', '1.8': 'Tool Check',
      '1.9': 'Phone Rule', '1.10': 'Maintain/Care', '2.1': 'Work Lighting', '2.2': 'PPE',
      '2.3': 'Radios Active', '2.4': 'Clear Paths', '2.5': 'Vehicle Safety', '2.6': 'First Aid',
      '2.7': 'Danger Zones', '2.8': 'Permits', '2.9': 'Emergency Exit', '2.10': 'Shadow Check',
      '2.11': 'Noise Control', '2.12': 'Site Speed', '2.13': 'Clean Area', '2.14': 'Working at Height',
      '2.15': 'Hot Work', '2.16': 'Confined Space',
    };
    return titles[id] || 'Inspection Item';
  };

  const totalYes = checklist.reduce((acc: number, sec: any) => acc + sec.items.filter((i: any) => i.status === 'Yes').length, 0);

  return (
    <div className="bg-white text-black p-3 sm:p-10 max-w-[850px] mx-auto text-[10px] sm:text-[13px] border border-black/20 font-sans shadow-sm rounded-sm leading-tight">
      <div className="flex justify-between items-start mb-4 sm:mb-8">
        <div className="w-full max-w-md">
          <div className="flex gap-2 mb-2 items-end"><span className="font-semibold w-24 whitespace-nowrap">Project :</span> <span className="border-b border-black flex-1 inline-block pb-0.5">{report.project}</span></div>
          <div className="flex gap-2 items-end"><span className="font-semibold w-24 whitespace-nowrap">Report Date :</span> <span className="border-b border-black flex-1 inline-block pb-0.5">{report.date}</span></div>
        </div>
        <div className="w-16 h-16 border-[3px] border-black rounded-full overflow-hidden flex items-center justify-center -mt-2">
           <img src={foreman.avatar} alt="Foreman" className="w-full h-full object-cover" />
        </div>
      </div>

      <h2 className="font-bold underline mb-1.5 sm:mb-3 italic">OT Information:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 sm:gap-y-3 mb-4 sm:mb-10">
        <div className="flex gap-2 items-end"><span className="font-semibold whitespace-nowrap">Foreman Name :</span> <span className="border-b border-black flex-1 pb-0.5">{foreman.name}</span></div>
        <div className="flex gap-2 items-end"><span className="font-semibold whitespace-nowrap">ID Number :</span> <span className="border-b border-black flex-1 pb-0.5">{foreman.idNumber}</span></div>
        <div className="flex gap-2 items-end"><span className="font-semibold whitespace-nowrap">Services :</span> <span className="border-b border-black flex-1 pb-0.5">{foreman.service}</span></div>
        <div className="flex gap-2 items-end"><span className="font-semibold whitespace-nowrap">Work Location :</span> <span className="border-b border-black flex-1 pb-0.5">{foreman.workLocation}</span></div>
        <div className="flex gap-2 items-end"><span className="font-semibold whitespace-nowrap">Date :</span> <span className="border-b border-black flex-1 pb-0.5">{foreman.date}</span></div>
        <div className="flex gap-2 items-end"><span className="font-semibold whitespace-nowrap">Time :</span> <div className="flex-1 flex gap-2 items-end">From <span className="border-b border-black max-w-[80px] w-full pb-0.5">{foreman.timeFrom}</span> To <span className="border-b border-black max-w-[80px] w-full pb-0.5">{foreman.timeTo}</span></div></div>
        <div className="flex gap-2 items-end"><span className="font-semibold whitespace-nowrap">Total Manpower :</span> <span className="border-b border-black flex-1 pb-0.5">{foreman.manpower}</span></div>
        <div className="flex gap-2 items-end"><span className="font-semibold whitespace-nowrap">Duration :</span> <span className="border-b border-black flex-1 pb-0.5">{foreman.duration}</span></div>
      </div>

      <h2 className="font-bold text-center text-[12px] sm:text-lg mb-3 sm:mb-6 leading-tight">Night Work & Overtime Inspection Check List</h2>

      {checklist.map((section: any, idx: number) => (
        <div key={idx} className="mb-4 sm:mb-8">
          <div className="font-bold mb-0.5 sm:mb-1">{section.section}</div>
          <table className="w-full border-collapse border border-black text-[9px] sm:text-[12px]">
            <thead>
              <tr className="bg-white">
                <th className="border border-black px-1 py-0.5 sm:py-1.5 text-center w-8 sm:w-10">No.</th>
                <th className="border border-black px-1 sm:px-2 py-0.5 sm:py-1.5 text-left w-24 sm:w-32">Items</th>
                <th className="border border-black px-1 sm:px-2 py-0.5 sm:py-1.5 text-left">Description</th>
                <th className="border border-black px-0.5 sm:px-1 py-0.5 sm:py-1.5 text-center w-8 sm:w-12">[Yes]</th>
                <th className="border border-black px-0.5 sm:px-1 py-0.5 sm:py-1.5 text-center w-8 sm:w-12">[No]</th>
                <th className="border border-black px-0.5 sm:px-1 py-0.5 sm:py-1.5 text-center w-8 sm:w-12">[n/a]</th>
              </tr>
            </thead>
            <tbody>
              {section.items.map((item: any) => {
                 const itemTitle = getItemTitle(item.id);
                 return (
                  <tr key={item.id}>
                    <td className="border border-black px-1 py-0.5 sm:py-1.5 text-center">{item.id}</td>
                    <td className="border border-black px-1 sm:px-2 py-0.5 sm:py-1.5">{itemTitle}</td>
                    <td className="border border-black px-1 sm:px-2 py-0.5 sm:py-1.5 leading-tight">{item.desc}</td>
                    <td className="border border-black px-0.5 sm:px-1 py-0.5 sm:py-1.5 text-center relative">
                      <span className="text-black/60">[ ]</span>
                      {item.status === 'Yes' && <span className="absolute inset-0 flex items-center justify-center font-bold text-lg sm:text-2xl pointer-events-none" style={{ transform: 'rotate(-5deg) translateY(-2px)'}}>✓</span>}
                    </td>
                    <td className="border border-black px-0.5 sm:px-1 py-0.5 sm:py-1.5 text-center relative">
                      <span className="text-black/60">[ ]</span>
                      {item.status === 'No' && <span className="absolute inset-0 flex items-center justify-center font-bold text-lg sm:text-2xl pointer-events-none" style={{ transform: 'rotate(-5deg) translateY(-2px)'}}>✓</span>}
                    </td>
                    <td className="border border-black px-0.5 sm:px-1 py-0.5 sm:py-1.5 text-center relative">
                      <span className="text-black/60">[ ]</span>
                      {(item.status === 'n/a' || !['Yes','No'].includes(item.status)) && <span className="absolute inset-0 flex items-center justify-center font-bold text-lg sm:text-2xl pointer-events-none" style={{ transform: 'rotate(-5deg) translateY(-2px)'}}>✓</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}

      <div className="flex gap-3 mb-4 sm:mb-8">
        <span className="font-bold">Total "Yes" Marks:</span>
        <span className="w-24 text-center">{totalYes} / 26</span>
      </div>

      <div className="mb-6 sm:mb-16 flex gap-4">
        <span className="font-bold pt-1">Notes:</span>
        <div className="flex-1 mt-4 sm:mt-6 border-b border-black"></div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end pb-4 sm:pb-8 gap-6 md:gap-0">
        <div className="flex flex-col gap-2 w-full max-w-[250px]">
           <span className="font-bold">Foreman Signature:</span>
           <div className="border-b border-black mt-8 h-8 relative">
              <span className="absolute bottom-2 left-6 text-xl italic font-serif text-black/60">{foreman.name.substring(0,2)}</span>
           </div>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-[250px]">
           <span className="font-bold">Inspector Signature:</span>
           <div className="border-b border-black mt-8 h-8 relative">
               <span className="absolute bottom-1 right-8 text-2xl font-bold font-serif text-black/80 rotate-[-10deg]">N</span>
           </div>
        </div>
      </div>
    </div>
  );
}
