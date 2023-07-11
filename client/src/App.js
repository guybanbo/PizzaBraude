import logo from "./logo.svg";
import "./App.css";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Link, Switch, Routes } from "react-router-dom";
import Cartscreen from "./Screens/Cartscreen";
import HomeScreen from "./Screens/HomeScreen";
import Loginscreen from "./Screens/Loginscreen";
import Registerscreen from "./Screens/Registerscreen";
import Ordersscreen from "./Screens/Ordersscreen";

function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
      {/* Define routes for different screens */}
        <Routes>
          <Route path="/" exact Component={HomeScreen} />
          <Route path="/cart" exact Component={Cartscreen} />
          <Route path="/login" exact Component={Loginscreen} />
          <Route path="/register" exact Component={Registerscreen} />
          <Route path="/orders" exact Component={Ordersscreen} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
