// ============================================================
// studentUtils.js — Centralized Computation & Automation
// ============================================================
// All formulas live here so that Add / Edit / Dashboard updates
// always go through the same logic.  Import what you need:
//
//   import { computeStudent, computeDashboardStats, ... } from '../common/studentUtils';
// ============================================================

// ──────────────────────────────────────────
// 🎯 1. PACE Completion % (per-subject & overall)
// ──────────────────────────────────────────

/**
 * Calculate PACE completion percentage from completed / total.
 * @param {number} completed  - PACEs completed
 * @param {number} total      - PACEs required
 * @returns {number} 0-100, one decimal place
 */
export function calculatePaceCompletion(completed, total) {
  if (!total || total <= 0) return 0;
  return parseFloat(((completed / total) * 100).toFixed(1));
}

/**
 * Overall PACE % across all subjects.
 * @param {Array} subjects - [{ completed, total, ... }]
 * @returns {number}
 */
export function calculateOverallPace(subjects) {
  if (!subjects || subjects.length === 0) return 0;
  const totalCompleted = subjects.reduce((sum, s) => sum + (Number(s.completed) || 0), 0);
  const totalRequired  = subjects.reduce((sum, s) => sum + (Number(s.total) || 0), 0);
  return calculatePaceCompletion(totalCompleted, totalRequired);
}

// ──────────────────────────────────────────
// 🎯 2. Subject Status (Behind / On Track)
// ──────────────────────────────────────────

/**
 * Determine a single subject's status based on its completion %.
 * ON TRACK  >= 80 %
 * BEHIND    < 80 %
 */
export function getSubjectStatus(completed, total) {
  const pct = calculatePaceCompletion(completed, total);
  return pct >= 80 ? 'On Track' : 'Behind';
}

// ──────────────────────────────────────────
// 🎯 3. PACE Status (student-level)
// ──────────────────────────────────────────

/**
 * ON TRACK  >= 80 %
 * BEHIND    60 – 79 %
 * CRITICAL  < 60 %
 */
export function getPaceStatus(paceCompletion) {
  if (paceCompletion >= 80) return 'On Track';
  if (paceCompletion >= 60) return 'Behind';
  return 'Behind'; // 'Critical' bucket also shows as Behind in the UI
}

// ──────────────────────────────────────────
// 🎯 4. Attendance Rate from day counts
// ──────────────────────────────────────────

/**
 * @param {{ present: number, late: number, absent: number }} summary
 * @returns {number} 0-100, one decimal
 */
export function calculateAttendanceRate(summary) {
  if (!summary) return 0;
  const present = Number(summary.present) || 0;
  const late    = Number(summary.late)    || 0;
  const absent  = Number(summary.absent)  || 0;
  const total   = present + late + absent;
  if (total === 0) return 0;
  // "Present" and "Late" both count as attended
  return parseFloat((((present + late) / total) * 100).toFixed(1));
}

// ──────────────────────────────────────────
// 🎯 5. Risk Level Detection (rule-based)
// ──────────────────────────────────────────

/**
 * Determine risk level from PACE completion and attendance.
 *   HIGH    — paceCompletion < 60  OR  attendance < 75
 *   MEDIUM  — paceCompletion < 75  OR  pendingPaces >= 4
 *   LOW     — everything else
 *
 * @param {number} paceCompletion  - 0-100
 * @param {number} attendance      - 0-100
 * @param {number} [pendingPaces]  - optional count of unfinished PACEs
 * @returns {'High'|'Medium'|'Low'}
 */
export function calculateRiskLevel(paceCompletion, attendance, pendingPaces = 0) {
  if (paceCompletion < 60 || attendance < 75) return 'High';
  if (paceCompletion < 75 || pendingPaces >= 4) return 'Medium';
  return 'Low';
}

// ──────────────────────────────────────────
// 🎯 6. Risk Factor + Suggested Action text
// ──────────────────────────────────────────

export function generateRiskFactors(paceCompletion, attendance, pendingPaces = 0) {
  const factors = [];

  if (paceCompletion < 60) {
    factors.push({ factor: 'PACE Completion', severity: 'High', detail: `Only ${paceCompletion}% completion — severely behind schedule.` });
  } else if (paceCompletion < 75) {
    factors.push({ factor: 'PACE Completion', severity: 'Medium', detail: `At ${paceCompletion}% completion — approaching the 75% threshold.` });
  }

  if (attendance < 75) {
    factors.push({ factor: 'Attendance', severity: 'High', detail: `Only ${attendance}% attendance — well below the 80% minimum.` });
  } else if (attendance < 85) {
    factors.push({ factor: 'Attendance', severity: 'Medium', detail: `At ${attendance}% attendance — borderline minimum.` });
  }

  if (pendingPaces >= 4) {
    factors.push({ factor: 'Pending PACEs', severity: 'Medium', detail: `${pendingPaces} PACEs still pending completion.` });
  }

  return factors;
}

export function generatePrimaryFactor(riskLevel, paceCompletion, attendance) {
  if (riskLevel === 'Low') return 'None';
  const issues = [];
  if (paceCompletion < 75) issues.push('Low PACE completion');
  if (attendance < 85) issues.push(attendance < 75 ? 'Frequent absences' : 'Borderline attendance');
  return issues.join(' + ') || 'Pending PACE modules';
}

export function generateSuggestedAction(riskLevel) {
  if (riskLevel === 'High') return 'Schedule intervention session';
  if (riskLevel === 'Medium') return 'Monitor progress next week';
  return 'None';
}

