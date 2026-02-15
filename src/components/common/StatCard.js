import React from 'react';
import { 
    TrendingUp, 
    TrendingDown 
} from 'lucide-react';

const StatCard = ({ title, value, subtext, icon: Icon, color, trend, onClick, className }) => (
  <article
    onClick={onClick}
    className={`stat-card ${onClick ? 'clickable' : ''} ${className || ''}`}
    style={{ '--icon-color': color }}
  >
    <header className="stat-header">
      <div>
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
      <div className="stat-icon">
        <Icon size={20} style={{ color }} />
      </div>
    </header>
    <footer className="stat-footer">
      {trend === 'up' && <TrendingUp size={14} className="trend-up" />}
      {trend === 'down' && <TrendingDown size={14} className="trend-down" />}
      <span className="stat-subtext">{subtext}</span>
    </footer>
  </article>
);

export default StatCard;


//mga stats sa students for dashboard
