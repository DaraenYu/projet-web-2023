import '../Sass/Quiz.scss'

import { useEffect, useState } from "react";
import { texteAccueil, texteQuiz } from "../code/textes";
import { useNavigate } from 'react-router-dom';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CloseIcon from '@mui/icons-material/Close';
import { scrollUp } from './ScrollToTop';
import { Reveal } from './RevealAnim';

export default function Quiz({langue}) {


  ///////// RÉSULTAT DU QUIZ

  // Résultat du quiz par défaut
  const resultatDefaut = {
    programmation: 0,
    creation: 0,
    conception: 0,
    integration: 0
  };

  // Récupère les résultats du quiz de l'utilisateur de l'item 'resultat-tim-2023' du localStorage
  // Retourne l'objet par défaut si une mauvaise ou aucune valeur n'est trouvé
  const [resultatQuiz, setResultatQuiz] = useState(() => {
    const resultatSauvegarde = localStorage.getItem('resultat-tim-2023');
  
    if(resultatSauvegarde) {
      const resultatParse = JSON.parse(resultatSauvegarde);
  
      if(
        resultatParse.programmation >= 0 &&
        resultatParse.creation >= 0 &&
        resultatParse.conception >= 0 &&
        resultatParse.integration >= 0
      ) return resultatParse;

      else return resultatDefaut
    }
    else return resultatDefaut
  });

  // Lorsque le résultat du quiz change, change la valeur dans le localStorage
  useEffect(() => {
    localStorage.setItem('resultat-tim-2023', JSON.stringify(resultatQuiz));
  }, [resultatQuiz]);

  ///////// ÉTAT DU QUIZ

  // Récupère si l'utilisateur a terminé le quiz de l'item 'quiz-tim-2023' du localStorage
  // Retourne 'false' si une mauvaise ou aucune valeur n'est trouvé
  const [quizTermine, setQuizTermine] = useState(() => {
    const quizFiniSauvegarde = localStorage.getItem('quiz-tim-2023');

    if(quizFiniSauvegarde == "true") return quizFiniSauvegarde;
    else {
      resetPointage();
      return false
    };
  });

  // Lorsque l'état du quiz change, change la valeur dans le localStorage
  useEffect(() => {
    localStorage.setItem('quiz-tim-2023', quizTermine);
  }, [quizTermine]);
  
  ///////// NUMÉRO DE QUESTION

  const nbQuestion = 5; // Nombre total de questions du quiz

  // Récupère le numéro de question de l'utilisateur de l'item 'question-tim-2023' du localStorage
  // Retourne 0 si une mauvaise ou aucune valeur n'est trouvé
  const [numQuestion, setNumQuestion] = useState(() => {
    const questionSauvegarde = localStorage.getItem('question-tim-2023');
    console.log(questionSauvegarde);
    if(quizTermine) return nbQuestion;
    else if(questionSauvegarde !== null && !isNaN(questionSauvegarde) && questionSauvegarde < nbQuestion && questionSauvegarde >= 0) return parseInt(questionSauvegarde);
    else return 0;
  });

  // Lorsque le numéro de question change, change la valeur dans le localStorage
  useEffect(() => {
    localStorage.setItem('question-tim-2023', numQuestion);
  }, [numQuestion]);

  ///////// OBJET DES RÉPONSES POUR LA QUESTION ACTUELLE

  // Retourne un objet contenant les réponses pour la question en cours
  const [lesReponses, setLesReponses] = useState(() => {
    if(numQuestion != 0) return texteQuiz[langue][`question${numQuestion}`]?.reponses || {};
    
    else {
      return {};
    }
  }
  );

  // Change l'objet des réponses pour la question en cours lorsque la langue ou la question change
  useEffect(() => {
    if (numQuestion !== 0) setLesReponses(texteQuiz[langue]?.[`question${numQuestion}`]?.reponses || {});
    else setLesReponses({});
  }, [langue, numQuestion]);


  ///////// FONCTION DE CONTRÔLE DU QUIZ

  // Passe à la prochaine question
  async function prochaineQuestion(type) {

    if(type != null) {
      for(const pointType of Object.values(type)) {
        if(typeof window[`pointage_${pointType}`] == "function") await window[`pointage_${pointType}`]();
      }
    }
    
    if(numQuestion < nbQuestion) setNumQuestion(numQuestion + 1);
    else setQuizTermine(true);

    scrollUp();
  }

  // Revient à la question d'avant
  function precedanteQuestion() {
    if(numQuestion > 0) setNumQuestion(numQuestion - 1);
    else setQuizTermine(true);
  }
  
  // Revient à l'état par défaut
  function rejouerQuiz() {
    setNumQuestion(0);
    setQuizTermine(false);
    resetPointage();
  }

  // Retourne à la page d'Accueil
  const navigate = useNavigate();
  function retourQuiz() {
    navigate('/accueil');
  }

  ///////// FONCTION DE POINTAGE DU QUIZ

  function resetPointage() {
    setResultatQuiz(() => resultatDefaut);
  }

  window.pointage_programmation = async() => {
    const etatResultatQuiz = { ...resultatQuiz };
    etatResultatQuiz.programmation += 1;
    setResultatQuiz(etatResultatQuiz);
  };
  window.pointage_creation = async() => {
    const etatResultatQuiz = { ...resultatQuiz };
    etatResultatQuiz.creation += 1;
    setResultatQuiz(etatResultatQuiz);
  };
  window.pointage_conception = async() => {
    const etatResultatQuiz = { ...resultatQuiz };
    etatResultatQuiz.conception += 1;
    setResultatQuiz(etatResultatQuiz);
  };
  window.pointage_integration = async() => {
    const etatResultatQuiz = { ...resultatQuiz };
    etatResultatQuiz.integration += 1;
    setResultatQuiz(etatResultatQuiz);
  };

  const plusHautPoints = Math.max(resultatQuiz.programmation, resultatQuiz.creation, resultatQuiz.conception, resultatQuiz.integration);
  const pointsTotal = resultatQuiz.conception + resultatQuiz.programmation + resultatQuiz.creation + resultatQuiz.integration;

  let typePersonne = null;

  if(plusHautPoints === resultatQuiz.programmation) typePersonne = "programmation";
  else if(plusHautPoints === resultatQuiz.creation) typePersonne = "creation";
  else if(plusHautPoints === resultatQuiz.conception) typePersonne = "conception";
  else if(plusHautPoints === resultatQuiz.integration) typePersonne = "integration";

  const angle = {
    programmation: (resultatQuiz.programmation / pointsTotal) * 360,
    creation: (resultatQuiz.creation / pointsTotal) * 360,
    conception: (resultatQuiz.conception / pointsTotal) * 360,
  };

  let ordreCouleur = 0;
  function verifCouleur(reset) {
    ordreCouleur++;
    if(ordreCouleur == 1) {
      return "#902ce3"; // mauve Hover
    }
    else if(ordreCouleur == 2) {
      return "#ab71db"; // mauve Hover clair
    }
    else if(ordreCouleur == 3) {
      ordreCouleur = 0;
      return "#b699ce"; // mauve Hover foncé
    }
  }

  const styleResultat = {
    backgroundImage: `conic-gradient(
      ${plusHautPoints == resultatQuiz.programmation ? "var(--couleur-accent)" : verifCouleur()} ${angle.programmation}deg,
      ${plusHautPoints == resultatQuiz.creation ? "var(--couleur-accent)" : verifCouleur()} ${angle.programmation}deg ${angle.programmation + angle.creation}deg,
      ${plusHautPoints == resultatQuiz.conception ? "var(--couleur-accent)" : verifCouleur()} ${angle.programmation + angle.creation}deg ${angle.programmation + angle.creation + angle.conception}deg,
      ${plusHautPoints == resultatQuiz.integration ? "var(--couleur-accent)" : verifCouleur()} ${angle.programmation + angle.creation + angle.conception}deg
    )`,
  };

  const QuizInfos = ({ quizTermine, prochaineQuestion }) => {
    return (
      <div>
        {quizTermine && numQuestion == 5 ? (
          <section className="quiz-resultat">
            <section className="resultat">
              <div>
                <Reveal>
                  <h1>{texteQuiz[langue].resultat}</h1>
                </Reveal>
                <Reveal style={{transitionDelay:'0.3s'}}>
                  <h1>{texteQuiz[langue][`${typePersonne}`].orientation}</h1>
                </Reveal>
                
                <div className='textes-resultat-boutons'>
                  <div className="img-resultat">
                    <div className="cercle" style={styleResultat}>
                      <div className="cercle-trou"></div>
                  </div>
                  <div className='legende'>

                    {resultatQuiz.programmation > 0 ?
                      <div>
                        <span style={{backgroundColor: plusHautPoints == resultatQuiz.programmation ? "var(--couleur-accent)" : verifCouleur()}} className='legende-bullet'></span>
                        <div>{texteQuiz[langue].programmation.type} {resultatQuiz.programmation}</div>
                      </div>
                    : ""}

                    {resultatQuiz.creation > 0 ?
                      <div>
                        <span style={{backgroundColor: plusHautPoints == resultatQuiz.creation ? "var(--couleur-accent)" : verifCouleur()}} className='legende-bullet'></span>
                        <div>{texteQuiz[langue].creation.type} {resultatQuiz.creation}</div>
                      </div>
                    : ""}

                    {resultatQuiz.conception > 0 ?
                      <div>
                        <span style={{backgroundColor: plusHautPoints == resultatQuiz.conception ? "var(--couleur-accent)" : verifCouleur()}} className='legende-bullet'></span>
                        <div>{texteQuiz[langue].conception.type} {resultatQuiz.conception}</div>
                      </div>
                    : ""}

                    {resultatQuiz.integration > 0 ?
                      <div>
                        <span style={{backgroundColor: plusHautPoints == resultatQuiz.integration ? "var(--couleur-accent)" : verifCouleur()}} className='legende-bullet'></span>
                        <div>{texteQuiz[langue].integration.type} {resultatQuiz.integration}</div>
                      </div>
                    : ""}

                  </div>
                  </div>

                  <p dangerouslySetInnerHTML={{ __html: texteQuiz[langue][`${typePersonne}`].description.replace(/\n/g, '<br />') }}></p>
                </div>
                    {/* <a className='bouton' href="https://admission.sram.qc.ca/" target='_blank'>
                      {texteAccueil[langue].section6.inscription}<KeyboardArrowRightIcon style={{color: "var(--couleur-accent)"}}/>
                    </a> */}
                  <span>
                    <button className='bouton' onClick={() => {rejouerQuiz(); scrollUp()}} >{texteQuiz[langue].rejouer}</button>
                    <button className='bouton' onClick={() => {retourQuiz(); scrollUp()}}>{texteQuiz[langue].retour}</button>
                  </span>
              </div>
            </section>
          </section>
        ) : (
          <section className="quiz-debut">
              <h2>Quiz</h2>
              <h1>{texteQuiz[langue].h1}</h1>
              <p>{texteQuiz[langue].p1}</p>
              <p>{texteQuiz[langue].p2}</p>
              <button className='bouton' onClick={prochaineQuestion}>{texteQuiz[langue].bouton}</button>
          </section>
        )}
      </div>
    )
  }

  return (
    <main className="Quiz">
      {numQuestion !== 0 && quizTermine == false ? (
        <div>
          <section className="quiz-controle">
            <button className='bouton-quiz' onClick={precedanteQuestion} ><KeyboardArrowLeftIcon style={{color: "var(--couleur-principale)"}}/></button>
            <div>
              {numQuestion}/{nbQuestion}
              <div className='progression'>
                <span style={numQuestion >= 1 ? {backgroundColor: "var(--couleur-accent)"} : {backgroundColor: "lightgray"}}></span>
                <span style={numQuestion >= 2 ? {backgroundColor: "var(--couleur-accent)"} : {backgroundColor: "lightgray"}}></span>
                <span style={numQuestion >= 3 ? {backgroundColor: "var(--couleur-accent)"} : {backgroundColor: "lightgray"}}></span>
                <span style={numQuestion >= 4 ? {backgroundColor: "var(--couleur-accent)"} : {backgroundColor: "lightgray"}}></span>
                <span style={numQuestion >= 5 ? {backgroundColor: "var(--couleur-accent)"} : {backgroundColor: "lightgray"}}></span>
              </div>
            </div>
            <button className='bouton-quiz' onClick={rejouerQuiz} ><CloseIcon style={{color: "var(--couleur-principale)"}}/></button>

          </section>
          <section className='zone-reponse'>
              <h1>{numQuestion}. {texteQuiz[langue][`question${numQuestion}`]?.question}</h1>
            {Object.values(lesReponses).map((reponse, index) => (
                <div key={index} className="elm-reponse" onClick={() => prochaineQuestion(reponse.type)} 
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    prochaineQuestion(reponse.type);
                  }
                }}
                >
                {reponse.texte} <KeyboardArrowRightIcon style={{color: "var(--couleur-accent)"}}/>
                </div>
            ))}
          </section>
        </div>
      ) : <QuizInfos quizTermine={quizTermine} prochaineQuestion={prochaineQuestion} />
      }
    </main>
  );
}