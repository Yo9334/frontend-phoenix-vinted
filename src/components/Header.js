import { Link } from "react-router-dom";
import logo from "../assets/img/vinted.png";
import { useNavigate } from "react-router-dom";

const Header = ({
  userToken,
  handleToken,
  Show1,
  setShow1,
  Show2,
  setShow2,
  userSearch,
  setUserSearch,
  requestPage,
  setRequestPage,
}) => {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    const newSearch = { ...userSearch };
    newSearch.title = event.target.value;
    setUserSearch(newSearch);
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo Vinted" className="logo" />
        </Link>

        <input
          type="search"
          name="search"
          value={userSearch.title}
          placeholder="Rechercher des articles"
          className="search-bar"
          onChange={handleSearch}
        />
        <div className="Header--btn">
          {userToken ? (
            <button
              className="btn-red"
              onClick={() => {
                handleToken(null);
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              {/* <Link to="/signup">
                <button className="btn-white">S'inscrire</button>
              </Link>

              <Link to="/login">
                <button className="btn-white">Se connecter</button>
              </Link> */}

              <button
                className="btn-white"
                onClick={() => {
                  setShow1(!Show1);
                }}
              >
                S'inscrire
              </button>

              <button
                className="btn-white"
                onClick={() => {
                  setShow2(!Show2);
                }}
              >
                Se connecter
              </button>
            </>
          )}
          {userToken ? (
            <button className="btn-green" onClick={() => navigate("/publish")}>
              Vends tes articles
            </button>
          ) : (
            <button
              className="btn-green"
              onClick={() => {
                setRequestPage("publish");
                setShow2(!Show2);
              }}
            >
              Vends tes articles
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
