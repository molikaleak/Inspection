export const mockProjects = [
  { id: 'p1', name: 'J-Trust Inspection', avgScore: 98.2, status: 'Active', inspectors: ['Mr. Menghour', 'Kimsour'], complianceTrend: [92, 94, 95, 98, 98.2] },
  { id: 'p2', name: 'Riverside Plaza', avgScore: 92.5, status: 'Active', inspectors: ['Mr. Menghour', 'Dara', 'Sokha'], complianceTrend: [88, 89, 91, 92, 92.5] },
  { id: 'p3', name: 'Industrial Park Zone B', avgScore: 89.1, status: 'Review Required', inspectors: ['Mr. Menghour', 'Channary'], complianceTrend: [95, 92, 90, 89.1] },
  { id: 'p4', name: 'Metro Bridge Phase 2', avgScore: 84.6, status: 'Active', inspectors: ['Mr. Menghour', 'Vannak', 'Rithy'], complianceTrend: [80, 82, 85, 84.6] },
];

export const mockInspectorsData: Record<string, { avatar: string, title: string }> = {
  'Mr. Menghour': { avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop', title: 'Inspector' },
  'Kimsour': { avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop', title: 'Inspector' },
  'Dara': { avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', title: 'Inspector' },
  'Channary': { avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop', title: 'Inspector' }
};

export const mockReports = [
  { id: 'r1', date: '12-04-2026', startTime: '4pm', endTime: '9pm', project: 'J-Trust Inspection', subject: 'Sector B Night Audit', inspector: 'Mr. Menghour', status: 'Viewed', score: 98, foremenCount: 5 },
  { id: 'r2', date: '11-04-2026', startTime: '8am', endTime: '5pm', project: 'Riverside Plaza', subject: 'Foundation Safety', inspector: 'Kimsour', status: 'Needs Review', score: 85, foremenCount: 3 },
  { id: 'r3', date: '10-04-2026', startTime: '10am', endTime: '6pm', project: 'Industrial Park Zone B', subject: 'Equipment Logistics', inspector: 'Dara', status: 'Viewed', score: 92, foremenCount: 4 },
  { id: 'r4', date: '09-04-2026', startTime: '9pm', endTime: '3am', project: 'Metro Bridge Phase 2', subject: 'Steel Structure Audit', inspector: 'Channary', status: 'Viewed', score: 95, foremenCount: 6 },
  { id: 'r5', date: '08-04-2026', startTime: '7pm', endTime: '12am', project: 'J-Trust Inspection', subject: 'Structural Integrity Check', inspector: 'Mr. Menghour', status: 'Viewed', score: 89, foremenCount: 4 },
  { id: 'r6', date: '07-04-2026', startTime: '1pm', endTime: '6pm', project: 'Riverside Plaza', subject: 'Electrical Grid Safety', inspector: 'Kimsour', status: 'Needs Review', score: 72, foremenCount: 2 },
  { id: 'r7', date: '06-04-2026', startTime: '11am', endTime: '8pm', project: 'Industrial Park Zone B', subject: 'Material Flow Optimization', inspector: 'Dara', status: 'Viewed', score: 94, foremenCount: 5 },
  { id: 'r8', date: '05-04-2026', startTime: '6am', endTime: '3pm', project: 'Metro Bridge Phase 2', subject: 'Concrete Setting Monitor', inspector: 'Channary', status: 'Viewed', score: 91, foremenCount: 3 },
  { id: 'r9', date: '04-04-2026', startTime: '3pm', endTime: '11pm', project: 'J-Trust Inspection', subject: 'Security Perimeter Audit', inspector: 'Mr. Menghour', status: 'Viewed', score: 96, foremenCount: 5 },
  { id: 'r10', date: '03-04-2026', startTime: '9am', endTime: '6pm', project: 'Riverside Plaza', subject: 'Plumbing System Pressure Test', inspector: 'Kimsour', status: 'Viewed', score: 88, foremenCount: 4 },
  { id: 'r11', date: '02-04-2026', startTime: '8am', endTime: '4pm', project: 'Industrial Park Zone B', subject: 'Heavy Machinery Calibration', inspector: 'Dara', status: 'Needs Review', score: 82, foremenCount: 3 },
  { id: 'r12', date: '01-04-2026', startTime: '10pm', endTime: '5am', project: 'Metro Bridge Phase 2', subject: 'Arch Suspension Inspection', inspector: 'Channary', status: 'Viewed', score: 97, foremenCount: 7 },
  { id: 'r13', date: '31-03-2026', startTime: '5pm', endTime: '10pm', project: 'J-Trust Inspection', subject: 'Roofing Safety Protocols', inspector: 'Mr. Menghour', status: 'Viewed', score: 93, foremenCount: 2 },
  { id: 'r14', date: '30-03-2026', startTime: '7am', endTime: '4pm', project: 'Riverside Plaza', subject: 'Elevator Shaft Integration', inspector: 'Kimsour', status: 'Viewed', score: 90, foremenCount: 3 },
  { id: 'r15', date: '29-03-2026', startTime: '12pm', endTime: '9pm', project: 'Industrial Park Zone B', subject: 'Inventory Logistics Audit', inspector: 'Dara', status: 'Viewed', score: 95, foremenCount: 4 },
  { id: 'r16', date: '28-03-2026', startTime: '8pm', endTime: '4am', project: 'Metro Bridge Phase 2', subject: 'Decking Integrity Evaluation', inspector: 'Channary', status: 'Viewed', score: 86, foremenCount: 5 },
  { id: 'r17', date: '27-03-2026', startTime: '4pm', endTime: '10pm', project: 'J-Trust Inspection', subject: 'HVAC System Performance', inspector: 'Mr. Menghour', status: 'Needs Review', score: 78, foremenCount: 3 },
  { id: 'r18', date: '26-03-2026', startTime: '6am', endTime: '3pm', project: 'Riverside Plaza', subject: 'Landscaping Environmental Safety', inspector: 'Kimsour', status: 'Viewed', score: 92, foremenCount: 2 },
  { id: 'r19', date: '25-03-2026', startTime: '9am', endTime: '5pm', project: 'Industrial Park Zone B', subject: 'Loading Dock Safety Ops', inspector: 'Dara', status: 'Viewed', score: 87, foremenCount: 4 },
  { id: 'r20', date: '24-03-2026', startTime: '11pm', endTime: '6am', project: 'Metro Bridge Phase 2', subject: 'Pillar Reinforcement Review', inspector: 'Channary', status: 'Viewed', score: 94, foremenCount: 6 },
  { id: 'r21', date: '23-03-2026', startTime: '2pm', endTime: '10pm', project: 'J-Trust Inspection', subject: 'Fire Suppression Calibration', inspector: 'Mr. Menghour', status: 'Viewed', score: 99, foremenCount: 5 },
  { id: 'r22', date: '22-03-2026', startTime: '8am', endTime: '4pm', project: 'Riverside Plaza', subject: 'Fencing & Perimeter Security', inspector: 'Kimsour', status: 'Viewed', score: 84, foremenCount: 3 },
  { id: 'r23', date: '21-03-2026', startTime: '10am', endTime: '6pm', project: 'Industrial Park Zone B', subject: 'Waste Management Protocol', inspector: 'Dara', status: 'Needs Review', score: 75, foremenCount: 4 },
  { id: 'r24', date: '20-03-2026', startTime: '9pm', endTime: '4am', project: 'Metro Bridge Phase 2', subject: 'Support Cable Tension Test', inspector: 'Channary', status: 'Viewed', score: 93, foremenCount: 5 },
  { id: 'r25', date: '19-03-2026', startTime: '3pm', endTime: '9pm', project: 'J-Trust Inspection', subject: 'Interior Lighting Wattage Audit', inspector: 'Mr. Menghour', status: 'Viewed', score: 91, foremenCount: 2 },
  { id: 'r26', date: '18-03-2026', startTime: '7am', endTime: '3pm', project: 'Riverside Plaza', subject: 'Glass Panel Stress Impact', inspector: 'Kimsour', status: 'Viewed', score: 89, foremenCount: 4 },
  { id: 'r27', date: '17-03-2026', startTime: '12pm', endTime: '8pm', project: 'Industrial Park Zone B', subject: 'Hazardous Materials Storage', inspector: 'Dara', status: 'Viewed', score: 96, foremenCount: 3 },
  { id: 'r28', date: '16-03-2026', startTime: '10pm', endTime: '5am', project: 'Metro Bridge Phase 2', subject: 'Bitumen Layer Smoothing', inspector: 'Channary', status: 'Viewed', score: 88, foremenCount: 5 },
  { id: 'r29', date: '15-03-2026', startTime: '4pm', endTime: '11pm', project: 'J-Trust Inspection', subject: 'Telecom Rack Cooling Test', inspector: 'Mr. Menghour', status: 'Viewed', score: 94, foremenCount: 4 },
  { id: 'r30', date: '14-03-2026', startTime: '6am', endTime: '2pm', project: 'Riverside Plaza', subject: 'Basement Waterproofing Review', inspector: 'Kimsour', status: 'Needs Review', score: 81, foremenCount: 3 },
  { id: 'r31', date: '13-03-2026', startTime: '9am', endTime: '5pm', project: 'Industrial Park Zone B', subject: 'Forklift Operator Precision', inspector: 'Dara', status: 'Viewed', score: 92, foremenCount: 6 },
  { id: 'r32', date: '12-03-2026', startTime: '8pm', endTime: '3am', project: 'Metro Bridge Phase 2', subject: 'Expansion Joint Flexibility', inspector: 'Channary', status: 'Viewed', score: 95, foremenCount: 4 },
  { id: 'r33', date: '11-03-2026', startTime: '2pm', endTime: '8pm', project: 'J-Trust Inspection', subject: 'Solar Panel Array Cleanliness', inspector: 'Mr. Menghour', status: 'Viewed', score: 97, foremenCount: 2 },
  { id: 'r34', date: '10-03-2026', startTime: '7am', endTime: '4pm', project: 'Riverside Plaza', subject: 'Parking Lot Stripe Visibility', inspector: 'Kimsour', status: 'Viewed', score: 90, foremenCount: 3 },
];

export const mockForemen = [
  { 
    id: 'f1', 
    name: 'Mong Kol', 
    idNumber: '099883322', 
    service: 'Construction',
    workLocation: 'J-Trust Zone B',
    date: '01-02-2026',
    timeFrom: '8am',
    timeTo: '5pm',
    manpower: 10,
    duration: '8 hours',
    score: 12, 
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    findings: [
      'Perfect PPE compliance observed during morning briefing',
      'Materials stored correctly after active hours',
      'Team remained focused and calm during minor equipment delay'
    ],
    photos: [
      'https://acropolis-wp-content-uploads.s3.us-west-1.amazonaws.com/What-is-construction-foreman-Hero-image.webp',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&h=500&fit=crop'
    ]
  },
  { 
    id: 'f2', 
    name: 'Chai Wat', 
    idNumber: '099883323',
    service: 'Logistics',
    workLocation: 'J-Trust Zone A',
    date: '01-02-2026',
    timeFrom: '8am',
    timeTo: '5pm',
    manpower: 8,
    duration: '8 hours',
    score: 11, 
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    findings: [
      'Site cleanliness maintained at high standards',
      'Safety briefing documented with full attendance'
    ],
    photos: [
      'https://vietnamlabor.wordpress.com/wp-content/uploads/2015/11/construction_foreman.jpg?w=863&h=0&crop=1',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&h=500&fit=crop'
    ]
  },
  { 
    id: 'f3', 
    name: 'Sokha', 
    idNumber: '099883324',
    service: 'Electrical',
    workLocation: 'J-Trust Zone C',
    date: '01-02-2026',
    timeFrom: '8am',
    timeTo: '5pm',
    manpower: 5,
    duration: '8 hours',
    score: 12, 
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    findings: [
      'Electrical cables safely secured off pathways',
      'Lockout/tagout procedures strictly followed'
    ],
    photos: [
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&h=500&fit=crop',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3O622HHjxQQbdYJ7gg8ukipvpLOURFZ5ncg&s',
      'https://1300hired.com.au/wp-content/uploads/2014/12/construction-1.jpg',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&h=500&fit=crop'
    ]
  },
  { 
    id: 'f4', 
    name: 'Rithy', 
    idNumber: '099883325',
    service: 'Plumbing',
    workLocation: 'J-Trust Zone B',
    date: '01-02-2026',
    timeFrom: '8am',
    timeTo: '5pm',
    manpower: 6,
    duration: '8 hours',
    score: 10, 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    findings: [
      'Adequate lighting properly set up for detailed work',
      'Water tested and contained per safety guidelines'
    ],
    photos: [
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&h=500&fit=crop',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlCvGZubMCMueOsTAIJKoKI2pndibEZCZBuA&s'
    ]
  },
  { 
    id: 'f5', 
    name: 'Vannak', 
    idNumber: '099883326',
    service: 'Heavy Equipment',
    workLocation: 'J-Trust Zone A',
    date: '01-02-2026',
    timeFrom: '8am',
    timeTo: '5pm',
    manpower: 12,
    duration: '8 hours',
    score: 11, 
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    findings: [
      'Trucks equipped with functioning lights and beepers',
      'Operator fatigue checks completed hourly'
    ],
    photos: [
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&h=500&fit=crop',
      'https://thebirmgroup.com/wp-content/uploads/2018/10/Blog-129-General-Foreman-Salaries.jpg'
    ]
  }
];

export const mockChecklist = [
  { 
    section: 'Section 1: Team Supervision & Work Execution', 
    items: [
      { id: '1.1', desc: 'Is the worker list complete for OT?', status: 'Yes' },
      { id: '1.2', desc: 'Did the Foreman check for sleepy and tired workers?', status: 'Yes' },
      { id: '1.3', desc: 'Is the team taking breaks on time?', status: 'Yes' },
      { id: '1.4', desc: 'Does everyone know their specific task?', status: 'Yes' },
      { id: '1.5', desc: 'Are people working alone being monitored?', status: 'Yes' },
      { id: '1.6', desc: 'Did the Foreman explain goals and risks?', status: 'Yes' },
      { id: '1.7', desc: 'Is the Foreman keeping the team calm?', status: 'Yes' },
      { id: '1.8', desc: 'Are the correct tools being used?', status: 'Yes' },
      { id: '1.9', desc: 'Are workers off their personal phones?', status: 'Yes' },
      { id: '1.10', desc: 'Was Materials/Tools maintained during and after working time?', status: 'Yes' },
    ] 
  },
  { 
    section: 'Section 2: Safety Execution', 
    items: [
      { id: '2.1', desc: 'Is the area bright enough?', status: 'Yes' },
      { id: '2.2', desc: 'Is everyone wearing proper PPE?', status: 'Yes' },
      { id: '2.3', desc: 'Are walkie-talkies on and working?', status: 'Yes' },
      { id: '2.4', desc: 'Are walking paths free of trip hazards?', status: 'Yes' },
      { id: '2.5', desc: 'Do trucks have lights and beepers?', status: 'Yes' },
      { id: '2.6', desc: 'Is the medical kit easy to find?', status: 'Yes' },
      { id: '2.7', desc: 'Are risky areas taped off with safety tape?', status: 'Yes' },
    ]
  }
];
