import './App.css';
import Nav from "./Components/NavBar/NavBar";
import Main from "./Components/Main/Main/Main";
import Profile from "./Components/Profile/Profile";
import React from "react";
import End from "./Components/End/End";
import {Route, BrowserRouter} from "react-router-dom";
import Packs from "./Components/Packs/Packs";
import GalleryContainer from "./Components/Gallery/GalleryContainer";
import SupportContainer from "./Components/Support/SupportContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
const App = (props) => {
  return (
      <BrowserRouter>
          <div className='app-wrapper'>
              <HeaderContainer/>
              <Nav/>
              <div className='app-wrapper-content'>
                 <Route exact path='/' render={() => <Main /> } />
                 <Route path='/profile' component={Profile} />
                 <Route path='/packs' render={() => <Packs /> } />
                 <Route path='/gallery/:userId?' render={() => <GalleryContainer />}/>
                 <Route path='/Support' render={() => <SupportContainer/>}/>
              </div>
              <End/>
    </div>
      </BrowserRouter>
  );
}

export default App;
