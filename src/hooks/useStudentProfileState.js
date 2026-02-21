import { useState } from 'react';
import { studentsData } from '../data/mockData';

const TABS = [
  { id: 'overview', label: 'Overview', iconName: 'User' },
  { id: 'pace', label: 'PACE Progress', iconName: 'BookOpen' },
  { id: 'attendance', label: 'Attendance', iconName: 'Calendar' },
  { id: 'risk', label: 'Risk Details', iconName: 'AlertTriangle' },
];

export default function useStudentProfileState(studentId) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [studentData, setStudentData] = useState(() => studentsData.find(s => s.id === studentId));

  const student = studentData;

  const handleSaveEdit = (formData) => {
    const updated = { ...student, ...formData };
    const idx = studentsData.findIndex(s => s.id === student.id);
    if (idx !== -1) {
      studentsData[idx] = updated;
    }
    setStudentData(updated);
    setShowEditModal(false);
  };

  const handlePrint = () => {
    if (!student) return;
    const subjectsRows = (student.subjects || []).map(s =>
      `<tr>
        <td>${s.name}</td>
        <td>${s.completed}/${s.totalPaces}</td>
        <td>${s.avgTestScore}%</td>
      </tr>`
    ).join('');

    const win = window.open('', '_blank');
    win.document.write(`
      <html>
        <head>
          <title>Student Profile — ${student.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 2rem; color: #1F2937; }
            h1 { font-size: 1.25rem; margin-bottom: 0.25rem; }
            .meta { color: #6B7280; font-size: 0.85rem; margin-bottom: 1.5rem; }
            .stats { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
            .stat { flex: 1; border: 1px solid #E5E7EB; border-radius: 0.5rem; padding: 1rem; text-align: center; }
            .stat-val { font-size: 1.5rem; font-weight: bold; margin: 0; }
            .stat-lbl { font-size: 0.8rem; color: #6B7280; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
            .info-card { border: 1px solid #E5E7EB; border-radius: 0.5rem; padding: 1rem; }
            .info-card h4 { margin: 0 0 0.75rem 0; font-size: 0.95rem; }
            .info-row { display: flex; justify-content: space-between; padding: 0.35rem 0; font-size: 0.85rem; border-bottom: 1px solid #F3F4F6; }
            .info-row:last-child { border-bottom: none; }
            .lbl { color: #6B7280; }
            table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
            th, td { border: 1px solid #E5E7EB; padding: 0.5rem; text-align: left; }
            th { background: #F9FAFB; font-weight: 600; }
            .risk-badge { display: inline-block; padding: 2px 10px; border-radius: 1rem; font-size: 0.8rem; font-weight: 600; }
            .risk-high { background: #FEE2E2; color: #DC2626; }
            .risk-medium { background: #FEF3C7; color: #D97706; }
            .risk-low { background: #D1FAE5; color: #059669; }
            @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
          </style>
        </head>
        <body>
          <h1>${student.name}</h1>
          <p class="meta">${student.section} &bull; ${student.grade || 'N/A'} &bull; ID: ${student.id} &bull; Printed: ${new Date().toLocaleDateString()}</p>

          <div class="stats">
            <div class="stat"><p class="stat-val">${student.pacePercent}%</p><p class="stat-lbl">PACE Completion</p></div>
            <div class="stat"><p class="stat-val">${student.attendance}%</p><p class="stat-lbl">Attendance</p></div>
            <div class="stat"><p class="stat-val"><span class="risk-badge risk-${student.riskLevel.toLowerCase()}">${student.riskLevel}</span></p><p class="stat-lbl">Risk Level</p></div>
          </div>

          <div class="info-grid">
            <div class="info-card">
              <h4>Student Information</h4>
              <div class="info-row"><span class="lbl">Status</span><span>${student.status}</span></div>
              <div class="info-row"><span class="lbl">Primary Factor</span><span>${student.factor || 'N/A'}</span></div>
              ${student.secondaryRisk && student.secondaryRisk !== 'None' ? `<div class="info-row"><span class="lbl">Secondary Factor</span><span>${student.secondaryRisk}</span></div>` : ''}
              ${student.suggestedAction && student.suggestedAction !== 'None' ? `<div class="info-row"><span class="lbl">Suggested Action</span><span>${student.suggestedAction}</span></div>` : ''}
            </div>
            ${student.attendanceSummary ? `
            <div class="info-card">
              <h4>Attendance Summary</h4>
              <div class="info-row"><span class="lbl">Present</span><span>${student.attendanceSummary.present} days</span></div>
              <div class="info-row"><span class="lbl">Absent</span><span>${student.attendanceSummary.absent} days</span></div>
              <div class="info-row"><span class="lbl">Late</span><span>${student.attendanceSummary.late} days</span></div>
              <div class="info-row"><span class="lbl">Excused</span><span>${student.attendanceSummary.excused} days</span></div>
            </div>` : ''}
          </div>

          ${subjectsRows ? `
          <h4 style="margin-bottom:0.5rem;">PACE Subjects</h4>
          <table>
            <thead><tr><th>Subject</th><th>Completed / Total</th><th>Avg Score</th></tr></thead>
            <tbody>${subjectsRows}</tbody>
          </table>` : ''}
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  return {
    TABS,
    activeTab,
    setActiveTab,
    showEditModal,
    setShowEditModal,
    student,
    handleSaveEdit,
    handlePrint,
  };
}
