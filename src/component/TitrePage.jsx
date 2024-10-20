import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TitrePage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    let titre = 'TIM Maisonneuve';
    let nouveauTitre = "";

    switch (path) {
      case '/':
        nouveauTitre = titre + " | " + 'Accueil';
        break;
      case '/accueil':
        nouveauTitre = titre + " | " + 'Accueil';
        break;
      case '/grille-de-cours':
        nouveauTitre = titre + " | " + 'Cours';
        break;
      case '/projets-etudiants':
        nouveauTitre = titre + " | " + 'Projets Étudiants';
        break;
      case '/enseignants':
        nouveauTitre = titre + " | " + 'Enseignants';
        break;
      case '/activites':
        nouveauTitre = titre + " | " + 'Activités';
        break;
      case '/futur':
        nouveauTitre = titre + " | " + 'Futur';
        break;
      case '/quiz':
        nouveauTitre = titre + " | " + 'Quiz';
        break;
      default:
        nouveauTitre = titre + " | " + 'Erreur 404';
        break;
    }

    document.title = nouveauTitre;
  }, [location]);

  return null;
}