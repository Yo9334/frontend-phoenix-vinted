import { Link } from "react-router-dom";
import logo from "../assets/img/vinted.png";

const Header = ({
  userToken,
  handleToken,
  visible,
  setVisible,
  visibleLogin,
  setVisibleLogin,
}) => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo Vinted" className="logo" />
        </Link>

        <input
          type="search"
          placeholder="Rechercher des articles"
          className="search-bar"
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
                  setVisible(!visible);
                }}
              >
                S'inscrire
              </button>

              <button
                className="btn-white"
                onClick={() => {
                  setVisibleLogin(!visibleLogin);
                }}
              >
                Se connecter
              </button>
            </>
          )}

          <button className="btn-green">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
