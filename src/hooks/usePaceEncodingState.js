import { useState, useEffect } from 'react';
import { paceSubjects, paceEncodingData } from '../data/mockData';

const SCHOOL_YEARS = ['2025-2026', '2024-2025', '2023-2024'];

export default function usePaceEncodingState() {
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [selectedSubject, setSelectedSubject] = useState(paceSubjects[0] || 'Math');
  const [selectedSchoolYear, setSelectedSchoolYear] = useState('2025-2026');
  const [encodingData, setEncodingData] = useState([]);
  const [saveMessage, setSaveMessage] = useState('');

  // Load data when section/subject changes
  useEffect(() => {
    const sectionData = paceEncodingData[selectedSection];
    if (sectionData && sectionData[selectedSubject]) {
      setEncodingData(sectionData[selectedSubject].map(s => ({ ...s })));
    } else {
      setEncodingData([]);
    }
    setSaveMessage('');
  }, [selectedSection, selectedSubject]);

  const handleCompletedChange = (studentId, completed) => {
    setEncodingData(prev => prev.map(row =>
      row.studentId === studentId ? { ...row, completed } : row
    ));
  };

  const handleScoreChange = (studentId, testScore) => {
    const score = testScore === '' ? null : parseInt(testScore, 10);
    setEncodingData(prev => prev.map(row =>
      row.studentId === studentId ? { ...row, testScore: isNaN(score) ? null : score } : row
    ));
  };

  const handleSave = (studentId) => {
    const student = encodingData.find(s => s.studentId === studentId);
    if (student) {
      setSaveMessage(`Saved PACE data for ${student.name}`);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleSaveAll = () => {
    setSaveMessage(`All PACE data saved for ${selectedSection} - ${selectedSubject}`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return {
    SCHOOL_YEARS,
    paceSubjects,
    selectedSection,
    setSelectedSection,
    selectedSubject,
    setSelectedSubject,
    selectedSchoolYear,
    setSelectedSchoolYear,
    encodingData,
    saveMessage,
    handleCompletedChange,
    handleScoreChange,
    handleSave,
    handleSaveAll,
  };
}
