import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";

import Sidebar from "./components/Messages/Sidebar";

import Navigation from "./components/Navigation/Navigation";
import NotFound from "./components/NotFound/NotFound";
import Posts from "./components/Posts/Posts";
import Search from "./components/Search/Search";
import UserProfile from "./components/userProfile/userProfile.jsx";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navigation />
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/profile/:id" component={UserProfile} />
        <Route exact path="/search/:user" component={Search} />
        <Route exact path="/messages" component={Sidebar} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
export default App;
