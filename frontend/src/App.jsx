import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget the CSS!
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddCandidate from './pages/AddCandidate';
import EditCandidate from './pages/EditCandidate';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* ToastContainer allows toasts to appear globally */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddCandidate />} />
            <Route path="/edit/:id" element={<EditCandidate />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;