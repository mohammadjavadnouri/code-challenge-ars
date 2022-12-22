import React, { FC, useState } from "react";

//components
import MapViewer from "./mapViewer/MapViewer";
import BoundingBox from "./inputs/BoundingBox";

interface IArsMap {}

const ArsMap: FC<IArsMap> = ({}) => {
  const [boundingBox, setBoundingBox] = useState({
    minLong: 13.4,
    minLat: 52.53,
    maxLong: 13.4001,
    maxLat: 52.5301,
  });

  const [geoJSONData, setGeoJSONData] = useState({
    features: [],
    type: "FeatureCollection",
  } as any);

  const geoJSONDataSetter = (data: any) => {
    setGeoJSONData(data);
  };

  const boundingBoxSetter = (
    minLong: number,
    minLat: number,
    maxLong: number,
    maxLat: number
  ) => {
    setBoundingBox({
      minLong: minLong,
      minLat: minLat,
      maxLong: maxLong,
      maxLat: maxLat,
    });
  };

  return (
    <>
      <hr />
      <BoundingBox
        geoJSONDataSetter={geoJSONDataSetter}
        boundingBoxSetter={boundingBoxSetter}
      />
      <hr />
      <MapViewer geoJSONData={geoJSONData} boundingBox={boundingBox} />
    </>
  );
};

export default ArsMap;
