import React from 'react';
import Header from './components/Header';
import MainLayout from './components/MainLayout';
import { ResumeProvider } from './context/ResumeContext';

function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-transparent">
        <Header />
        <MainLayout />
      </div>
    </ResumeProvider>
  );
}

export default App;
