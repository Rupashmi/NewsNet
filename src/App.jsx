import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EnvCheck from './pages/EnvCheck';
import MySummaries from './pages/MySummaries';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/env-check" element={<EnvCheck />} />
        <Route path="/" element={<Home />} />
        <Route path="/summaries" element={<MySummaries />} />
      </Routes>
      <Footer />  {/* Add this */}
    </Router>
  );
}

export default App;
