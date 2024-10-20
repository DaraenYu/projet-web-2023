import "../Sass/Formation_Specifique.scss";

import { useEffect, useState } from "react";
import MenuFiltre from "./MenuFiltre.jsx";
import { texteCours } from "../code/textes.js";
import imgGrilleCours from "../medias/Images/statique/grille_de_cours.webp";
import imgHeroCours from "../medias/Images/statique/cours_img_hero.webp";

// Icons MUI
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown.js";
import OpenInNewIcon from "@mui/icons-material/OpenInNew.js";
import CloseIcon from "@mui/icons-material/Close.js";

import { Reveal } from "./RevealAnim.jsx";

export default function Formation_Specifique({ posts, langue }) {
  const [isContentVisible, setIsContentVisible] = useState(false);

  /** Méthode pour faire des sautes de ligne entre paragraphe */
  const renderHTML = (content) => {
    return { __html: content.replace(/\n/g, "<br />") };
  };

  /**Variable pour ouvrir l'image sur la page Cours */
  const [ouvrirModal, setOuvrirModal] = useState(false);

  const ouvrirImage = () => {
    setOuvrirModal(true);
  };

  const fermerImage = () => {
    setOuvrirModal(false);
  };

  const gererFermerImage = (e) => {
    if (e.target.classList.contains("lightbox-modal")) {
      fermerImage();
    }
  };

  /**Variable pour filtrage des cours  */
  const [filtre, setFiltre] = useState(() => {
    const filtreSauvegarde = localStorage.getItem("filtre-cours-tim-2023");

    if (
      filtreSauvegarde === "cours_session" ||
      filtreSauvegarde === "cours_type"
    ) {
      return filtreSauvegarde;
    } else {
      return "cours_session";
    }
  });

  const [valeur, setValeur] = useState(1);

  const [postContentVisibility, setPostContentVisibility] = useState({});

  const toggleContentVisibility = (postId) => {
    setIsContentVisible(!isContentVisible);
    setPostContentVisibility((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  useEffect(() => {
    if (filtre == "cours_session") setValeur(1);
    else if (filtre == "cours_type") setValeur("Tous");
  }, [filtre]);

  // const filtrePosts = (valeur == "Tous") ? posts.filter(post => post.acf[filtre]) : posts.filter(post => post.acf[filtre] == valeur);
  // const filtrePosts = posts.filter(post => post.acf.cours_formation === "General");

  const [typeCours, setTypeCours] = useState("Tous");

  const filtrePosts = posts.filter((post) => {
    if (typeCours === "Tous") {
      return valeur == "Tous"
        ? post.acf.cours_type
        : post.acf.cours_type === valeur || post.acf.cours_session == valeur;
    } else if (typeCours === "General") {
      return (
        post.acf.cours_formation === "General" &&
        post.acf.cours_session == valeur
      );
    } else if (typeCours === "Specifique") {
      return valeur == "Tous"
        ? post.acf.cours_formation === "Specifique"
        : post.acf.cours_formation === "Specifique" &&
            (post.acf.cours_type === valeur ||
              post.acf.cours_session == valeur);
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("filtre-cours-tim-2023", filtre);
  }, [filtre]);

  function ChangementFiltre(filtre) {
    setFiltre(filtre);
  }

  function ChangementValeur(valeur) {
    setValeur(valeur);
  }

  const boutonsFiltre = {
    session: ["1", "2", "3", "4", "5", "6"],

    type: [
      "Tous",
      "Jeux",
      "Web",
      "Création",
      "Conception",
      "Domaine Professionnel",
    ],
  };

  /** Ajouter un toggle class active sur les tabs de cours */
  const [tabActive, setTabActive] = useState(1);

  const handleTabClick = (tabIndex) => {
    if (tabIndex === 1) {
      setTypeCours("Tous");
    } else if (tabIndex === 2) {
      setTypeCours("Specifique");
    } else if (tabIndex === 3) {
      setTypeCours("General");
    }
    setTabActive(tabIndex);
  };

  /** Variable pour nombre de posts */
  const n = filtrePosts.length;

  return (
    <main className="Formation_Specifique">
      <section className="cours-section1">
        <div className="cours-section1-hero">
          <div className="titreCours">
            <Reveal>
              <h2>{texteCours[langue].section1.titre1}</h2>
            </Reveal>
            <Reveal style={{ transitionDelay: "0.2s" }}>
              <h1>
                {texteCours[langue].section1.titre2}{" "}
                <span className="titre-bg">
                  {texteCours[langue].section1.span}
                </span>
              </h1>
            </Reveal>
          </div>
          <div className="imageCours">
            <Reveal style={{ transitionDelay: "0.3s" }}>
              <img
                src={imgHeroCours}
                alt="Image de Tim maisonneuve facebook BienveTIM"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="cours-section2-tabs">
        {/* Section des tabs pour chacun des formations de cours: Tout, Specifique ou General */}
        <div>
          <ul className="nav nav-tabs">
            <li
              className={`nav-items ${tabActive === 1 ? "active" : ""}`}
              onClick={() => {
                handleTabClick(1);
                ChangementFiltre("cours_session");
                ChangementValeur(1);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTabClick(1);
                  ChangementFiltre("cours_session");
                  ChangementValeur(1);
                }
              }}
              aria-label={
                langue === "fr"
                  ? "Cliquer ici pour voir tous les cours"
                  : "Click to see all courses"
              }
              tabindex="0"
              role="button"
              aria-expanded="true"
            >
              <strong>{texteCours[langue].section2.tab.tab1}</strong>
            </li>
            <li
              className={`nav-items ${tabActive === 2 ? "active" : ""}`}
              onClick={() => handleTabClick(2)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTabClick(2);
                  ChangementFiltre("cours_session");
                  ChangementValeur(1);
                }
              }}
              aria-label={
                langue === "fr"
                  ? "Cliquer ici pour voir les cours spécifiques"
                  : "Click to see specific courses"
              }
              tabindex="0"
              role="button"
              aria-expanded="true"
            >
              <strong>{texteCours[langue].section2.tab.tab2}</strong>
            </li>
            <li
              className={`nav-items ${tabActive === 3 ? "active" : ""}`}
              onClick={() => {
                handleTabClick(3);
                ChangementFiltre("cours_session");
                ChangementValeur(1);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTabClick(3);
                  ChangementFiltre("cours_session");
                  ChangementValeur(1);
                }
              }}
              aria-label={
                langue === "fr "
                  ? "Cliquer ici pour voir les cours généraux"
                  : "Click to see general courses"
              }
              tabindex="0"
              role="button"
              aria-expanded="true"
            >
              <strong>{texteCours[langue].section2.tab.tab3}</strong>
            </li>
          </ul>
        </div>
      </section>

      {/* Section des cours  */}
      <section className="cours-section2">
        <div className="filtrage-cours">
          <MenuFiltre
            ChangementFiltre={ChangementFiltre}
            ChangementValeur={ChangementValeur}
            categorie={"cours"}
            boutonsFiltre={
              tabActive === 3
                ? { session: boutonsFiltre.session }
                : boutonsFiltre
            }
            langue={langue}
          />
          {/* Nombre de résultats obtenus en chiffre */}
          <p>
            {texteCours[langue].section2.p1}: {n}
          </p>
        </div>

        {/* *****************Section des cours et filtrage********************************************* */}
        <section className="cours-accordeon-section">
          {filtrePosts

            .sort((a, b) => {
              const sessionA = a.acf.cours_session;
              const sessionB = b.acf.cours_session;

              if (sessionA !== sessionB) {
                return sessionA - sessionB;
              }

              const titreA = a.acf.titre && a.acf.titre[langue]; // Vérifiez si a.acf.titre est défini
              const titreB = b.acf.titre && b.acf.titre[langue]; // Vérifiez si b.acf.titre est défini

              const titreAVal = titreA || "Titre de cours indisponible";
              const titreBVal = titreB || "Titre de cours indisponible";
              return titreAVal.localeCompare(titreBVal);
            })

            .map((post) => (
              // Début du groupe accordéon
              <div
                tabindex="0"
                role="button"
                aria-expanded={isContentVisible}
                onClick={() => toggleContentVisibility(post.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    toggleContentVisibility(post.id);
                  }
                }}
                className="cours-accordeon-groupe"
                key={post.id}
                aria-label={
                  postContentVisibility[post.id]
                    ? langue === "fr"
                      ? `Cliquez pour fermer les informations sur ${
                          post.acf.titre && post.acf.titre[langue]
                            ? post.acf.titre[langue]
                            : "Titre de cours indisponible"
                        }`
                      : `Click to close information on ${
                          post.acf.titre && post.acf.titre[langue]
                            ? post.acf.titre[langue]
                            : "Course title unavailable"
                        }`
                    : langue === "fr"
                    ? `Cliquez pour plus d'info sur ${
                        post.acf.titre && post.acf.titre[langue]
                          ? post.acf.titre[langue]
                          : "Titre de cours indisponible"
                      }`
                    : `Click for more information on ${
                        post.acf.titre && post.acf.titre[langue]
                          ? post.acf.titre[langue]
                          : "Course title unavailable"
                      }`
                }
              >
                {/* Session et type de cours */}
                <div
                  style={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    columnGap: "1rem",
                  }}
                >
                  <p>Session {post.acf.cours_session}</p>
                  {langue == "fr" ? (
                    <p>Cours {post.acf.cours_type}</p>
                  ) : (
                    <p>{post.acf.cours_type} class</p>
                  )}
                </div>

                {/* Titre du cours et ses tags */}
                <div
                  className="cours-titre"
                  style={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    columnGap: "1rem",
                  }}
                >
                  {post.acf.cours_formation !== "General" && (
                    <h2>{post.acf.tag}</h2>
                  )}
                  <h2>
                    {post.acf.titre && post.acf.titre[langue] !== undefined
                      ? post.acf.titre[langue]
                      : "Titre de cours indisponible"}
                  </h2>

                  <KeyboardArrowDownIcon
                    className={`cours-fleche ${
                      postContentVisibility[post.id] ? "rotate" : ""
                    }`}
                    style={{
                      fontSize: "2rem",
                      color: "orange",
                      cursor: "pointer",
                    }}
                  />
                </div>

                {postContentVisibility[post.id] && (
                  <div
                    className="cours-info cours-info-animation"
                    style={{ paddingTop: "0.5rem" }}
                  >
                    <div
                      className="cours-ponderation"
                      style={{
                        display: "flex",
                        flexFlow: "row nowrap",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        columnGap: "1rem",
                        userSelect: "none",
                      }}
                    >
                      {langue == "fr" ? (
                        <div className="cours-info-unite">
                          {post.acf.cours_formation !== "General" && (
                            <p>Nombre d'unités: {post.acf.nb_unite}</p>
                          )}
                          {post.acf.cours_formation !== "General" && (
                            <p>Nombre d'heures: {post.acf.nb_heure}</p>
                          )}
                          <p>Pondération: {post.acf.ponderation}</p>
                        </div>
                      ) : (
                        <div className="cours-info-unite">
                          {post.acf.cours_formation !== "General" && (
                            <p>Nombre d'unités: {post.acf.nb_unite}</p>
                          )}
                          {post.acf.cours_formation !== "General" && (
                            <p>Nombre d'heures: {post.acf.nb_heure}</p>
                          )}
                          <p>Weighting: {post.acf.ponderation}</p>
                        </div>
                      )}
                    </div>
                    <p
                      style={{ userSelect: "none", textAlign: "justify" }}
                      dangerouslySetInnerHTML={renderHTML(
                        post.acf.contenu &&
                          post.acf.contenu[langue] !== undefined
                          ? post.acf.contenu[langue]
                          : "Contenu de cours indisponible"
                      )}
                    />
                  </div>
                )}
              </div>
              //Fin du groupe accordéon
            ))}
        </section>
      </section>

      {/* Section pour l'image du grille de cours TIM complet */}
      <section className="cours-section3">
        <p
          tabindex="0"
          role="button"
          onClick={ouvrirImage}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              ouvrirImage();
            }
          }}
        >
          {texteCours[langue].section3.p1}
          <OpenInNewIcon
            style={{ fontSize: "0.8rem", color: "orange", cursor: "pointer" }}
          />
        </p>

        {ouvrirModal && (
          <div className="lightbox-modal" onClick={gererFermerImage}>
            <div className="lightbox-content">
              <img
                className="lightbox-image"
                src={imgGrilleCours}
                alt="Cheminement du cours TIM complet"
              />
              <CloseIcon
                className="fermer-button"
                onClick={fermerImage}
                style={{ color: "orange" }}
                aria-label={
                  langue === "fr"
                    ? "Cliquer pour fermer l'image"
                    : "Click to close the image"
                }
                tabindex="0"
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fermerImage();
                  }
                }}
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
