import '../Sass/Page_404.scss'

import { texteAccueil, texteErreur } from '../code/textes';
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Page_404({langue}) {
  return (
    <main className='Page_404'>
      <h1>{texteErreur[langue].titre1}</h1>
      <h3>{texteErreur[langue].message1}</h3>
      {/* SECTION - NAV */}
      <section className="zone-nav404">
        <h1>{texteAccueil[langue].section5.titre} <span className="titre-bg">{texteAccueil[langue].section5.span}</span>&nbsp;!</h1>
        <div className="nav404">
          <Link to="/accueil"><a className="bouton">{texteAccueil[langue].section5.bouton.accueil}<KeyboardArrowRightIcon style={{color: "var(--couleur-accent)"}}/></a></Link>
          <Link to="/grille-de-cours"><a className='bouton'>{texteAccueil[langue].section5.bouton.cours} <KeyboardArrowRightIcon style={{color: "var(--couleur-accent)"}}/></a></Link>
          <Link to="/projets-etudiants"><a className='bouton'>{texteAccueil[langue].section5.bouton.projets} <KeyboardArrowRightIcon style={{color: "var(--couleur-accent)"}}/></a></Link>
          <Link to="/activites"><a className='bouton'>{texteAccueil[langue].section5.bouton.activite} <KeyboardArrowRightIcon style={{color: "var(--couleur-accent)"}}/></a></Link>
          <Link to="/futur"><a className='bouton'>{texteAccueil[langue].section5.bouton.futur} <KeyboardArrowRightIcon style={{color: "var(--couleur-accent)"}}/></a></Link>
          <Link to="/quiz"><a className='bouton'>Quiz <KeyboardArrowRightIcon style={{color: "var(--couleur-accent)"}}/></a></Link>
        </div>
      </section>
    </main>
  );
}