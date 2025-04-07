import './App.css';
import PrivacyPage from './Pages/PrivacyPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
