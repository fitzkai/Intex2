import './App.css';
import MoviesPage from './Pages/MoviesPage';
import PrivacyPage from './Pages/PrivacyPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import AdminPage from './Pages/AdminPage';
import HomePage from './Pages/HomePage';
import MovieDetailPage from './Pages/MovieDetailPage';
<<<<<<< HEAD
import RecommendationsPage from './Pages/RecommendationsPage';
=======
import UserInfoForm from './components/UserInfoForm';
>>>>>>> cc1b693ac3aac1f8870da61866cd8bf8c731f50c

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/MoviesPage" element={<MoviesPage />} />
          <Route path="/MoviesPage/:id" element={<MovieDetailPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
<<<<<<< HEAD
          <Route path="/recommendations" element={<RecommendationsPage />} />
=======
          <Route path="/userinfo" element={<UserInfoForm />} />
>>>>>>> cc1b693ac3aac1f8870da61866cd8bf8c731f50c
        </Routes>
      </Router>
    </>
  );
}

export default App;
