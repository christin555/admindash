import React, {useRef, useEffect} from 'react';
import CarouselView from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Carousel = ({images, width, className}) => {
  const carouselRef = useRef(null);
  const carouselBlockRef = useRef(null);

  const keyDownHandler = ({key}) => {
    const node = carouselRef.current;

    if (!node) {
      return;
    }

    switch (key) {
      case 'ArrowRight':
      case 'd':
        node.slideRight();
        break;
      case 'ArrowLeft':
      case 'a':
        node.slideLeft();
        break;
      case 'Enter':
        node.fullScreen();
        break;
      case 'Escape':
        node.exitFullScreen();
        break;
    }
  };

  useEffect(() => {
    const node = carouselBlockRef.current;

    if (node) {
      node.addEventListener('keydown', keyDownHandler);
    }

    return () => node.removeEventListener('keydown', keyDownHandler);
  }, []);

  return (
    <div ref={carouselBlockRef}>
      <CarouselView
        className={className}
        ref={carouselRef}
        autoPlay={true}
        items={images}
        width={width}
        slideDuration={600}
        slideInterval={5000}
      />
    </div>
  );
};

export default Carousel;
