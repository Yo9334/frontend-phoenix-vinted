const OfferCard = ({ offerInfos }) => {
  const getDetail = (obj, value) => {
    let str1 = "";
    obj.forEach((element) => {
      const keys = Object.keys(element);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === value) {
          str1 = element[keys[0]];
          break;
        }
      }
    });
    return str1;
  };

  return (
    <>
      {/* <h2>{offerInfos.owner ? offerInfos.owner.account.username : "n/a"}</h2> */}
      <div className="HomeItem-owner">
        {offerInfos.owner?.account.avatar ? (
          <img src={offerInfos.owner.account.avatar.secure_url} alt="/" />
        ) : null}
        <span>
          {offerInfos.owner ? offerInfos.owner.account.username : "n/a"}
        </span>
      </div>

      <div className="HomeItem--pic">
        <img src={offerInfos.product_image?.secure_url} alt="/" />
      </div>

      <div className="HomeItem--content">
        <p>{offerInfos.product_price.toFixed(2)} €</p>

        {offerInfos.product_details && (
          <>
            <p>
              {offerInfos.product_details.length !== 0
                ? getDetail(offerInfos.product_details, "TAILLE")
                : "n/a"}
            </p>
            <p>
              {offerInfos.product_details.length !== 0
                ? getDetail(offerInfos.product_details, "MARQUE")
                : "n/a"}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default OfferCard;
