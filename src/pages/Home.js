import Hero from "../components/Hero";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OfferCard from "../components/OfferCard";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Hero />

      {loading && <p>Loading...</p>}

      {!loading && (
        <div className="container">
          <div className="row1">
            {<h2>Articles populaires</h2>}

            <div className="Home--items">
              {data.offers.slice(0, 20).map((offer) => {
                return (
                  <Link
                    to={`/offer/${offer._id}`}
                    className="HomeItem"
                    key={offer._id}
                  >
                    <OfferCard offerInfos={offer} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
