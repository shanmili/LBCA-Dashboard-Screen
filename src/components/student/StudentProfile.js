import React from 'react';
import { ArrowLeft, User, BookOpen, Calendar, AlertTriangle, Printer, Pencil } from 'lucide-react';
import useStudentProfileState from '../../hooks/useStudentProfileState';
import RiskBadge from '../common/RiskBadge';
import StudentFormModal from '../common/StudentFormModal';
import ProfileOverviewTab from './ProfileOverviewTab';
import ProfilePaceTab from './ProfilePaceTab';
import ProfileAttendanceTab from './ProfileAttendanceTab';
import ProfileRiskTab from './ProfileRiskTab';
import '../../styles/StudentProfile.css';

const TAB_ICONS = { overview: User, pace: BookOpen, attendance: Calendar, risk: AlertTriangle };

const StudentProfile = ({ studentId, onNavigate }) => {
  const {
    TABS,
    activeTab, setActiveTab,
    showEditModal, setShowEditModal,
    student,
    handleSaveEdit,
    handlePrint,
  } = useStudentProfileState(studentId);

  if (!student) {
    return (
      <div className="student-profile">
        <header className="profile-header">
          <button className="back-button" onClick={() => onNavigate('students')}>
            <ArrowLeft size={20} />
            <span>Back to Students</span>
          </button>
        </header>
        <div className="profile-card">
          <div className="no-data-message">Student not found.</div>
        </div>
      </div>
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':    return <ProfileOverviewTab student={student} />;
      case 'pace':        return <ProfilePaceTab student={student} />;
      case 'attendance':  return <ProfileAttendanceTab student={student} />;
      case 'risk':        return <ProfileRiskTab student={student} />;
      default:            return null;
    }
  };

  return (
    <div className="student-profile">
      <header className="profile-header">
        <button className="back-button" onClick={() => onNavigate('students')}>
          <ArrowLeft size={20} />
          <span>Back to Students</span>
        </button>
        <div className="profile-header-actions">
          <button className="profile-edit-btn" onClick={() => setShowEditModal(true)} title="Edit Student Profile">
            <Pencil size={16} />
            <span>Edit</span>
          </button>
          <button className="profile-print-btn" onClick={handlePrint} title="Print Student Overview">
            <Printer size={16} />
            <span>Print</span>
          </button>
        </div>
      </header>

      <div className="profile-card">
        <div className="profile-info">
          <div className="avatar">
            <User size={40} />
          </div>
          <div className="profile-details">
            <h2>{student.name}</h2>
            <p>{student.section} • {student.grade} • ID: {student.id}</p>
          </div>
          <div className="profile-status">
            <RiskBadge level={student.riskLevel} />
          </div>
        </div>

        <nav className="profile-tabs">
          {TABS.map(tab => {
            const Icon = TAB_ICONS[tab.id];
            return (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {renderTab()}
      </div>

      {/* Edit Student Modal */}
      <StudentFormModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
        student={student}
      />
    </div>
  );
};

export default StudentProfile;
