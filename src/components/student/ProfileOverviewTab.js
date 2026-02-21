import React from 'react';
import { BookOpen, Calendar, Shield, Target, AlertTriangle } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';

const ProfileOverviewTab = ({ student }) => {
  return (
    <div className="tab-content overview-tab">
      {/* Quick Stats Cards */}
      <div className="overview-stats-row">
        <div className="overview-stat-card pace-stat">
          <BookOpen size={20} />
          <div className="stat-content">
            <span className="stat-number">{student.pacePercent}%</span>
            <span className="stat-label">PACE Completion</span>
          </div>
        </div>
        <div className="overview-stat-card attendance-stat">
          <Calendar size={20} />
          <div className="stat-content">
            <span className="stat-number">{student.attendance}%</span>
            <span className="stat-label">Attendance</span>
          </div>
        </div>
        <div className="overview-stat-card risk-stat-card">
          <Shield size={20} />
          <div className="stat-content">
            <RiskBadge level={student.riskLevel} />
            <span className="stat-label">Risk Level</span>
          </div>
        </div>
      </div>

      {/* Student Info Grid */}
      <div className="overview-grid">
        <div className="info-card">
          <h4>Student Information</h4>
          <div className="info-row">
            <span className="info-label">Student ID:</span>
            <span className="info-value">{student.id}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Full Name:</span>
            <span className="info-value">{student.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Section:</span>
            <span className="info-value">{student.section}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Grade Level:</span>
            <span className="info-value">{student.grade || 'N/A'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Status:</span>
            <span className="info-value">
              <span className={`status-inline ${student.status === 'Behind' ? 'behind' : 'on-track'}`}>
                {student.status}
              </span>
            </span>
          </div>
        </div>

        {/* Risk Explanation Card (only if at risk) */}
        {student.riskLevel !== 'Low' && (
          <div className="info-card risk-explanation-card">
            <h4>Risk Explanation</h4>
            <div className="risk-factor-row">
              <Target size={16} className="risk-icon primary" />
              <div className="risk-factor-content">
                <span className="risk-factor-label">Primary Factor</span>
                <span className="risk-factor-value">{student.factor}</span>
              </div>
            </div>
            {student.secondaryRisk && student.secondaryRisk !== 'None' && (
              <div className="risk-factor-row">
                <AlertTriangle size={16} className="risk-icon secondary" />
                <div className="risk-factor-content">
                  <span className="risk-factor-label">Secondary Factor</span>
                  <span className="risk-factor-value">{student.secondaryRisk}</span>
                </div>
              </div>
            )}
            {student.suggestedAction && student.suggestedAction !== 'None' && (
              <div className="suggested-action">
                <span className="action-label">Suggested Action:</span>
                <span className="action-value">{student.suggestedAction}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileOverviewTab;
