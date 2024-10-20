import { useState } from 'react';
import '../Sass/MenuFiltre.scss'

import { texteFiltre } from "../code/textes";

const BoutonPerso = ({ item, isSelected, onClick }) => (
  <button
    className={`bouton element-filtre ${isSelected ? 'selected' : ''}`}
    onClick={() => onClick(item)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        onClick(item);
      }
    }}
  >
    {item}
  </button>
);

export default function MenuFiltre({ChangementFiltre, ChangementValeur, categorie, boutonsFiltre, langue}) {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [menuOuvert, setMenuOuvert] = useState(null);
  const [lastItem, setLastItem] = useState(null);

  const handleFilterClick = (filtre, item) => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      [filtre]: item,
    }));
    ChangementValeur(item);
  };

  return (
    <div className='MenuFiltre'>
      {Object.keys(boutonsFiltre).map((filtre, indexFiltre) => (
        <div className='filtre-individuel' key={indexFiltre}>
          <label htmlFor={`select-${filtre}`}>
            <strong>
              {filtre === 'session'
                ? texteFiltre[langue].session
                : categorie === 'projets'
                  ? texteFiltre[langue].typeProjet
                  : texteFiltre[langue].typeCours}
            </strong>
          </label>
          <div tabindex="0" role="button" aria-expanded={menuOuvert === indexFiltre} onClick={() => menuOuvert == indexFiltre ? setMenuOuvert(null) : setMenuOuvert(indexFiltre)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              menuOuvert === indexFiltre ? setMenuOuvert(null) : setMenuOuvert(indexFiltre);
            }
          }}
          className='boutons-Selection' 
          aria-label={langue === 'fr' 
          ? "Cliquer pour ouvrir le filtre et sélectionner les options suivant : " 
          : "Click to open the filter and select the following options: "}
          >
            <p className='filtre-selection'>{boutonsFiltre[filtre].includes(lastItem) ? lastItem : !lastItem ? "Tous" : "Choisir"}</p>
            {menuOuvert == indexFiltre
            ? <div className="boutons-filtre">
                {boutonsFiltre[filtre].map((item, indexItem) => (
                  <BoutonPerso
                    key={indexItem}
                    item={item}
                    isSelected={selectedFilters[filtre] === item}
                    onClick={() => {handleFilterClick(filtre, item); setLastItem(item); setMenuOuvert(null)}}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleFilterClick(filtre, item);
                        setLastItem(item);
                        setMenuOuvert(null);
                      }
                    }}
                  />
                ))}
              </div>
            : null
            }
            {menuOuvert == indexFiltre
            ? <div style={{position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh", zIndex: "9999"}} onClick={() => setMenuOuvert(null)}></div>
            : null
            }
          </div>
        </div>
      ))}
    </div>
  );
}