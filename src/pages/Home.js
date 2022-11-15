import Hero from "../components/Hero";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OfferCard from "../components/OfferCard";
import Search from "../components/Search";

const Home = ({ url, userSearch, setUserSearch }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("useEffect", userSearch);

      let filter = [];

      if (userSearch.title) {
        filter.push(`title=${userSearch.title}`);
      }
      filter.push(userSearch.sort ? "sort=price-asc" : "sort=price-desc");

      if (userSearch.priceMin !== "0" && userSearch.priceMin !== "") {
        filter.push("priceMin=" + userSearch.priceMin);
      }

      if (userSearch.priceMax !== "0" && userSearch.priceMax !== "") {
        filter.push("priceMax=" + userSearch.priceMax);
      }

      if (userSearch.limit !== 0 && userSearch.page !== 0) {
        filter.push("page=" + userSearch.page);
        filter.push("limit=" + userSearch.limit);
      }

      // console.log("===> final", filter.join("&"));

      try {
        const response = await axios.get(url + "offers?" + filter.join("&"));
        // const response = await axios.get(url + "offers"); //all
        console.log(response.data);
        setData(response.data);

        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [url, userSearch]);

  return (
    <div className="App">
      <Search userSearch={userSearch} setUserSearch={setUserSearch} />
      <Hero />

      {loading && <p>Loading...</p>}

      {!loading && (
        <div className="container">
          <div className="row1">
            {<h2>Articles populaires</h2>}

            <div className="Home--items">
              {data.offers.slice(0, 100).map((offer) => {
                // {data.offers.slice(0, 20).map((offer) => {
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
