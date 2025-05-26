import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import AddWeapon from './pages/AddWeapon';
import Stories from './pages/Stories';
import Services from './pages/Services';
import Contacts from './pages/Contacts';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Stats from './pages/Stats';
import AdvisorGPT from './pages/AdvisorGPT';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <div className="container py-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/add" element={<AddWeapon />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/advisor" element={<AdvisorGPT />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
