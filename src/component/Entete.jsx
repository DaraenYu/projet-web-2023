import '../Sass/Entete.scss'
import { Link } from "react-router-dom";
import { texteHeader, texteAccueil, texteFooter } from '../code/textes';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { yellow } from '@mui/material/colors';
import { useState, useRef  } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { scrollUp } from './ScrollToTop';


export default function Entete({theme, setTheme, langue, setLangue}) {


  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef(null);

  const handleBurgerClick = () => {
    setIsActive(!isActive);
    
    // Add or remove the 'animate' class on li elements based on the 'active' class
    const navMenuContainer = document.querySelector('.nav-menu');

    if (navMenuContainer) {
      const liElements = navMenuContainer.querySelectorAll('li');
      const pElements = navMenuContainer.querySelectorAll('p');

      const shouldAddAnimateClass = navMenuContainer.classList.contains('active');

      // Toggle 'animate' class for li elements
      liElements.forEach((li) => {
        li.classList.toggle('animate', !shouldAddAnimateClass);

        // Toggle 'animate' class for the <a> element inside the li
        const aElement = li.querySelector('a');
        if (aElement) {
          aElement.classList.toggle('animate', !shouldAddAnimateClass);
        }
      });

      // Toggle 'animate-p' class for p elements
      pElements.forEach((p) => {
        p.classList.toggle('animated-p', !shouldAddAnimateClass);
      });

    }
  };

  const toggleAnimateClass = (element) => {
    element.classList.toggle('animated-p');
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  const changementTheme = () => {
    setTheme(theme === 'clair' ? 'sombre' : 'clair');
  };
  const changementLangue = () => {
    setLangue(langue === 'fr' ? 'en' : 'fr');
  };

  return (
    <header className='Entete'>
      <nav className='Entete-block-nav'>
          <Link onClick={scrollUp} to="/accueil" aria-label={langue === 'fr' ? "Logo de Techniques d'intégration multimédia. Cliquer pour retourner à la page d'accueil" : 'Logo of Multimedia Integration Techniques. Click to go to the homepage'}>
            <svg className="logo-tim"  
              xmlns="http://www.w3.org/2000/svg"
              data-name="Calque 1"
              width="2.813rem" height="1.391rem"
              viewBox="0 0 557.95 275.82"
              aria-hidden="true"
            >
              <path
                d="M238.46 275.82V70.59h-77.27v205.23H76.76V70.59H0V0h155.91l.51 6.7 1.36 6.35 2.22 6.01 3.07 5.67 3.75 4.98 4.44 4.47 4.94 3.95 5.63 2.92 5.97 2.4 6.31 1.37 6.66.52 6.65-.52 6.31-1.37 5.97-2.23 5.46-3.09 4.95-3.95 4.43-4.47 3.92-4.98 3.07-5.5 2.22-6.01 1.37-6.35.51-6.7L358.72 0l39.06 162.3h.85L437.69 0h120.26v275.82h-79.83V98.92h-.85l-47.59 176.9h-62.94l-47.59-176.9h-.86v176.9h-79.83z"
                style={{
                  fill: "#fff",
                  strokeWidth: 0,
                }}
              />
            </svg>
          </Link>

          <div className='entete-container-btn'>
            <button className="btn-langue" 
            onClick={changementLangue}
            aria-label={langue === 'fr' ? 'Cliquer pour passer en anglais' : 'Click here to switch to french'}
            >{langue === "fr" ? "EN" : "FR"}</button>
            <button className="btn-theme" 
            onClick={changementTheme}
            aria-label={
              langue === 'fr'
                ? theme === 'clair'
                  ? 'Cliquer pour passer en mode sombre'
                  : theme === 'sombre'
                  ? 'Cliquer pour passer en mode clair'
                  : 'Cliquer pour passer en mode clair'
                : theme === 'clair'
                ? 'Click here to switch to dark mode'
                : theme === 'sombre'
                ? 'Click here to switch to light mode'
                : 'Click here to switch to light mode'
            }
            >{theme === 'clair' ? 
              <NightsStayIcon sx={{color: yellow[600]}} /> : <LightModeIcon sx={{color: yellow[800]}}/>}
            </button>

            
            <svg className={`entete-btn-burger ${isActive ? 'active' : ''}`} 
              onClick={handleBurgerClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleBurgerClick();
                }
              }}
              aria-label={
                langue === 'fr' ? 'Menu de nagivation' : 'Navigation menu'
              }
              xmlns="http://www.w3.org/2000/svg" 
              width="1.5rem" height="1.063rem" 
              viewBox="0 0 24 17"
              style={{ pointerEvents: 'auto' }}
              >
                  <rect width="24" height="3" rx="1" fill="#fff"/>
                  <rect width="19" height="3" rx="1" transform="translate(5 7)" fill="#fff"/>
                  <rect width="24" height="3" rx="1" transform="translate(0 14)" fill="#fff"/>
              </svg>
            </div>
      </nav>


      <section onClick={closeMenu} className={`nav-menu-container ${isActive ? 'active' : ''}`}>
        <nav className={`nav-menu 
        ${isActive ? 'active' : ''}`}
        ref={menuRef}
        onClick ={(e) => e.stopPropagation()}
        >
          <ul className='nav-menu-pages '
          ref={menuRef}
          onClick ={(e) => e.stopPropagation()}
          >
              <li >
                <Link onClick={() => {handleBurgerClick(); scrollUp(); closeMenu()}}to="/accueil">{texteHeader[langue].sectionNav.accueil}</Link>
              </li>
              <li >
                <Link onClick={() => {handleBurgerClick(); scrollUp(); closeMenu()}} to="/grille-de-cours">{texteHeader[langue].sectionNav.cours}</Link>
              </li>
              <li >
                <Link onClick={() => {handleBurgerClick(); scrollUp(); closeMenu()}} to="/projets-etudiants">{texteHeader[langue].sectionNav.projets}</Link>
              </li>
            
              <li >
                <Link onClick={() => {handleBurgerClick(); scrollUp(); closeMenu()}} to="/activites">{texteHeader[langue].sectionNav.activite}</Link>
              </li>
              <li >
                <Link onClick={() => {handleBurgerClick(); scrollUp(); closeMenu()}} to="/futur">{texteHeader[langue].sectionNav.futur}</Link>
              </li>
              <li >
                <Link onClick={() => {handleBurgerClick(); scrollUp(); closeMenu()}} to="/quiz">{texteHeader[langue].sectionNav.quiz}</Link>
              </li>
            </ul>

            
              <div className='border-separation'></div>
            

            <main className='nav-info'>
                <div className="animated-container">
                  <p>{texteAccueil[langue].section1.titre1}</p>
                </div>
                <div className="animated-container">
                  <p>{texteHeader[langue].sectionNav.college}</p>
                </div>
                <div className="animated-container">
                  <p>{texteFooter[langue].adresse1}<br />{texteFooter[langue].adresse2}</p>
                </div>
                <div className="animated-container">
                  <p>"{texteHeader[langue].sectionNav.texteEleve}"</p>
                </div>
            </main>
        </nav>      
      </section>
    </header>
  );
}