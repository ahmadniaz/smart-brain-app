import React from 'react';

const Navigation=({onRouteChange, isSignedIn})=>{

	if (isSignedIn) {

		return (
		<nav style={{display:'flex', justifyContent:'flex-end'}}>
			<p onClick={()=>onRouteChange('signout')} className= 'f3 link dim underline black pa3 pointer'> Sign Out</p>	
		</nav>
	);
	} 
	 else{
		return (
		<nav style={{display:'flex', justifyContent:'flex-end'}}>
			<p onClick={()=>onRouteChange('SignIn')} className= 'f3 link dim underline black pa3 pointer'> Sign In</p>
			<p onClick={()=>onRouteChange('Regsiter')} className= 'f3 link dim underline black pa3 pointer'> Regsiter</p>
			
		</nav>
	);
	}
}

export default Navigation;