import '../Sass/Futur.scss'

import { styled } from '@mui/material/styles';
import { texteFutur } from '../code/textes';
import imgHeroFutur from '../medias/Images/statique/img_futur_hero.webp'
import Grid from '@mui/material/Grid';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import LaunchIcon from '@mui/icons-material/Launch';

import { Reveal } from './RevealAnim';

export default function Futur({langue}) {

  // Variable pour le style de toutes les icônes de lien
  const LienIcone = styled(LaunchIcon) ({
    color: "var(--couleur-accent)"
  });

  // Variable pour le style de certaines grilles (grid)
  const Grille = styled(Grid)(({ theme }) => ({
    paddingTop: "2.15rem",
    paddingRight: "1.5rem",
    [theme.breakpoints.up('md')]: {
      paddingTop: "1.3rem"
    }
  }));

  return (
    <main className='Futur'>

      {/* Section 1 (Introduction) */}
      <div className="introduction">
        <div className="texte-futur">
          <Reveal>
            <h2>{texteFutur[langue].section1.titre1}</h2>
          </Reveal>
          <Reveal style={{transitionDelay:'0.15s'}}>
            <h1>{texteFutur[langue].section1.p1} <span className="titre-bg">{texteFutur[langue].section1.span1}</span>&nbsp;!</h1>
          </Reveal>
        </div>
        <div className="image-futur">
          <Reveal style={{transitionDelay: '0.35s'}}>
            <img src={imgHeroFutur} alt="Image d'un bureau"/>
          </Reveal>
        </div>
      </div>

      {/* Section 2 (Stage) */}
      <div className="stage">
        <div className="stage-fin-etudes">
          <h2>{texteFutur[langue].section2.titre1}</h2>
          <p>{texteFutur[langue].section2.p1}</p>
        </div>
        <span className="ligne-separation"></span>
        <div className="stage-ate">
          <h2>{texteFutur[langue].section2.titre2}</h2>
          <p>{texteFutur[langue].section2.p2}</p>
        </div>
      </div>

      {/* Section 3 (Emploi) */}
      <div className="emploi">
        <Grid container alignItems="center">
          <Grid item>
            <h2>{texteFutur[langue].section3.titre1} &nbsp;
            <WorkIcon style={{ color: 'var(--couleur-accent)', verticalAlign: "middle" }}/>
            </h2>
          </Grid>
        </Grid>
        <ul>
          <li>{texteFutur[langue].section3.li1}</li>
          <li>{texteFutur[langue].section3.li2}</li>
          <li>{texteFutur[langue].section3.li3}</li>
          <li>{texteFutur[langue].section3.li4}</li>
          <li>{texteFutur[langue].section3.li5}</li>
          <li>{texteFutur[langue].section3.li6}</li>
        </ul>
      </div>

      {/* Section 4 (Université) */}
      <div className="universite">
        <Grid container alignItems="center">
          <Grid item>
            <h2>{texteFutur[langue].section4.titre1} &nbsp;
            <SchoolIcon style={{ color: 'var(--couleur-accent)', verticalAlign: "middle" }}/>
            </h2>
          </Grid>
        </Grid>
        <Grid container style={{ borderTop: "2px solid var(--couleur-principale)" }}>
          <a href='https://etudier.uqam.ca/programme?code=6504' target='_blank'>{texteFutur[langue].section4.a1}</a>
          <Grid item style={{ paddingTop: "1.3rem", paddingRight: "1.5rem" }}>
            <LienIcone onClick={() => window.open('https://etudier.uqam.ca/programme?code=6504')}/>
          </Grid>
        </Grid>
        <Grid container style={{ borderTop: "2px solid var(--couleur-principale)" }}>
          <a href='https://www.etsmtl.ca/Etudes/Premier-cycle/Baccalaureat-genie-des-TI' target='_blank'>{texteFutur[langue].section4.a2}</a>
          <Grille>
            <LienIcone onClick={() => window.open('https://www.etsmtl.ca/Etudes/Premier-cycle/Baccalaureat-genie-des-TI')}/>
          </Grille>
        </Grid>
        <Grid container style={{ borderTop: "2px solid var(--couleur-principale)" }}>
          <a href='https://www.uqat.ca/etudes/creation-et-nouveaux-medias/dec-bac-en-creation-numerique-profil-creation-3d/' target='_blank'>{texteFutur[langue].section4.a3}</a>
          <Grille>
            <LienIcone onClick={() => window.open('https://www.uqat.ca/etudes/creation-et-nouveaux-medias/dec-bac-en-creation-numerique-profil-creation-3d/')}/>
          </Grille>
        </Grid>
        <Grid container style={{ borderTop: "2px solid var(--couleur-principale)" }}>
          <a href='https://www.uqat.ca/etudes/creation-et-nouveaux-medias/dec-bac-en-creation-numerique-profil-cinema/' target='_blank'>{texteFutur[langue].section4.a4}</a>
          <Grille>
            <LienIcone onClick={() => window.open('https://www.uqat.ca/etudes/creation-et-nouveaux-medias/dec-bac-en-creation-numerique-profil-cinema/')}/>
          </Grille>
        </Grid>
        <Grid container style={{ borderTop: "2px solid var(--couleur-principale)", borderBottom: "2px solid var(--couleur-principale)" }}>
          <a href='https://www.uqat.ca/etudes/creation-et-nouveaux-medias/dec-bac-en-creation-de-jeux-video-profil-integration/' target='_blank'>{texteFutur[langue].section4.a5}</a>
          <Grille>
            <LienIcone onClick={() => window.open('https://www.uqat.ca/etudes/creation-et-nouveaux-medias/dec-bac-en-creation-de-jeux-video-profil-integration/')}/>
          </Grille>
        </Grid>
      </div>

    </main>
  );
}