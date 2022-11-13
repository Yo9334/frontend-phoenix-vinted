import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ url, handleToken, setVisibleLogin, setVisible }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    if (errorMsg !== "") {
      setErrorMsg("");
    }

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        handleToken(response.data.token);
        setVisibleLogin(false);
        navigate("/");
      }
    } catch (error) {
      // console.log(error.message);
      if (error.response.status === 401 || error.response.status === 400) {
        setErrorMsg("L'email ou le mot de passe sont invalides !");
      } else {
        setErrorMsg(error.message);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div
      className="modal-root"
      onClick={() => {
        setVisibleLogin(false);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {/* button pour fermer la modal */}
        <button
          className="btn-close"
          onClick={() => {
            setVisibleLogin(false);
          }}
        >
          X
        </button>
        <div className="Login--form">
          <form onSubmit={handleSubmit}>
            <h2>Se connecter</h2>

            <input
              type="text"
              name="email"
              id="email"
              placeholder="Adresse email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              autoComplete="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

            <div className="Login--submit">
              <button type="submit" className="btn-green btn-pad">
                Se connecter
              </button>
            </div>
            {/* <Link to="/signup"> */}
            <span
              className="btn-link"
              onClick={() => {
                setVisibleLogin(false);
                setVisible(true);
              }}
            >
              Pas encore de compte ? Incris-toi !
            </span>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
