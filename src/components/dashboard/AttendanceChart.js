import React from 'react';
import { 
    PieChart, 
    Pie, 
    Cell, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';

const AttendanceChart = ({ data, overallPercentage }) => {
  return (
    <article className="chart-card">
      <h3 className="chart-title">Attendance</h3>
      <figure className="pie-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <figcaption className="pie-center">
          <span className="pie-value">{overallPercentage}%</span>
          <span className="pie-label">Present</span>
        </figcaption>
      </figure>
      
      {/* Legend */}
      <div className="pie-legend">
        {data.map((item) => (
           <div className="legend-item" key={item.name}>
             <span className="legend-color" style={{ backgroundColor: item.color }}></span>
             <span>{item.name}</span>
           </div>
        ))}
      </div>
    </article>
  );
};

export default AttendanceChart;

//pang attendance chart ni 