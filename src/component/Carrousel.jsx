import '../Sass/Carrousel.scss';
import { carrouselData } from '../code/carrousel'

export default function Carrousel() {
  return (
    <div className='Carrousel'>
      <div className='container'>
        <div className='slider1'>
          <div className='img-container'>
            {Object.keys(carrouselData).map((tech, index) => (
            <img key={index} src={carrouselData[tech]} alt={tech} />
            ))}
          </div>
          <div className='img-container'>
            {Object.keys(carrouselData).map((tech, index) => (
            <img key={index} src={carrouselData[tech]} alt={tech} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}