import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from '../../../assets/home/01.jpeg';
import img2 from '../../../assets/home/02.jpg';
import img3 from '../../../assets/home/03.jpg';
import img4 from '../../../assets/home/04.jpg';
import img5 from '../../../assets/home/05.jpg';
import img6 from '../../../assets/home/06.jpg';

const Banner = () => {
    return (
        <section className=''>
            <Carousel className='flex flex-col justify-center items-center align-middle' showThumbs={false}>
                <div>
                    <img className='h-[800px]' src={img1} />
                </div>
                <div>
                    <img className='h-[800px]' src={img2} />
                </div>
                <div>
                    <img className='h-[800px]' src={img3} />
                </div>
                <div>
                    <img className='h-[800px]' src={img4} />
                </div>
                <div>
                    <img className='h-[800px]' src={img5} />
                </div>
                <div>
                    <img className='h-[800px]' src={img6} />
                </div>
            </Carousel>
        </section>
    );
};

export default Banner;
