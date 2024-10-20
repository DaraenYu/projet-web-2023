import "../Sass/Projets_Etudiants.scss";
import React, { useEffect, useState } from "react";
import MenuFiltre from "./MenuFiltre.jsx";
import { texteProjet } from "../code/textes.js";
import imgHeroProjets from "../medias/Images/statique/img_projet_hero.webp";
import { Reveal } from "./RevealAnim.jsx";

export default function Projets_Etudiants({
  posts,
  langue,
  toggleAside,
  setToggleAside,
}) {
  const [valeur, setValeur] = useState("Tous");

  const [unPostInfo, setUnPostInfo] = useState(null);

  const choixPost = (post) => {
    setUnPostInfo(post);
  };

  useEffect(() => {
    setValeur("Tous");
  }, []);

  const filtrePosts =
    valeur == "Tous"
      ? posts.filter((post) => post.acf.projets_type)
      : posts.filter((post) => post.acf.projets_type == valeur);

  function ChangementValeur(valeur) {
    setValeur(valeur);
  }

  const boutonsFiltre = {
    type: ["Tous", "Jeux", "Web", "Création", "Conception"],
  };

  const unProjet = () => {
    if (unPostInfo) {
      return (
        <div className="aside" key={unPostInfo.id}>
          <h2>
            {unPostInfo.acf.titre
              ? unPostInfo.acf.titre
              : "Titre de cours indisponible"}
          </h2>
          {unPostInfo.acf.lien ? (
            <a target="_blank" href={unPostInfo.acf.lien}>
              {unPostInfo.acf.lien}
            </a>
          ) : null}
          <div className="contenu-aside">
            {Object.values(unPostInfo.acf.contenu[langue])
              .filter(
                (contenu) =>
                  contenu !== undefined &&
                  contenu !== null &&
                  contenu.trim() !== ""
              )
              .map((contenu, index) => (
                <p key={index}>{contenu}</p>
              ))}
          </div>
          <div className="nom-aside">
            <h3>Réalisé par: </h3>
            {unPostInfo.acf.etudiant
              .split(", ")
              .filter((nom) => nom.trim() !== "")
              .map((nom, index) => (
                <span key={index}> {nom} </span>
              ))}
          </div>
          {unPostInfo.acf.annee ? (
            <div className="annee-aside">
              <h3>Année du projet: </h3>
              <span>{unPostInfo.acf.annee}</span>
            </div>
          ) : (
            ""
          )}
          <section className="conteneur-image-aside">
            {Object.values(unPostInfo.acf.images).map((image, index) =>
              image ? (
                <div
                  key={index}
                  className="image-aside"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
              ) : (
                ""
              )
            )}
          </section>
        </div>
      );
    } else {
      return null;
    }
  };

  const lesProjets = (post) => (
    <div
      className="projet-individuel"
      onClick={() => {
        setToggleAside(true);
        choixPost(post);
      }}
      key={post.id}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setToggleAside(true);
          choixPost(post);
        }
      }}
      aria-label={
        langue === "fr"
          ? `Cliquez pour avoir plus d'information sur le projet ${post.acf.titre}`
          : `Click to get more information about the project ${post.acf.titre}`
      }
    >
      <div className="projet-infos">
        <h1>{post.acf.titre ? post.acf.titre : null}</h1>
        <p>{post.acf.annee ? post.acf.annee : null}</p>
        <p>{post.acf.etudiant ? "Réalisé par: " + post.acf.etudiant : null}</p>
        <p>{post.acf.projets_type ? "#" + post.acf.projets_type : null}</p>
      </div>
      {post.acf.images.imga ? (
        <div
          className="projet-image"
          style={{ backgroundImage: `url(${post.acf.images.imga})` }}
        ></div>
      ) : null}
    </div>
  );

  return (
    <main className="Projets_Etudiants">
      <section className="projets-section1">
        <div className="projets-section1-texte">
          <Reveal>
            <h2>{texteProjet[langue].section1.titre1}</h2>
          </Reveal>
          <Reveal style={{ transitionDelay: "0.15s" }}>
            <h1>
              {texteProjet[langue].section1.titre2}{" "}
              <span className="titre-bg">
                {texteProjet[langue].section1.span1}
              </span>
            </h1>
          </Reveal>
          <Reveal style={{ transitionDelay: "0.25s" }}>
            <h1>{texteProjet[langue].section1.titre3}</h1>
          </Reveal>
        </div>
        <div className="projets-image">
          <Reveal style={{ transitionDelay: "0.35s" }}>
            <img src={imgHeroProjets} alt="Image d'un projet en cours" />
          </Reveal>
        </div>
      </section>

      <div>
        <div
          className={toggleAside ? "aside-anim-opacity" : ""}
          style={{ pointerEvents: toggleAside ? "all" : "none" }}
          onClick={() => {
            setToggleAside(false);
            choixPost(null);
          }}
        ></div>
        <div className={toggleAside ? "aside-anim-fill" : ""}>
          {toggleAside ? (
            <button
              className="bouton"
              onClick={() => {
                setToggleAside(false);
                choixPost(null);
              }}
              role="button"
              tabIndex={1}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setToggleAside(false);
                  choixPost(null);
                }
              }}
            >
              Fermer
            </button>
          ) : (
            ""
          )}
          {unProjet()}
        </div>
      </div>

      <section className="projets-section2">
        <MenuFiltre
          ChangementFiltre={null}
          ChangementValeur={ChangementValeur}
          categorie={"projets"}
          boutonsFiltre={boutonsFiltre}
          langue={langue}
        />
        <div className="conteneur-projets">{filtrePosts.map(lesProjets)}</div>
      </section>
    </main>
  );
}
