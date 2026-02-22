import React from 'react';
import { Clock, Inbox } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

const ActivityFeed = () => {
  const { userActivity } = useNotifications();

  return (
    <aside className="activity-card">
      <h3 className="activity-title">Recent Activity</h3>
      {userActivity && userActivity.length > 0 ? (
        <ul className="activity-list">
          {userActivity.map(a => (
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
      ) : (
        <div className="activity-empty">
          <Inbox size={32} color="#9CA3AF" />
          <p>No recent activity</p>
        </div>
      )}
    </aside>
  );
};

export default ActivityFeed;
