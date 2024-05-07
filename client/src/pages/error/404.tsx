import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleBacktoHome = () => {
        navigate('/');
    };

    return (
        <div className='container-404'>
        <div className="cloud-content">
        <div className="cloud-1 cloud-block">
          <div className="cloud"></div>
        </div>
        <div className="cloud-2 cloud-block">
          <div className="cloud"></div>
        </div>
        <div className="cloud-3 cloud-block">
          <div className="cloud"></div>
        </div>
        <div className="cloud-4 cloud-block">
          <div className="cloud"></div>
        </div>
        <div className="cloud-5 cloud-block">
          <div className="cloud"></div>
        </div>
        <div className="cloud-6 cloud-block">
          <div className="cloud"></div>
        </div>
        <div className="cloud-7 cloud-block">
          <div className="cloud"></div>
        </div>
      </div>
      <div className="sunlight-content">
        <div className="sun">
          <div className="sun-face">
            <div className="eyes-block">
              <span className="eyes left-eye"></span>
              <span className="eyes right-eye"></span>
            </div>
            <div className="mouth">
              <span className="tongue"></span>
            </div>
          </div>
          <span className="box"></span>
        </div>
        <div className="sunlight-box">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="error-404">404</div>  
        <button onClick={handleBacktoHome} className="home-button z-50">Back to Home <i className="fa-solid fa-arrow-left"></i></button> 
      </div>
    );
};

export default NotFoundPage;