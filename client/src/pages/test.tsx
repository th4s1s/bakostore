import React, { useEffect, useState } from 'react';

const TestComponent: React.FC = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/test.php')
      .then(response => {
        setStatus(response.status);
        return response.json();
      })
      .then(data => setData(data));
  }, []);

  return (
<div className="ma-title">
                    <div className="tabslider-tabs tabslider-tabs-gird">
                        <ul className="swiper-container fhs-tabs tabs tabs-gia-noi-bat tabs-gia-noi-bat-516014 tab_categorys girdslider-header-menu-aaa swiper-container-horizontal">
                            <div class="swiper-wrapper ts-header" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
                                                                        <li className="swiper-slide fhs-tabs-item-li swiper-slide-active active" rel="deal">
                                                                                            Xu Hướng Theo Ngày                                              
                                        </li>
                                                                                <li className="swiper-slide fhs-tabs-item-li swiper-slide-next" rel="km">
                                                                                            Sách HOT - Giảm Sốc                                                
                                        </li>                                          
                                                                    </div>
                        <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></ul>
                    </div>
                </div>
);
};

export default TestComponent;