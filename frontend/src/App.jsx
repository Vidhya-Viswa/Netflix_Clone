import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/login" element={<Login />} />  
        {/* Removed Dashboard route because the file was deleted */}
      </Routes>
    </Router>
  );
}

export default App;
