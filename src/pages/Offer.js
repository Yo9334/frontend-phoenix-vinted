import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("useEffect");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container">
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="Offer--main">
          <div className="Offer--pic">
            <img src={data.product_pictures[0].url} alt="" />
          </div>

          <div className="Offer--details">
            <div className="Offer--price">
              <span>{data.product_price.toFixed(2)} €</span>
            </div>

            <div className="bloc-1">
              <div>
                {data.product_details.map((detail, index) => {
                  let keys = Object.keys(detail);
                  return <p key={index}>{keys[0]}</p>;
                })}
              </div>

              <div>
                {data.product_details.map((detail, index) => {
                  let values = Object.values(detail);
                  return <p key={index}>{values[0]}</p>;
                })}
              </div>
            </div>

            <div className="bloc-2">
              <p>{data.product_name}</p>
              <p>{data.product_description}</p>
              <div>
                {data.owner.account.avatar ? (
                  <img src={data.owner.account.avatar.secure_url} alt="/" />
                ) : null}
                <span>{data.owner.account.username}</span>
              </div>
            </div>

            <div className="bloc-3">
              <button className="btn-green">Acheter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
