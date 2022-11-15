import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

const Offer = ({ url }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  // const responsive = {
  //   superLargeDesktop: {
  //     // the naming can be any, depends on you.
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 3,
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 10 },
  //     items: 2,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 2,
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1,
  //   },
  // };

  // console.log("responsive", responsive);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}offer/${id}`);

        console.log(response.data);

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [url, id]);

  return (
    <div className="container">
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <div className="Offer--main">
            {/* {data.product_pictures.length > 0 ? ( */}
            {/* {data.product_pictures !== null ? (
              <div className="Offer--pic">
                {data.product_pictures.map((elem) => {
                  return (
                    <img key={elem.asset_id} src={elem.secure_url} alt="/" />
                  );
                })}
              </div>
            ) : (
              <div key={data.product_image.asset_id} className="Offer--pic">
                <img src={data.product_image.secure_url} alt="/" />
              </div>
            )} */}

            <div key={data.product_image.asset_id} className="Offer--pic">
              <img src={data.product_image.secure_url} alt="/" />
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
                <button
                  className="btn-green btn-pad"
                  onClick={() => {
                    console.log(data.product_name, data.product_price);

                    navigate("/payment", {
                      state: {
                        id: data._id,
                        title: data.product_name,
                        price: data.product_price,
                      },
                    });
                  }}
                >
                  Acheter
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Offer;
