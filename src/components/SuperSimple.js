// import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const SuperSimple = ({ priceMax, priceMin, userSearch, setUserSearch }) => {
  const STEP = 5;
  const MIN = 10;
  const MAX = 500;

  const handlePrice = (values) => {
    const newSearch = { ...userSearch };
    newSearch.priceMin = values[0];
    newSearch.priceMax = values[1];
    setUserSearch(newSearch);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "nowrap",
          width: "320px",
        }}
      >
        <Range
          values={[priceMin, priceMax]}
          step={STEP}
          min={MIN}
          max={MAX}
          // rtl={rtl}
          onChange={(values) => {
            handlePrice(values);
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: [priceMin, priceMax],
                    colors: ["#ccc", "#548BF4", "#ccc"],
                    min: MIN,
                    max: MAX,
                    //   rtl,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "15px",
                width: "15px",
                borderRadius: "4px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              {/* <div
              style={{
                height: "16px",
                width: "5px",
                backgroundColor: isDragged ? "#548BF4" : "#CCC",
              }}
            /> */}
            </div>
          )}
        />
        {/* <output style={{ marginTop: "30px" }} id="output">
        {values[0].toFixed(1)} - {values[1].toFixed(1)}
      </output> */}
      </div>
      <div className="Range--values">
        <span>{priceMin.toFixed(0)} €</span> -{" "}
        <span>{priceMax.toFixed(0)} €</span>
      </div>
    </div>
  );
};

export default SuperSimple;
