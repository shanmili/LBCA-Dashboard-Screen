import React from 'react';
import '../../../styles/dashboard/StatCard.css';

const StatCard = ({ 
  title,
  value,
  subtext,
  icon: Icon,
  color,
  trend,
  onClick
}) => {
  return (
    <div 
      className={`stat-card ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
      // Removed borderLeftColor style
    >
      <div className="stat-header">
        <div>
          <p className="stat-title">{title}</p>
          <h3 className="stat-value">{value}</h3>
        </div>
        {Icon && (
          <div className="stat-icon" style={{ color }}>
            <Icon size={24} />
          </div>
        )}
      </div>
      <div className="stat-footer">
        {trend && (
          <span className={`trend-${trend}`}>
            {trend === 'up' ? '↑' : '↓'}
          </span>
        )}
        <span className="stat-subtext">{subtext}</span>
      </div>
    </div>
  );
};

export default StatCard;