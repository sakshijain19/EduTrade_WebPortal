
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./Layout";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Feedback from "./Components/Feedback/Feedback";
import Notes from "./Components/Notes/Notes";
import BooksPage from "./Components/Book/BookPage";
import QuestionPapers from "./Components/QuestionPapers/QuestionPapers";
import { AuthProvider } from "./Components/context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="notes" element={<Notes />} />
            <Route path="question-papers" element={<QuestionPapers />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}



export default App




