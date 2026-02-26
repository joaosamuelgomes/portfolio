import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CaseStudy } from './pages/CaseStudy';
import { Home } from './pages/Home';
import { PlaygroundPage } from './pages/PlaygroundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/:id" element={<CaseStudy />} />
        <Route path="/playground" element={<PlaygroundPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}