import { useEffect } from 'react';
import Carousel from 'nuka-carousel';
import * as Style from './Slider.css';

export const Slider = () => {
  useEffect(() => {
    const list = document.getElementsByClassName('paging-item')!;
    for (let i = 0; i < list.length; i++) {
      list.item(i)!.setAttribute('style', 'margin: 1px 6px');
      list.item(i)!.children.item(0)!.classList.add(Style.button);
    }
    const dots = document.getElementsByClassName('paging-dot')!;
    for (let i = 0; i < dots.length; i++) {
      dots.item(i)!.classList.add(Style.dotSize);
    }
  });

  const defaultControlsConfig = {
    nextButtonStyle: {
      display: 'none',
    },
    prevButtonStyle: {
      display: 'none',
    },
  };

  return (
    <Carousel
      className={Style.slider}
      defaultControlsConfig={defaultControlsConfig}
      autoplay={true}
      wrapAround={true}
    >
      <img src="/images/first.jpg" className={Style.images} alt="" />
      <img src="/images/first.jpg" className={Style.images} alt="" />
      <img src="/images/first.jpg" className={Style.images} alt="" />
      <img src="/images/first.jpg" className={Style.images} alt="" />
      <img src="/images/first.jpg" className={Style.images} alt="" />
    </Carousel>
  );
};
