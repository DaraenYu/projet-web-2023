import '../Sass/TechnoIcons.scss';
import { useEffect } from 'react';
import { texteAccueil } from '../code/textes';
import { technoData, technoData2 } from '../code/icons'




export default function TechnoIcons({langue}) {


    return (
        <div className='TechnoIcons'>
            <div className='techno-container'>
              <h1><span className="titre-bg">{texteAccueil[langue].sectionTechno.span}</span> {texteAccueil[langue].sectionTechno.titre} </h1>
              <div className='slider1'>
                <div className='img-container-1'>
                      {Object.keys(technoData).map((tech, index) => (
                      <img key={index} src={technoData[tech]} alt={tech} />
                      ))}
                </div>
                  <div className='img-container-1'>
                    {Object.keys(technoData).map((tech, index) => (
                    <img key={index} src={technoData[tech]} alt={tech} />
                    ))}
                  </div>  
              </div>

              <div className='slider2'>
                <div className='img-container-2'>
                      {Object.keys(technoData2).map((tech, index) => (
                      <img key={index} src={technoData2[tech]} alt={tech} />
                      ))}
                </div>
                  <div className='img-container-2'>
                    {Object.keys(technoData2).map((tech, index) => (
                    <img key={index} src={technoData2[tech]} alt={tech} />
                    ))}
                  </div>  
              </div>
            </div>
        </div>
    );
}