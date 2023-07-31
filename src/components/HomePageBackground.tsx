import React, { CSSProperties } from 'react';

interface HomePageBackgroundProps {
  imageUrl: string;
  children?: React.ReactNode;
}

const HomePageBackground: React.FC<HomePageBackgroundProps> = ({ imageUrl, children }) => {
    const backgroundStyle: React.CSSProperties = {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      position: 'absolute',
      top: 0, right: 0, bottom: 0, left: 0,
      zIndex: -1,
    };
  
    return (
      <div style={backgroundStyle}>
        {children}
      </div>
    );
  };
  

export default HomePageBackground;
