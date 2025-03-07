import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './layouts/Layout';
import './App.css';
import BusinessAgencies from './components/BusinessAgencies';
import ClientCard from './components/ClientCard';
import Agent from './components/Agent';
import AgentService from './components/AgentService';
import AgentControl from './components/AgentControl';
import AdminService from './components/AdminService';
import AdminControl from './components/AdminControl';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route path=":serviceName" element={<BusinessAgencies />} />
          <Route path=":serviceName/:agencyLocation" element={<ClientCard />} />
          <Route path="agent" element={<Agent />} />
          <Route path="agent/:serviceName" element={<AgentService  />} />
          <Route path="agent/:serviceName/:agencyLocation" element={<AgentControl />} />
          <Route path="admin" element={<AdminService />} />
          <Route path="admin/:serviceName" element={<AdminControl />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
