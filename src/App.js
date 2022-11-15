import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import { useState } from "react";
import Cookies from "js-cookie";
import Signup from "./pages/Signup";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
// import Modal from "./pages/Modal";

function App() {
  // const url = "https://lereacteur-vinted-api.herokuapp.com/";
  const url = "https://site--backend-vinted--t9jv7l54vjwq.code.run/";
  // const url = "http://localhost:4000/";

  const userSearch = {
    title: "",
    priceMin: 10,
    priceMax: 450,
    sort: true, //price asc
    page: 0,
    limit: 100,
  };

  const [token, setToken] = useState(Cookies.get("token") || 0);
  const [Show1, setShow1] = useState(false);
  const [Show2, setShow2] = useState(false);
  const [search, setSearch] = useState(userSearch);
  const [requestPage, setRequestPage] = useState("");

  // Cette fonction permet de stocker le token dans le state
  // et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleToken = (token, id) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("userId", id, { expires: 7 });
    } else {
      setToken(null);
      Cookies.remove("token");
      Cookies.remove("userId");
    }
  };

  return (
    <div className="App">
      <Router>
        <Header
          userToken={token}
          handleToken={handleToken}
          Show1={Show1}
          setShow1={setShow1}
          Show2={Show2}
          setShow2={setShow2}
          userSearch={search}
          setUserSearch={setSearch}
          requestPage={requestPage}
          setRequestPage={setRequestPage}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home url={url} userSearch={search} setUserSearch={setSearch} />
            }
          />
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
          <Route
            path="/publish"
            element={<Publish url={url} userToken={token} />}
          />
          <Route
            path="/payment"
            element={<Payment url={url} userToken={token} />}
          />
        </Routes>

        {Show1 && (
          <Signup
            url={url}
            handleToken={handleToken}
            setShow1={setShow1}
            setShow2={setShow2}
          />
        )}

        {Show2 && (
          <Login
            url={url}
            handleToken={handleToken}
            setShow2={setShow2}
            setShow1={setShow1}
            requestPage={requestPage}
            setRequestPage={setRequestPage}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
