import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './components/Home';
import CreateTable from './components/CreateTable';
import JoinTable from './components/JoinTable';
import TableView from './components/TableView';

function RoutePersistence() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedRoute = localStorage.getItem('lastRoute');
    if (savedRoute && savedRoute !== '/' && savedRoute !== location.pathname) {
      navigate(savedRoute, { replace: true });
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      localStorage.setItem('lastRoute', location.pathname);
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <RoutePersistence />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateTable />} />
        <Route path="/join" element={<JoinTable />} />
        <Route path="/table/:id" element={<TableView />} />
      </Routes>
    </Router>
  );
}

export default App;