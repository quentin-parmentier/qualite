import Navigation from "./Navigation/NavigationBar";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import routes from './Navigation/routes'

function App() {
  return (
    <div className="App">
      <Router>
        <div className=" grid grid-rows-maxcontent min-h-screen">
          <Navigation /> 
          <div className=" px-2 xs:px-5">
            <Switch>
              {routes.map((route,index) => 
                <Route 
                  key={index} 
                  path={route.path} 
                  exact={route.exact} 
                  component={route.component} 
                />
              )}
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
