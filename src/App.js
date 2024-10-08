import './App.css';
import Category from './Category';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';
import QuestionAnswer from './QuestionAnswer';
import Subcategory from './Subcategory';
import Drawerspage from './Drawerspage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Website from './Website';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/qa">
            <QuestionAnswer />
          </Route>
          <Route path="/subcategory">
            <Subcategory />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/category">
            <Category />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch> 
      </Router>

    </>
  );
}

export default App;
