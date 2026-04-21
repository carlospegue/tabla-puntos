import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateTable from './components/CreateTable';
import JoinTable from './components/JoinTable';
import TableView from './components/TableView';

function App() {
  return (
    <Router>
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