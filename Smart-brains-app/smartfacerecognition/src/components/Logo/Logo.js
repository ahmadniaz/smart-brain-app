import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo=()=>{
	return (
            <div className='ma3 mt0'>
            <Tilt className="Tilt br3 shadow-2" options={{ max : 65 }} style={{ height: 150, width: 150 }} >
              <div className="Tilt-inner pa3"> 
                <img style={{paddingTop:'5px'}} alt='Logo' src={ brain }/>
              </div>
            </Tilt>

            	
            </div>
 
		);
}

export default Logo;