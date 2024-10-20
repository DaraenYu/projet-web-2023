import { useEffect, useState } from 'react';
import { fetchPosts } from '../code/wpfetch';
import '../Sass/App.scss';
import Entete from './Entete';
import Pdp from './Pdp';
import Accueil from './Accueil';
import Formation_Specifique from './Formation_Specifique';
import Projets_Etudiants from './Projets_Etudiants';
import Activites from './Activites';
import Futur from './Futur';
import Quiz from './Quiz';
import Page_404 from './Page_404';
import TitrePage from './TitrePage';
import ArrierePlan from "../medias/Images/arriere-plan.svg";
import ScrollToTop, { scrollUp } from './ScrollToTop';
import { Route, Routes } from 'react-router-dom';

export default function App() {

  const [posts, setPosts] = useState([]);
  const [theme, setTheme] = useState(() => {
    const themeSauvegarde = localStorage.getItem('theme-tim-2023');

    if(themeSauvegarde === "clair" || themeSauvegarde === "sombre") {
      return themeSauvegarde;
    }
    else {
      return "sombre";
    }
  });
  
  const [langue, setLangue] = useState(() => {
    const langueSauvegarde = localStorage.getItem('langue-tim-2023');

    if(langueSauvegarde === "fr" || langueSauvegarde === "en") {
      return langueSauvegarde;
    }
    else {
      return "fr";
    }
  });

  useEffect(() => {
    async function fetchData() {
      const data = await fetchPosts();
      setPosts(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('theme-tim-2023', theme);
    document.body.className = `theme-${theme}`;
  }, [theme]);
  
  useEffect(() => {
    localStorage.setItem('langue-tim-2023', langue);
  }, [langue]);

  const [toggleAside, setToggleAside] = useState(false);

  useEffect(() => {
    const handlePopstate = () => {
      setToggleAside(false);
      scrollUp();
    }

    window.addEventListener('popstate', handlePopstate);
    setToggleAside(false);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  return (
    <div className="App" style={{backgroundImage: `url(${ArrierePlan})`}}>
      <Entete theme={theme} setTheme={setTheme} langue={langue} setLangue={setLangue} /> {/* Entête du site - Présent par défaut sur tous les pages qui suivent */}
      <div className='margin-entete'></div>
      <TitrePage />
      {/* Différentes route pour l'url */}
      <Routes>
        <Route exact path="/" element={< Accueil langue={langue} />} ></Route> {/*Page par défaut*/}
        <Route exact path="/accueil" element={< Accueil langue={langue} />} ></Route> {/*Page d'accueil*/}

        <Route exact path="/grille-de-cours" element={< Formation_Specifique posts={posts} langue={langue} />} ></Route> {/*Page de Grille de Cours*/}

        <Route exact path="/projets-etudiants" element={< Projets_Etudiants posts={posts} langue={langue} toggleAside={toggleAside} setToggleAside={setToggleAside} />} ></Route> {/*Page de Projets Étudiants*/}

        <Route exact path="/activites" element={< Activites posts={posts} langue={langue} toggleAside={toggleAside} setToggleAside={setToggleAside} />} ></Route> {/*Page d'Activités*/}

        <Route exact path="/futur" element={< Futur langue={langue} />} ></Route> {/*Page de Futur*/}

        <Route exact path="/quiz" element={< Quiz langue={langue} />} ></Route> {/*Page de quiz*/}

        <Route path='*' element={< Page_404 langue={langue} />} ></Route>
      </Routes>
      <Pdp langue={langue} /> {/* Footer du site - Présent par défaut sur tous les pages qui suivent */}
      <ScrollToTop />
    </div>
  );
}

const appContainer = document.getElementById('Site-Web-TIM');
if (appContainer) {
  ReactDOM.render(<App />, appContainer);
}