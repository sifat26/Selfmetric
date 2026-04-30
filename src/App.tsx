import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import Compare from "./pages/Compare";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import SharedResults from "./pages/SharedResults";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";

export default function App() {
  return (
    <BrowserRouter>
      <QuizProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/shared/:code" element={<SharedResults />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </QuizProvider>
    </BrowserRouter>
  );
}
