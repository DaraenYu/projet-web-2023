import '../Sass/RevealAnim.scss';
import { useEffect, useRef, useState } from "react";


export const Reveal = ({ children, style  }) => {
    const revealRef = useRef(null);

    useEffect(() => {
        const textReveal = revealRef.current;
    
        if (!textReveal) {
          return; 
        }
    
        const handleIntersection = (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              textReveal.classList.add('animate');
            }
          });
        };
    
        const observer = new IntersectionObserver(handleIntersection, {
          threshold: 0.5, 
        });
    
        observer.observe(textReveal);
    
      
        return () => {
          observer.disconnect();
        };
      }, []);


    return (
        <div className='Reveal'>
            <div className='obj-reveal'  ref={revealRef} style={style}>
                {children}
            </div>
        </div>
    );
}