import { Link } from "react-router-dom";
import logo from "../assets/img/vinted.png";

const Header = () => {
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
          <button className="btn-white" onClick={() => {}}>
            S'inscrire
          </button>

          <button className="btn-white" onClick={() => {}}>
            Se connecter
          </button>

          <button className="btn-green" onClick={() => {}}>
            Vends tes articles
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
