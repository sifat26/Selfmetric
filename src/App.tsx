import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Compare from './pages/Compare';

export default function App() {
  return (
    <BrowserRouter>
      <QuizProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </QuizProvider>
    </BrowserRouter>
  );
}
