import PaceFilter from './pace/PaceFilter';
import PaceTable from './pace/PaceTable';
import usePaceEncodingState from '../../hooks/usePaceEncodingState';
import '../../styles/pace/PacePage.css';

const PacePage = () => {
  const {
    filters,
    updateFilter,
    subjectOptions,
    encodingData,
    saveMessage,
    handleCompletedChange,
    handleScoreChange,
    handleSave,
    handleSaveAll,
  } = usePaceEncodingState();

  // Combine filters with subjectOptions for the filter component
  const filterProps = {
    ...filters,
    subjectOptions
  };

  return (
    <div className="pace-page">
      <div className="pace-header-row">
        <div className="header-title">
          <div className="title-wrapper">
            <h2>PACE Progress Encoding</h2>
          </div>
          <p className="header-subtitle">Record student PACE completion and test scores</p>
        </div>
        
        <PaceFilter 
          filters={filterProps}
          onFilterChange={updateFilter}
          onSaveAll={handleSaveAll}
        />
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className="save-message">
          <span>{saveMessage}</span>
        </div>
      )}

      <PaceTable 
        data={encodingData}
        onCompletedChange={handleCompletedChange}
        onScoreChange={handleScoreChange}
        onSave={handleSave}
      />
    </div>
  );
};

export default PacePage;