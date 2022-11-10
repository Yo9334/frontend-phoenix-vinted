import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";

function App() {
  const url = "https://lereacteur-vinted-api.herokuapp.com/";

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home url={url} />} />
          <Route path="/offer/:id" element={<Offer url={url} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
