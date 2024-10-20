import '../Sass/Accueil.scss'
import '../Sass/Carrousel.scss'
import { useEffect, useRef, useState } from "react";
import { cssModel, htmlModel } from "../code/utility";
import { texteAccueil } from '../code/textes';
import { Link } from "react-router-dom";
import { scrollUp } from './ScrollToTop';
import headerVideo from "../medias/video_accueil/Intro-TIM-Bureau.mp4";
import imgProfCompressed600 from '../medias/Images/statique/prof-2017-600.webp'
import imgProfCompressed1024 from '../medias/Images/statique/prof-2017-1024.webp'
import imgProfCompressed1200 from '../medias/Images/statique/prof-2017-Compressed.webp'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TechnoIcons  from './TechnoIcons';
import Carrousel from './Carrousel';
import { Reveal } from './RevealAnim';


export default function Accueil({langue}) {

  // Zone Cycle Témoignages
  const indexTemoignageMax = 5;

  const [indexTemoignage, setIndexTemoignage] = useState(() => {
    const indexSauvegarde = parseInt(localStorage.getItem("index-temoignage-tim-2023"));
  
    if(!isNaN(indexSauvegarde) && indexSauvegarde >= 1 && indexSauvegarde <= indexTemoignageMax) {
      return indexSauvegarde;
    } else {
      return 1;
    }
  });
  const intervalRef = useRef(null);

  if(indexTemoignage > indexTemoignageMax || indexTemoignage < 1) {
    setIndexTemoignage(1);
  }

  useEffect(() => {
    localStorage.setItem('index-temoignage-tim-2023', indexTemoignage);
  }, [indexTemoignage]);

  function incrementIndexTemoignage() {
    setIndexTemoignage((indexDernier) => (indexDernier % indexTemoignageMax) + 1);
  }

  function startInterval() {
    const intervalTemps = 30000;
    intervalRef.current = setInterval(() => {
      incrementIndexTemoignage();
    }, intervalTemps);
  }

  function resetInterval() {
    clearInterval(intervalRef.current);
    startInterval();
  }

  useEffect(() => {
    startInterval();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  // Zone Code Snippet

  const [codeHtml, setCodeHtml] = useState(htmlModel[langue]);
  const [codeCss, setCodeCss] = useState(cssModel);
  const [sourceIframeSrc, setSourceIframe] = useState('');

  useEffect(() => {
    updateIframe(codeHtml, codeCss);
  }, []);

  useEffect(() => {
    setCodeHtml(htmlModel[langue]);
    updateIframe(htmlModel[langue], codeCss);
  }, [langue])

  const changementHtml = (event) => {
    const newValue = event.target.value;
    setCodeHtml(newValue);
    updateIframe(newValue, codeCss);
  };

  const changementCss = (event) => {
    const newValue = event.target.value;
    setCodeCss(newValue);
    updateIframe(codeHtml, newValue);
  };

  const updateIframe = (html, css) => {
    const iframeDocument = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>${html}</body>
      </html>
    `;
    setSourceIframe(iframeDocument);
  };

  // GESTION DES BOUTONS DU CODE SNIPPET
  const [siCodeHtml, setSiCodeHtml] = useState(true);
  const [siChangementHtml, setSiChangementHtml] = useState(true);

  const handleHtmlButtonClick = () => {
    setSiCodeHtml(true);
    setSiChangementHtml(true);
  };

  const handleCssButtonClick = () => {
    setSiCodeHtml(false);
    setSiChangementHtml(false);
  };

  const imageProf = "../medias/Images/statique/prof-2017-Compressed-320w.webp"
  const imgCours = "../medias/Images/statique/grille_de_cours.webp"
  const ImgFutur = "../medias/Images/statique/img_futur_hero.webp"

  return (
    <main className='Accueil'>
      {/* SECTION 1 - VIDÉO*/}
      <section className="accueil-section1">
        <div className="accueil-text">
          <Reveal>
            <h1 className='animer-titre'>{texteAccueil[langue].section1.titre1}</h1>
          </Reveal>
          <Reveal style={{transitionDelay:'0.8s'}}>
            <span className='titre-bg'>{texteAccueil[langue].section1.span}</span>
          </Reveal>
          <Reveal style={{transitionDelay:'0.9s'}}>
            <p>{texteAccueil[langue].section1.p1}</p>
          </Reveal>
        </div>
        <video className="accueil-video" autoPlay loop muted playsInline preload="true" kind="captions" srcLang="fr" label="captions_français">
          <source src={headerVideo} type="video/mp4"></source>
        </video>
      </section>

      {/* SECTION 2 - CODE SNIPPET */}
      <section className="accueil-section2">
        <h1>{texteAccueil[langue].section2.titre} <span className="titre-bg">{texteAccueil[langue].section2.span}</span></h1>
        <div className="accueil-text-code">
          <div className="accueil-text-section2">
            <p>{texteAccueil[langue].section2.p1}</p>
            <p>{texteAccueil[langue].section2.p2}</p>
          </div>
          <div className='accueil-code'>
            <div className="accueil-code-input">
              <div className="accueil-code-nav">
                  <button onClick={handleHtmlButtonClick}>HTML</button>
                  <button onClick={handleCssButtonClick}>CSS</button>
                  <label htmlFor="accueil-code-input">{texteAccueil[langue].section2.snippet}</label>
              </div>
              <textarea
                id="accueil-code-input"
                className="accueil-code-snippet"
                value={siCodeHtml ? codeHtml : codeCss}
                onChange={siChangementHtml ? changementHtml : changementCss}
                rows="10"
                cols="50"
              />
            </div>
            <div className="accueil-code-resultat">
              <div className="accueil-code-nav">
                  <button>{texteAccueil[langue].section2.resultat}</button>
              </div>
              <iframe
                className="accueil-code-snippet"
                title="Live Preview"
                srcDoc={sourceIframeSrc}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2.5b - Listes des technologies */}
      <section className="accueil-section-technologies">
        <TechnoIcons langue={langue}/>
        {/* <TechnoIcons langue={langue}/> */}
      </section>

      {/* SECTION 2.5 - PROFESSEURS */}
      <section className="accueil-section-profs">
        <h1>{texteAccueil[langue].sectionProfs.titre} <span className="titre-bg">{texteAccueil[langue].sectionProfs.span}</span></h1> 
        <div className="accueil-text-section-profs">
          <img
          srcSet={`${imgProfCompressed600} 300w,
                    ${imgProfCompressed1024} 600w,
                    ${imgProfCompressed1200} 1024w`}
            src={imgProfCompressed1200}
            alt="Image des profs du TIM"
          />
          {/* <img className='accueil-text-section-profs' src={imgProfCompressed320} alt="Image des profs du TIM" /> */}
          <p>{texteAccueil[langue].sectionProfs.p1}</p>
        </div>
      </section>
      
      {/* SECTION 3 - TÉMOIGNAGES */}
      <section className="accueil-section3">
        <h1>{texteAccueil[langue].section3.titre} <span className="titre-bg">{texteAccueil[langue].section3.span}</span>&nbsp;!</h1>
        <div className='accueil-temoignage-quiz'>
          <div className='accueil-temoignage' onClick={() => {resetInterval(); incrementIndexTemoignage();}}>
            <p>{texteAccueil[langue].section3.temoignage[`eleve${indexTemoignage}`].message}</p>
            <div className='accueil-temoignage-nom-annee'>
              <p>{texteAccueil[langue].section3.temoignage[`eleve${indexTemoignage}`].nom}</p>
              <p>{texteAccueil[langue].section3.temoignage[`eleve${indexTemoignage}`].annee}</p>
            </div>
          </div>
          <Link onClick={scrollUp} to="/quiz">
            <a className='bouton' href={texteAccueil[langue].section3.quiz}>{texteAccueil[langue].section3.quiz} <KeyboardArrowRightIcon style={{color: "var(--couleur-accent)"}}/></a>
          </Link>
        </div>
      </section>

      {/* SECTION 5 - NAV */}
      <section className="accueil-section5">
        <h1>{texteAccueil[langue].section5.titre} <span className="titre-bg">{texteAccueil[langue].section5.span}</span>&nbsp;!</h1>
        <div className="accueil-boutons-nav">
          <Link onClick={scrollUp} to="/grille-de-cours"><a className='bouton' href={texteAccueil[langue].section5.bouton.cours}>{texteAccueil[langue].section5.bouton.cours} <KeyboardArrowRightIcon style={{color: "var(--couleur-accent)"}}/></a></Link>
          <Link onClick={scrollUp} to="/projets-etudiants"><a className='bouton' href={texteAccueil[langue].section5.bouton.projets}>{texteAccueil[langue].section5.bouton.projets} <KeyboardArrowRightIcon style={{color: "var(--couleur-accent)"}}/></a></Link>
          <Link onClick={scrollUp} to="/activites"><a className='bouton' href={texteAccueil[langue].section5.bouton.activite}>{texteAccueil[langue].section5.bouton.activite} <KeyboardArrowRightIcon style={{color: "var(--couleur-accent)"}}/></a></Link>
          <Link onClick={scrollUp} to="/futur"><a className='bouton' href={texteAccueil[langue].section5.bouton.futur}>{texteAccueil[langue].section5.bouton.futur} <KeyboardArrowRightIcon style={{color: "var(--couleur-accent)"}}/></a></Link>
          <Link onClick={scrollUp} to="/quiz"><a className='bouton' href="Quiz">Quiz <KeyboardArrowRightIcon style={{color: "var(--couleur-accent)"}}/></a></Link>
          <a className='bouton' href="https://admission.sram.qc.ca/" target='_blank'>
            {texteAccueil[langue].section6.inscription}<KeyboardArrowRightIcon style={{color: "var(--couleur-accent)"}}/>
          </a>
        </div>
      </section>
      
      {/* SECTION 6 - AVANTAGES */}
      <section className="accueil-section6">
        <h1>{texteAccueil[langue].section6.titre} <span className="titre-bg">{texteAccueil[langue].section6.span}</span>&nbsp;?</h1>
        <ul>
          <li>{texteAccueil[langue].section6.li1}</li>
          <li>{texteAccueil[langue].section6.li2}</li>
          <li>{texteAccueil[langue].section6.li3}</li>
          <li>{texteAccueil[langue].section6.li4}</li>
        </ul>
        <Carrousel/>
      </section>
    </main>
  );
}