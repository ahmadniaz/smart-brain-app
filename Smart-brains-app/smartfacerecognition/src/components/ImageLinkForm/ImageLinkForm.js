import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm=({onInputChange, onButtonSubmit})=>{
	return (
            <div>
            <p className='f3'> {'This is an App for detecting the face. Give it a try.'}</p>	
            <div className='center'>
            <div className='pa4 form center br3 shadow-5'>
            	<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
            	<button 
                  className='w-30 grow white f4 ph3 pv2 dib bg-light-purple link '
                  onClick={onButtonSubmit}>
                  DETECT</button>
            </div>
            </div>
            </div>
 
		);
}

export default ImageLinkForm;