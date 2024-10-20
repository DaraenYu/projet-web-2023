import { useEffect, useState } from 'react';
import '../Sass/Activites.scss'
import activitesImage1Section1 from "../medias/Images/statique/arcade-groupe-photo.webp"
import activitesImage2Section1 from "../medias/Images/statique/gamejam-valleyfield.webp"

import { texteActivites } from "../code/textes";
import { Reveal } from './RevealAnim';

export default function Activites({posts, langue, toggleAside, setToggleAside}) {
  const [valeur, setValeur] = useState("Tous");
  const [unPostInfo, setUnPostInfo] = useState(null);
  const choixPost = (post) => {
    setUnPostInfo(post);
  };
  useEffect(() => {
    if(valeur != "Tous") {
      setValeur(valeur);
    }
    else {
      setValeur();
    }
  }, [valeur])
  useEffect(() => {
    setValeur("Tous");
  }, []);
  const filtrePosts = (valeur == "Tous") ? posts.filter(post => post.acf.activites_type) : posts.filter(post => post.acf.activites_type == valeur);

  const uneActivite = () => {
    if(unPostInfo) {
      return(
        <div className='aside' key={unPostInfo.id}>
          <h2>{unPostInfo.acf.titre[langue] ? unPostInfo.acf.titre[langue] : "Titre d'activité indisponible"}</h2>
          {unPostInfo.acf.lien
            ? <a target='_blank' href={unPostInfo.acf.lien}>{unPostInfo.acf.lien}</a>
            : null
          }
          <div className='contenu-aside'>
            {Object.values(unPostInfo.acf.contenu[langue])
              .filter(contenu => contenu !== undefined && contenu !== null && contenu.trim() !== '')
              .map((contenu, index) => (
                <p key={index}>{contenu}</p>
            ))}
          </div>
          {unPostInfo.acf.annee ?
            <div className='annee-aside'>
              <h3>Année de l'activité: </h3>
              <span>{unPostInfo.acf.annee}</span>
            </div>
            :
            ""
          }
          <section className='conteneur-image-aside'>
            {Object.values(unPostInfo.acf.images).map((image, index) => (
              image
              ? <div key={index} className='image-aside' style={{ backgroundImage: `url(${image})` }}></div>
              : ""
            ))}
          </section>
      </div>
      )
    }
    return null;
  };

  const lesActivites = (post) => (
    <div className='activites-individuelles' onClick={() => {setToggleAside(true); choixPost(post)}} key={post.id}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        setToggleAside(true); choixPost(post);
      }
    }}
    aria-label={
      langue === 'fr'
        ? `Cliquez pour avoir plus d'information sur le projet ${post.acf.titre[langue]}`
        : `Click to get more information about the project ${post.acf.titre[langue]}`
    }
    >
    <div className='activites-infos'>
      <h1>{post.acf.titre[langue] ? post.acf.titre[langue] : null}</h1>
      <p>{post.acf.annee ? post.acf.annee : null}</p>
      <p>{post.acf.activites_type ? "#" + post.acf.activites_type : null}</p>
    </div>
    {post.acf.images.imga
      ? <div className='activites-image' style={{backgroundImage: `url(${post.acf.images.imga})`}}></div>
      : null
    }
  </div>
  );

  return (
    <main className='Activites'>
      <h2 className='activites-h2-mobile'>{texteActivites[langue].section1.h1}</h2>
      <section className="activites-section1">
      <div className="activites-texts">
        <Reveal>
          <h2 className='activites-h2-bureau'>{texteActivites[langue].section1.h1}</h2>
        </Reveal>
        <Reveal style={{transitionDelay:'0.15s'}}>
          <h1> <span className='titre-bg'>{texteActivites[langue].section1.span}</span> {texteActivites[langue].section1.h2}</h1>
        </Reveal>
      </div>

        <div className="activites-img-section1">
          <img className='image1' src={activitesImage1Section1} alt="Image d'évènement de l'arcade 2023" />
          <img className='image2' src={activitesImage2Section1} alt="image d'un concours de jeux GameJam " />
        </div>

      </section>

      <div>
        <div className={toggleAside ? "aside-anim-opacity" : ""} style={{pointerEvents: toggleAside ? "all" : "none" }} onClick={() => {setToggleAside(false); choixPost(null)}}></div>
        <div className={toggleAside ? "aside-anim-fill" : ""}>
          {toggleAside ? <button className='bouton' onClick={() => {setToggleAside(false); choixPost(null)}}>Fermer</button> : ""}
          {uneActivite()}
        </div>
      </div>
      
      <h2 className='programme-activites'>{texteActivites[langue].section2.h2}</h2>
      <section className="conteneur-activites">
        {filtrePosts.map(lesActivites)}
      </section>
    </main>
  );
}