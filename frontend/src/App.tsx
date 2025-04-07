import './App.css';
import CreateAccountPage from './Pages/CreateAccountPage';
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
          <Route path="/register" element={<CreateAccountPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
