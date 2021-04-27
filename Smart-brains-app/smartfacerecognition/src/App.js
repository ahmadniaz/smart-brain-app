import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo  from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';  
import 'tachyons';
import './App.css';

const particlesType ={
 "particles": {
          "number": {
              "value": 50
          },
          "size": {
              "value": 10
          }
      }
}

const initialState= {
        input:'',
        imageUrl:'',
        box:{}, 
        route:'SignIn',
        isSignedIn: false,
        user:{
          name:'',
      id:'',
      email:'',
      entries:0
        }
      }
class  App extends Component{
 constructor(){

    super();
      this.state= initialState;
  }

calculateFaceLocation=(data)=>{
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image=document.getElementById('inputimage');
   const width= Number(image.width);
   const height=Number(image.height);
   return{
    leftCol:clarifaiFace.left_col* width,
    topRow: clarifaiFace.top_row * height,
    rightCol:width - (clarifaiFace.right_col * width),
     bottomRow:height - (clarifaiFace.bottom_row * height)
    }
  }

onInputChange=(event)=>
  {
    this.setState({input:event.target.value});
 }


onButtonSubmit=()=>{
                this.setState({imageUrl:this.state.input});
                fetch('http://localhost:4000/imageUrl', {
                  method:'post',
                  headers:{'content-type': 'application/json'},
                  body:JSON.stringify({
                  input:this.state.input
            })
          })
                 .then(response=>response.json())
                 .then(response=>{
                 if (response) {
                fetch('http://localhost:4000/image', {
                 method:'put',
                headers:{'content-type': 'application/json'},
                body:JSON.stringify({
                id:this.state.user.id
                  })
                }).then(response=>response.json())
                .then(count=>{
                  this.setState(Object.assign(this.state.user, {entries:count}))
          })
                .catch(console.log)
        }
        this.displayFacebox(this.calculateFaceLocation(response))
      })
      .catch(err=>console.log(err));
}


displayFacebox=(box)=>{
    
    this.setState({box: box});
  }
   
  onRouteChange=(route)=>{

    if(route==='signout')
    {
      this.setState(initialState)
    }
      else if(route==='home')
      {
        this.setState({isSignedIn:true})
      }
    
    this.setState({route:route});
  }

loadUser=(data)=>{
      this.setState({user:{
        name:data.name,
      id:data.id,
      email:data.email,
      entries:data.entries 
      }})

  }

render(){
  const {imageUrl, box, route, isSignedIn}=this.state;
   return (
      
    <div className="App">
    <Particles className='particles'
    params={particlesType}
     />
     <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
    { route === 'home'
      ? <div>
           <Logo/>
           <Rank 
           entries={this.state.user.entries} 
           name={this.state.user.name}
           />
           <ImageLinkForm 
           onInputChange={this.onInputChange}
           onButtonSubmit={this.onButtonSubmit}
           />
          <FaceRecognition
           imageUrl={imageUrl}
           box={box}
           />
           </div>
           :
           (route=== 'SignIn'
            ? 
            <SignIn
             loadUser={this.loadUser}
             onRouteChange={this.onRouteChange}/>
            :
            <Register 
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}/>
            )
          }
     </div>
  );
}
}
export default App;
