import { Route } from "react-router";
import Nav from './Components/Nav';
import LandingPage from "./Components/LandingPage";
import HomePage from "./Components/HomePage";
import DetailPage from "./Components/DetailPage";
import SearchPage from "./Components/SearchPage";
import AddActivity from "./Components/AddActivity";
import About from "./Components/About";


import './App.css';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Route exact path = '/'><LandingPage/></Route>
      <Route exact path = '/home/:page'><HomePage/></Route>
      <Route exact path = '/country/:id'><DetailPage/></Route>
      <Route exact path = '/search'><SearchPage/></Route>
      <Route exact path = '/add'><AddActivity/></Route>
      <Route exact path = '/about'><About/></Route>
    </div>
  );
}

export default App;
