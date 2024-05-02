import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomePageCarousel = () => {
    return (
        <Carousel autoPlay infiniteLoop>
            <div>
                <img src="book1.jpg" alt="Book 1"/>
                <p className="legend">Book 1</p>
            </div>
            <div>
                <img src="book2.jpg" alt="Book 2"/>
                <p className="legend">Book 2</p>
            </div>
            <div>
                <img src="book3.jpg" alt="Book 3"/>
                <p className="legend">Book 3</p>
            </div>
        </Carousel>
    );
};

export default HomePageCarousel;