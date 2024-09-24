import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';

import LandingPage from "./components/main/LandingPage";
import SpecificLeaguePage from "./components/main/SpecificLeaguePage";

function App() {
  // const navigate = useNavigate();
  const [currentPageName, setCurrentPageName] = useState("Home");
  const setPageName = (pgName) => {
    setCurrentPageName(pgName);
    // alert("pgName: " + pgName);
  }


  const [currentCategory, setCurrentCategory] = useState("Football");
  const setCategory = (cat) => {
    setCurrentCategory(cat);
    // alert("cat: " + cat);
  }


  
  const [popularLeagueId, setPopularLeagueId] = useState("");
  const setCurrentPopularLeagueId = (id) => {
    setPopularLeagueId(id);
    // alert("cat: " + cat);
  }
  const [popularLeagueName, setPopularLeagueName] = useState(""); 
  const setCurrentPopularLeagueName = (name) => {
    setPopularLeagueName(name);
    // alert("cat: " + cat);
  }


  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };


  
  const [specificLeague, setSpecificLeague] = useState("");
  const setSpecific = (spe) => {
    setSpecificLeague(spe);
    // alert("spe: " + spe);
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
            <Route path='/' element={<LandingPage 
              setPageName={setPageName} currentPageName={currentPageName} 
              setCategory={setCategory} currentCategory={currentCategory} 
              isMobile={isMobile} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} 
              specificLeague={specificLeague} setSpecific={setSpecific}
              setCurrentPopularLeagueId={setCurrentPopularLeagueId} setCurrentPopularLeagueName={setCurrentPopularLeagueName}
              popularLeagueId={popularLeagueId} popularLeagueName={popularLeagueName}
            />}/>
            
            
            <Route path='/specific-league' element={<SpecificLeaguePage 
              setPageName={setPageName} currentPageName={currentPageName} 
              setCategory={setCategory} currentCategory={currentCategory} 
              isMobile={isMobile} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} 
              specificLeague={specificLeague} setSpecific={setSpecific}
              setCurrentPopularLeagueId={setCurrentPopularLeagueId} setCurrentPopularLeagueName={setCurrentPopularLeagueName}
              popularLeagueId={popularLeagueId} popularLeagueName={popularLeagueName}
            />}/>

          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;