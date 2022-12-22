import React, { FC, useState } from "react";
import osmtogeojson from "osmtogeojson";

//apis
import { getMap } from "../../../services/locationInfo/locationInfo";

interface IBoundingBox {
  geoJSONDataSetter: any;
  boundingBoxSetter: any;
}

const BoundingBox: FC<IBoundingBox> = ({
  geoJSONDataSetter,
  boundingBoxSetter,
}) => {
  //states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //constants
  const onFormSubmit = (values: any) => {
    values.preventDefault();
    const {
      left: { value: left },
      bottom: { value: bottom },
      right: { value: right },
      top: { value: top },
    } = values.target.elements;

    let result = {} as any;
    if (!left || !bottom || !right || !top) {
      setError("one or two of inputs is/are not typed!");
    } else {
      setError("");
      setLoading(true);
      getMap(left, bottom, right, top)
        .then((res: any) => {
          result = res;
          if (res?.ok) {
            return res.json();
          } else {
            return res.text();
          }
        })
        .then((data: any) => {
          if (!result.ok) {
            window.alert(data);
          }
          const geoJSON = osmtogeojson(data);
          geoJSONDataSetter(geoJSON);
          boundingBoxSetter(left, bottom, right, top);
        })
        .catch((er: any) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <form
        onSubmit={onFormSubmit}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        Search features by typing Bounding-box values :
        <label htmlFor="left">
          Left min Longitude:
          <input
            id="left"
            type="number"
            min="-90"
            max="90"
            step="0.0000000001"
          />
        </label>
        <label htmlFor="bottom">
          Bottom min Latitude:
          <input
            id="bottom"
            type="number"
            min="-180"
            max="180"
            step="0.0000000001"
          />
        </label>
        <label htmlFor="right">
          Right max Longitude:
          <input
            id="right"
            type="number"
            min="-90"
            max="90"
            step="0.0000000001"
          />
        </label>
        <label htmlFor="top">
          Top max Latitude:
          <input
            id="top"
            type="number"
            min="-180"
            max="180"
            step="0.0000000001"
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? " LOADING..." : "Search"}{" "}
        </button>
      </form>
      {error && (
        <div style={{ color: "red" }} role="alert">
          {error}
        </div>
      )}
    </>
  );
};

export default BoundingBox;
