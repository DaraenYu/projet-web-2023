// Url de l'API
export const apiUrl = 'https://gftnth00.mywhc.ca/tim01/wp-json/wp/v2/posts/?per_page=100';

// Code HTML pour les snippets d'affichage de la page d'accueil - Interchangeable avec un bouton
export const htmlModelVide = "";
export const htmlModel = {
  fr:
  `<div>
    <h3 class="animer-texte">TIM</h3>
  </div>

  <div>
    <h1>Bienvenue sur le site du TIM !</h1>
    <p>Ceci est un exemple de paragraphe dans une page HTML. Essayez de changer sa couleur en choississant l'onglet CSS ! Changer la couleur du sélecteur h1 pour color: red. La couleur peut être également blue (bleu), yellow (jaune), orange, etc.</p>
  </div>`,
  
  en:
  `<div>
    <h3 class="animer-texte">TIM</h3>
  </div>

  <div>
    <h1>Welcome to the TIM website!</h1>
    <p>This is an example of a paragraph on an HTML page. Try changing its color by selecting the CSS tab! Change the color of the h1 selector to color: red. The color can also be blue, yellow, orange, etc.</p>
  </div>`
}

// Code CSS pour les snippets d'affichage de la page d'accueil - Interchangeable avec un bouton
export const cssModelVide = "";
export const cssModel = 
`
.animer-texte
{
   text-transform: uppercase;
  background-image: linear-gradient(
    -225deg,
    #003265 0%,
    #680fb0 29%,
    #f51f5a 67%,
    #ff7b00 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear infinite;
  display: inline-block;
  font-size: 5rem;
  margin: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  padding: 0.5rem;
}

h1 {
  color: #ff7b00;
}

p {
  font-size: 16px;
  line-height: 1.5;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}

.roue {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #003265;
  border-right: 16px solid #680fb0;
  border-bottom: 16px solid #f51f5a;
  border-left: 16px solid #ff7b00;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;