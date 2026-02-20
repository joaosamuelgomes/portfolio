import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CaseStudy } from './pages/CaseStudy';
import { Home } from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/:id" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}