// ──────────────────────────────────────────
// 🎯 7. Compute Full Student (single entry)
// ──────────────────────────────────────────

/**
 * Takes raw form/edit data and returns a fully-computed student object.
 * Call this on every Add or Edit so fields stay consistent.
 *
 * @param {object} raw - student data (may have partial fields)
 * @returns {object} enriched student object
 */
export function computeStudent(raw) {
  // --- subjects: auto-set each subject's status ---------------
  const subjects = (raw.subjects || []).map(s => ({
    ...s,
    completed: Number(s.completed) || 0,
    total: Number(s.total) || 0,
    testScore: Number(s.testScore) || 0,
    status: getSubjectStatus(Number(s.completed) || 0, Number(s.total) || 0),
  }));

  // --- PACE % from subjects -----------------------------------
  const pacePercent = calculateOverallPace(subjects);

  // --- Attendance from summary --------------------------------
  const attendanceSummary = {
    present: Number(raw.attendanceSummary?.present) || 0,
    late:    Number(raw.attendanceSummary?.late)    || 0,
    absent:  Number(raw.attendanceSummary?.absent)  || 0,
  };
  const attendance = calculateAttendanceRate(attendanceSummary);

  // --- Pending PACEs ------------------------------------------
  const pendingPaces = subjects.reduce((sum, s) => sum + ((Number(s.total) || 0) - (Number(s.completed) || 0)), 0);

  // --- Status, Risk, Factors ----------------------------------
  const status    = getPaceStatus(pacePercent);
  const riskLevel = calculateRiskLevel(pacePercent, attendance, pendingPaces);
  const factor    = generatePrimaryFactor(riskLevel, pacePercent, attendance);
  const secondaryRisk   = riskLevel !== 'Low' && pendingPaces >= 2 ? 'Pending PACE modules' : 'None';
  const suggestedAction = generateSuggestedAction(riskLevel);
  const riskDetails     = generateRiskFactors(pacePercent, attendance, pendingPaces);

  return {
    ...raw,
    subjects,
    pacePercent,
    attendance,
    attendanceSummary,
    status,
    riskLevel,
    factor,
    secondaryRisk,
    suggestedAction,
    riskDetails,
  };
}

// ──────────────────────────────────────────
// 🎯 8. Dashboard / KPI Card Helpers
// ──────────────────────────────────────────

/**
 * Compute live KPI stats from the students array.
 * Replaces the hardcoded sectionStatsData when you want real-time values.
 *
 * @param {Array}  students       - full students array
 * @param {string} [section='All'] - filter by section or 'All'
 * @returns {{ total, avgPaceCompletion, behindPace, atRisk, attendance }}
 */
export function computeDashboardStats(students, section = 'All') {
  const filtered = section === 'All'
    ? students
    : students.filter(s => s.section === section);

  if (filtered.length === 0) {
    return { total: 0, avgPaceCompletion: 0, behindPace: 0, atRisk: 0, attendance: 0 };
  }

  const total = filtered.length;

  const avgPaceCompletion = parseFloat(
    (filtered.reduce((sum, s) => sum + (Number(s.pacePercent) || 0), 0) / total).toFixed(1)
  );

  const behindPace = filtered.filter(s => (Number(s.pacePercent) || 0) < 80).length;

  const atRisk = filtered.filter(s => s.riskLevel === 'High' || s.riskLevel === 'Medium').length;

  const attendance = parseFloat(
    (filtered.reduce((sum, s) => sum + (Number(s.attendance) || 0), 0) / total).toFixed(1)
  );

  return { total, avgPaceCompletion, behindPace, atRisk, attendance };
}

/**
 * Section average PACE completion (for charts).
 * @param {string} sectionName
 * @param {Array}  students
 * @returns {number}
 */
export function getSectionAverage(sectionName, students) {
  const sect = students.filter(s => s.section === sectionName);
  if (sect.length === 0) return 0;
  return parseFloat(
    (sect.reduce((sum, s) => sum + (Number(s.pacePercent) || 0), 0) / sect.length).toFixed(1)
  );
}

/**
 * Compute attendance breakdown percentages across students.
 * Returns values suitable for the donut chart.
 * @param {Array} students
 * @returns {Array<{name, value, color}>}
 */
export function computeAttendanceBreakdown(students) {
  if (!students || students.length === 0) {
    return [
      { name: 'Present', value: 0, color: '#10B981' },
      { name: 'Late',    value: 0, color: '#F59E0B' },
      { name: 'Absent',  value: 0, color: '#EF4444' },
    ];
  }

  let totalPresent = 0, totalLate = 0, totalAbsent = 0;
  students.forEach(s => {
    if (s.attendanceSummary) {
      totalPresent += Number(s.attendanceSummary.present) || 0;
      totalLate    += Number(s.attendanceSummary.late)    || 0;
      totalAbsent  += Number(s.attendanceSummary.absent)  || 0;
    }
  });

  const grand = totalPresent + totalLate + totalAbsent;
  if (grand === 0) {
    return [
      { name: 'Present', value: 0, color: '#10B981' },
      { name: 'Late',    value: 0, color: '#F59E0B' },
      { name: 'Absent',  value: 0, color: '#EF4444' },
    ];
  }

  return [
    { name: 'Present', value: parseFloat(((totalPresent / grand) * 100).toFixed(1)), color: '#10B981' },
    { name: 'Late',    value: parseFloat(((totalLate    / grand) * 100).toFixed(1)), color: '#F59E0B' },
    { name: 'Absent',  value: parseFloat(((totalAbsent  / grand) * 100).toFixed(1)), color: '#EF4444' },
  ];
}
