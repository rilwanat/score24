import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from "./components/main/LandingPage";

function App() {
  // const navigate = useNavigate();


  useEffect(() => {
    // initAuth();
  }, []);
  
  
  return (
    <Router>
      <div>
        <div>
          

          <Routes>

            <Route path="/*" element={<div>NOT FOUND</div>} />
            <Route path='/' element={<LandingPage />}/>

          </Routes>
          

        </div>
      </div>
    </Router>
  );
}

export default App;