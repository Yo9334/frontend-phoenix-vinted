import { useLocation, Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import Cookies from "js-cookie";

const Payment = ({ url, userToken }) => {
  const location = useLocation();
  const { title, price } = location.state;
  const total = price + price * 0.1 + price * 0.2;

  // key : Le Reacteur
  //   const stripePromise = loadStripe(
  //     "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  //   );

  // key : my key
  const stripePromise = loadStripe(
    "pk_test_51M4OT8LAKRrzYIO0JC7iE8FVuG04HgFNiNHvpP8EHfItFLOBKy2iQYrg7jF1FjMPrv7twuWNNzPBUoDfNBQ6J4ar00seWC94Dh"
  );

  const userId = Cookies.get("userId");

  return (
    <div className="container">
      {!userToken && <Navigate to="/" />}

      <div className="Payment--main">
        <h3>Résumé de la commande</h3>

        <div className="content">
          <h4>Commmande</h4>
          <span>{price.toFixed(2)} €</span>
        </div>

        <div className="content">
          <h4>Frais protection acheteurs</h4>
          <span>{price * 0.1} €</span>
        </div>

        <div className="content">
          <h4>Frais de port</h4>
          <span>{price * 0.2} €</span>
        </div>

        <div className="divider"></div>

        <div className="content-total">
          <h4>Total</h4>
          <span>{total.toFixed(2)} €</span>
        </div>

        <div className="content-article">
          <p>
            Il ne vous reste plus qu'une étape pour vous offrir
            <span> {title}</span> 😍. Vous allez payer
            <span> {total.toFixed(2)} €</span> (frais de protection et frais de
            port inclus).
          </p>
        </div>

        <div className="Payment--stripe">
          <Elements stripe={stripePromise}>
            <CheckoutForm url={url} id={userId} title={title} amount={price} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
