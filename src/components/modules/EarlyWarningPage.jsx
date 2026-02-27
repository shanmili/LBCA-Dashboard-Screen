import React from 'react';
import RiskSummary from './earlywarning/RiskSummary';
import WarningFilter from './earlywarning/WarningFilter';
import WarningTable from './earlywarning/WarningTable';
import useEarlyWarningState from '../../hooks/useEarlyWarningState';
import '../../styles/earlyWarning/EarlyWarningPage.css';

const EarlyWarningPage = ({ onNavigate }) => {
  const {
    filters,
    updateFilter,
    filteredStudents,
    allStudents,
    riskCounts,
  } = useEarlyWarningState();

  return (
    <div className="warning-page">
      <div className="warning-header-row">
        <div className="header-title">
          <h2>Early Warning Alerts</h2>
          <p className="header-subtitle">Monitor and manage at-risk students based on PACE progress</p>
        </div>
        
        <WarningFilter 
          filters={filters}
          onFilterChange={updateFilter}
        />
      </div>

      {/* Risk Summary Cards */}
      <RiskSummary counts={riskCounts} />

      {/* At-Risk Students Table */}
      <WarningTable 
        students={filteredStudents}
        onNavigate={onNavigate}
      />

      <div className="warning-footer">
        <p>Showing {filteredStudents.length} of {allStudents.length} students</p>
      </div>
    </div>
  );
};

export default EarlyWarningPage;