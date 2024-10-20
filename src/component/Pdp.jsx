import '../Sass/Pdp.scss'
import { texteFooter } from '../code/textes';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Pdp({langue}) {

  return (
    <footer className='Pdp'>
      <section className='adresse'>
        <p>{texteFooter[langue].adresse1}<br />{texteFooter[langue].adresse2}</p>
      </section>
      <section className='joindre'>
        <p>{texteFooter[langue].joindre}</p>
        <a href="https://portes-ouvertes.cmaisonneuve.qc.ca/" target='_blank'>{texteFooter[langue].portes}</a>
        <a href="https://www.cmaisonneuve.qc.ca/visite-virtuelle/" target='_blank'>{texteFooter[langue].visite}</a>
        <a href="https://www.cmaisonneuve.qc.ca/accueil/pose-ta-question/" target='_blank'>{texteFooter[langue].questions}</a>
      </section>
      <section className='media'>
        <a href="https://www.facebook.com/maisonneuvetim" target='_blank' aria-label="Facebook"><FacebookIcon /></a>
        <a href="https://www.instagram.com/maisonneuvetim/?hl=fr" target='_blank' aria-label="Instagram"><InstagramIcon /></a>
        <a href="https://www.linkedin.com/in/tim-coll%C3%A8ge-de-maisonneuve-9407b7131" target='_blank' aria-label="Linkedin"><LinkedInIcon /></a>
      </section>
    </footer>
  );
}