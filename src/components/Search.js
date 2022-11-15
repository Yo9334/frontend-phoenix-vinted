import SuperSimple from "./SuperSimple";

const Search = ({ userSearch, setUserSearch }) => {
  const handlePrice = (event) => {
    const newSearch = { ...userSearch };
    newSearch.sort = !newSearch.sort;
    setUserSearch(newSearch);
  };

  return (
    <div className="Search--main">
      <div className="container">
        <div className="Search--content">
          <div className="Search--sort">
            <span>Trier par prix :</span>
            <input
              type="checkbox"
              name="price"
              id="price"
              checked={userSearch.sort}
              onChange={handlePrice}
            />
          </div>
          <div className="Search--range">
            <SuperSimple
              priceMax={userSearch.priceMax}
              priceMin={userSearch.priceMin}
              userSearch={userSearch}
              setUserSearch={setUserSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
