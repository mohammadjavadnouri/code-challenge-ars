import React, { FC, useState } from "react";
import osmtogeojson from "osmtogeojson";

//apis
import { getMap } from "../../../services/locationInfo/locationInfo";

//styles
import styles from "./BoundingBox.module.scss";

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
      <p> Search features by Bounding-box :</p>
      <form onSubmit={onFormSubmit} className={styles.form}>
        <div className={styles.inputs}>
          <div>
            <label htmlFor="left">Left min Longitude: </label>
            <input
              id="left"
              type="number"
              min="-90"
              max="90"
              step="0.0000000001"
            />
          </div>
          <div>
            <label htmlFor="bottom">Bottom min Latitude:</label>
            <input
              id="bottom"
              type="number"
              min="-180"
              max="180"
              step="0.0000000001"
            />{" "}
          </div>
          <div>
            <label htmlFor="right">Right max Longitude:</label>
            <input
              id="right"
              type="number"
              min="-90"
              max="90"
              step="0.0000000001"
            />{" "}
          </div>

          <div>
            <label htmlFor="top">Top max Latitude:</label>
            <input
              id="top"
              type="number"
              min="-180"
              max="180"
              step="0.0000000001"
            />{" "}
          </div>
        </div>
        <br />
        <div className={styles.buttonContainer}>
          <button type="submit" disabled={loading}>
            {loading ? " LOADING..." : "Search"}{" "}
          </button>
        </div>
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
