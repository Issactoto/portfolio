import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Cert from './components/cert';
import Landing from './components/landing';
import Header from './components/header';
import Footer from './components/footer'; 

function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
        <div className="Main">
        
            <Switch>
              <Route path="/cert">
                <Cert id ={0} />
              </Route>
              <Route path="/badge">
                <Cert id={1}/>
              </Route>
              <Route path="/">
                <Landing />
              </Route>
            </Switch> `
          
        </div>
        <Footer/> 
        </Router> 
    </div>
  );
}

export default App;
