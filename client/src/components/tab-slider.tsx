import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';


  
const TabSlider = () => {
  return (
    <div className="ma-title">
      <div className="tabslider-tabs tabslider-tabs-gird">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="swiper-container fhs-tabs tabs tabs-gia-noi-bat tabs-gia-noi-bat-516014 tab_categorys girdslider-header-menu-aaa swiper-container-horizontal"
        >
        <SwiperSlide className="swiper-slide fhs-tabs-item-li swiper-slide-active active" data-tab="manga">
            Manga
        </SwiperSlide>
        <SwiperSlide className="swiper-slide fhs-tabs-item-li swiper-slide-next" data-tab="ln">
            Light Novel
        </SwiperSlide>
        </Swiper>
            </div>
            </div>
        );
};

export default TabSlider;
