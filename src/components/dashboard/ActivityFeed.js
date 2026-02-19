import React from 'react';
import { Clock } from 'lucide-react';

const ActivityFeed = ({ activities }) => {
  return (
    <aside className="activity-card">
      <h3 className="activity-title">Recent Activity</h3>
      <ul className="activity-list">
        {activities.map(a => (
          <li key={a.id} className="activity-item">
            <div className="activity-dot"></div>
            <div>
              <p className="activity-text">{a.text}</p>
              <time className="activity-time">
                <Clock size={12} />
                {a.time}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ActivityFeed;

//pang recent activity 