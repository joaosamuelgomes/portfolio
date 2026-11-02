import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArticleList } from './pages/ArticleList';
import { ArticlePage } from './pages/ArticlePage';
import { CaseStudy } from './pages/CaseStudy';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/:id" element={<CaseStudy />} />
        <Route path="/artigos" element={<ArticleList />} />
        <Route path="/artigos/:slug" element={<ArticlePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
