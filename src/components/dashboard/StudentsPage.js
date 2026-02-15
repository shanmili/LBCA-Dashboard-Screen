import React from 'react';
import { Users } from 'lucide-react';
import { studentsData } from '../../data/mockData';

const StudentsPage = () => {
  return (
    <div className="students-page">
      <header className="students-header">
        <Users size={24} />
        <h2>Students List Enrolled in Section A, B, C</h2>
      </header>
      
      <div className="students-table-container">
        <table className="students-list-table">
          <thead>
            <tr>
              <th>ID Number</th>
              <th>Name of Students</th>
              <th>Section</th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.section}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsPage;



