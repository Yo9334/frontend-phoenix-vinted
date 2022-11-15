import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Publish = ({ url, userToken }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("userToken", userToken);

    if (errorMsg !== "") {
      setErrorMsg("");
    }

    try {
      // Je crée une nouvelle instance du constructeur FormData
      const formData = new FormData();
      // Je rajoute x paires clef/valeur à mon formdata
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);

      // Je donne x arguments à axios.post :
      // - L'URL à interroger
      // - le body, ici un formData
      // - Les potentiels headers à envoyer : ici un token
      const response = await axios.post(url + "offer/publish", formData, {
        headers: {
          authorization: "Bearer " + userToken,
          // Je repécise que j'envoie un formdata
          "Content-Type": "multipart/form-data",
        },
      });
      //setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      {!userToken && <Navigate to="/" />}

      <form onSubmit={handleSubmit}>
        <div className="Publish--main">
          <h2>Vends ton article</h2>

          <div className="Publish--file">
            <input
              className="btn-white"
              type="file"
              name="picture"
              id="picture"
              //value={}
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
            />
          </div>

          <div className="Publish--bloc">
            <div className="Publish--input">
              <h4>Titre</h4>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="ex: Chemise Sézane verte"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="Publish--input">
              <h4>Décris ton article</h4>
              <textarea
                name="description"
                id="description"
                placeholder="ex: porté quelque fois, taille correctement"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
          </div>

          <div className="Publish--bloc">
            <div className="Publish--input">
              <h4>Marque</h4>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Zara"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>

            <div className="Publish--input">
              <h4>Taille</h4>
              <input
                type="text"
                name="size"
                id="size"
                placeholder="ex: L / 40 / 12"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>

            <div className="Publish--input">
              <h4>Couleur</h4>
              <input
                type="text"
                name="color"
                id="color"
                placeholder="ex: Fushia"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>

            <div className="Publish--input">
              <h4>Etat</h4>
              <input
                type="text"
                name="condition"
                id="condition"
                placeholder="ex: Neuf avec étiquette"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>

            <div className="Publish--input">
              <h4>Lieux</h4>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="ex: Paris"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="Publish--bloc">
            <div className="Publish--input">
              <h4>Prix</h4>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="0.00 €"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="Publish--send">
            <button type="submit" className="btn-green btn-pad-md">
              Ajouter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Publish;
