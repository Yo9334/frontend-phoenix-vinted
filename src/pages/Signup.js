import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ url, handleToken, setVisible, setVisibleLogin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    if (errorMsg !== "") {
      setErrorMsg("");
    }

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );

      //   console.log(response.data);
      if (response.data.token) {
        handleToken(response.data.token);
        navigate("/");
      } else {
        setErrorMsg("Error...");
      }
    } catch (error) {
      // console.log("error", error);
      if (error.response.status === 409) {
        setErrorMsg("Cet email existe déjà !");
      } else if (error.response.status === 400) {
        setErrorMsg("Veuillez remplir les champs.");
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
        setVisible(false);
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
            setVisible(false);
          }}
        >
          X
        </button>

        <div className="Login--form">
          <form onSubmit={handleSubmit}>
            <h1>S'incrire</h1>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Adresse mail"
              value={email}
              required={true}
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
            <div className="Login--newsletter">
              <input
                type="checkbox"
                name="newsletter"
                id="newsletter"
                checked={newsletter}
                onChange={(event) => {
                  setNewsletter(event.target.checked);
                }}
              />
              <p>S'incrire à notre newsletter</p>
            </div>

            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

            <div className="Login--submit">
              <button type="submit" className="btn-green btn-pad">
                S'incrire
              </button>
            </div>

            {/* <Link to="/login"> */}
            <span
              className="btn-link"
              onClick={() => {
                setVisible(false);
                setVisibleLogin(true);
              }}
            >
              Tu as déjà un compte ? Connecte-toi !
            </span>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
