import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from "./components/main/LandingPage";

function App() {
  // const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState("Football");
  const setCategory = (cat) => {
    setCurrentCategory(cat);
    // alert(cat);
  }

  useEffect(() => {
    // initAuth();
    // setCategory("Football");
  }, []);
  
  
  return (
    <Router>
      <div>
        <div>
          

          <Routes>

            <Route path="/*" element={<div>NOT FOUND</div>} />
            <Route path='/' element={<LandingPage setCategory={setCategory} currentCategory={currentCategory}/>}/>

          </Routes>
          

        </div>
      </div>
    </Router>
  );
}

export default App;