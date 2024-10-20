import React from 'react';
import '../Sass/ScrollToTop.scss';
import { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



export const scrollUp = () => {
  document.querySelector("body").scrollTo({
    top: 0,
    behavior: "instant",
  });
};

export default function ScrollToTop () {
    /** Function pour le btn back to top */
  const [showBtnTop, setShowBtnTop] = useState(false);

  const bodyPage = document.querySelector("body");

  useEffect(() => {
    bodyPage.addEventListener("scroll", () => {
      const scrollPosition = bodyPage.scrollTop;
  
      if (scrollPosition > 250) {
        setShowBtnTop(true);
      } else {
        setShowBtnTop(false);
      }
    });
  }, []);

  const scrollUpSmooth = () => {
    bodyPage.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="ScrollToTop">
      {showBtnTop && (
        <button className='btnTop' onClick={scrollUpSmooth}>
          <KeyboardArrowUpIcon />
        </button>
      )}
    </div>
  );
}