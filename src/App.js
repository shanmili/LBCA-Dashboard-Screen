import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardScreen from './screens/DashboardScreen';
import AccountSettings from './components/layout/TopNavBar/Accountsettings';

function App() {
  return (
    <BrowserRouter basename="/LBCA-Monitoring-System">
      <Routes>
        <Route path="/" element={<DashboardScreen />} />
        <Route path="/settings" element={<AccountSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
