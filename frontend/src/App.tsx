import './App.css';
import MoviesPage from './Pages/MoviesPage';
import PrivacyPage from './Pages/PrivacyPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/MoviesPage" element={<MoviesPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
