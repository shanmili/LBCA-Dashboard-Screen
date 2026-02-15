import React from 'react';
import { Construction } from 'lucide-react'; 
import '../../styles/UnderMaintenance.css'; 

const UnderMaintenance = ({ title }) => {
  return (
    <div className="maintenance-container">
      <Construction size={64} color="#F59E0B" />
      <h2 className="maintenance-title">{title}</h2>
      <p className="maintenance-message">
        Sorry for the inconvenience, this page is currently under maintenance.
      </p>
    </div>
  );
};

export default UnderMaintenance;

//reusable for every screen in dashboard
