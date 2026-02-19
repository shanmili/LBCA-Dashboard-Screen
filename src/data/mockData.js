import React from 'react';

// Academic Performance Data (for Line Chart)
export const performanceData = [
  { name: 'Q1', SectionA: 82, SectionB: 78, SectionC: 80 },
  { name: 'Q2', SectionA: 84, SectionB: 79, SectionC: 82 },
  { name: 'Q3', SectionA: 86, SectionB: 81, SectionC: 81 },
  { name: 'Q4', SectionA: 88, SectionB: 83, SectionC: 84 },
];

// Section Statistics (for KPI Cards)
export const sectionStatsData = {
  'All': { total: 452, attendance: 92.3, atRisk: 18 },
  'Section A': { total: 45, attendance: 96.5, atRisk: 2 },
  'Section B': { total: 42, attendance: 88.2, atRisk: 8 },
  'Section C': { total: 48, attendance: 91.0, atRisk: 4 },
};

// Attendance Data (for Donut Chart)
export const attendanceData = [
  { name: 'Present', value: 85, color: '#10B981' },
  { name: 'Late', value: 10, color: '#F59E0B' },    
  { name: 'Absent', value: 5, color: '#EF4444' },   
];

// At-Risk Students List (for Table)
export const atRiskStudents = [
  { id: 'S001', name: "Alvarez, Mateo", section: "Section A", riskLevel: "High", factor: "Consecutive Absences", grade: 74, attendance: "68%" },
  { id: 'S002', name: "Cruz, Sophia", section: "Section B", riskLevel: "Medium", factor: "Declining Math Scores", grade: 78, attendance: "88%" },
  { id: 'S003', name: "Santos, Gabriel", section: "Section B", riskLevel: "Medium", factor: "Incomplete Assignments", grade: 79, attendance: "92%" },
  { id: 'S004', name: "Reyes, Isabella", section: "Section C", riskLevel: "High", factor: "Failing Science & English", grade: 72, attendance: "75%" },
  { id: 'S005', name: "Bautista, Liam", section: "Section A", riskLevel: "Low", factor: "Slight Grade Drop", grade: 81, attendance: "95%" },
  { id: 'S006', name: "Mendoza, Karl", section: "Section B", riskLevel: "High", factor: "Behavioral Issues", grade: 70, attendance: "80%" },
];

// Recent Activity Feed (for Right Sidebar)
export const activityFeed = [
  { id: 1, type: 'alert', text: "New At-Risk alert for Mateo Alvarez", time: "10 mins ago" },
  { id: 2, type: 'grade', text: "Q3 Math grades uploaded by Mr. Torres", time: "1 hour ago" },
  { id: 3, type: 'attendance', text: "Attendance finalized for Section A", time: "2 hours ago" },
  { id: 4, type: 'system', text: "System maintenance scheduled for 10 PM", time: "5 hours ago" },
];

//Students Data (for Students Page)
export const studentsData = [
  { id: 1001, name: "de Gala, Shanmae Leigh P.", section: "Section A" },
  { id: 1002, name: "Maco, Sef Rowinston M.", section: "Section B" },
  { id: 1003, name: "Evasco, Keybird N.", section: "Section B" },
  { id: 1004, name: "Alion, Norhaifah", section: "Section C" },
];


