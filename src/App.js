import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PublicNavBar from "./component/PublicNavBar";
// import PaginationBar from "./component/PaginationBar";
import NowPlayingPage from "./pages/NowPlayingPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <PublicNavBar />

        <Switch>
          <Route exact path="/" component={NowPlayingPage} />
          <Route exact path="/movie/:id" component={MovieDetailPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
