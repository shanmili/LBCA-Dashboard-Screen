import React from 'react';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    Legend 
} from 'recharts';

const TrendChart = ({ data }) => {
  return (
    <article className="chart-card wide">
      <h3 className="chart-title">Academic Trends Comparison</h3>
      <figure className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#9CA3AF" tick={{fontSize: 12}} />
            <YAxis domain={[60, 100]} stroke="#9CA3AF" tick={{fontSize: 12}} />
            <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB' }} />
            <Legend wrapperStyle={{paddingTop: '10px'}}/>
            <Line type="monotone" dataKey="SectionA" stroke="#1F4788" strokeWidth={3} dot={{r: 4}} name="Section A" />
            <Line type="monotone" dataKey="SectionB" stroke="#F59E0B" strokeWidth={3} dot={{r: 4}} name="Section B" />
            <Line type="monotone" dataKey="SectionC" stroke="#10B981" strokeWidth={3} dot={{r: 4}} name="Section C" />
          </LineChart>
        </ResponsiveContainer>
      </figure>
    </article>
  );
};

export default TrendChart;

//pang trend chart ni