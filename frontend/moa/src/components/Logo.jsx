import React from 'react';
import Logo2 from '../assets/Logo/MoaLogo.png';

const logoStyle = {
    width: '50%',
};

function Logo(props) {
  return (
    <div>
        <img src={Logo2} alt="main logo" style={{ width: '20%', marginTop: '10%' }}/>
    </div>
  );
}



export default Logo;