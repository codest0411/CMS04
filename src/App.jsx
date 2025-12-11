import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import SkillsPage from './pages/SkillsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import BlogsPage from './pages/BlogsPage.jsx';
import ExperiencePage from './pages/ExperiencePage.jsx';
import EducationPage from './pages/EducationPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import MessagesPage from './pages/MessagesPage.jsx';
import AchievementsPage from './pages/AchievementsPage.jsx';

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/messages" element={<MessagesPage />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
