import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import { useState } from "react";
import Cookies from "js-cookie";
import Signup from "./pages/Signup";
// import Modal from "./pages/Modal";

function App() {
  const url = "https://lereacteur-vinted-api.herokuapp.com/";

  const [token, setToken] = useState(Cookies.get("token") || 0);
  const [visible, setVisible] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);

  // Cette fonction permet de stocker le token dans le state
  // et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  //pas de connexion
  // Cookies.set("token", "1234", { expires: 7 });

  return (
    <div className="App">
      <Router>
        <Header
          userToken={token}
          handleToken={handleToken}
          visible={visible}
          setVisible={setVisible}
          visibleLogin={visibleLogin}
          setVisibleLogin={setVisibleLogin}
        />
        <Routes>
          <Route path="/" element={<Home url={url} />} />
          <Route path="/offer/:id" element={<Offer url={url} />} />
          {/*
          <Route
            path="/login"
            element={<Login url={url} handleToken={handleToken} />}
          />
          <Route
            path="/signup"
            element={<Signup url={url} handleToken={handleToken} />}
          /> */}
        </Routes>

        {visible && (
          <Signup url={url} handleToken={handleToken} setVisible={setVisible} />
        )}

        {visibleLogin && (
          <Login
            url={url}
            handleToken={handleToken}
            setVisibleLogin={setVisibleLogin}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
