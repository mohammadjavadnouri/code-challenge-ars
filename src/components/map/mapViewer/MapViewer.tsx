import React, { FC, useRef, useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  GeoJSON,
  Marker,
} from "react-leaflet";

import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const customIcon = L.divIcon({
  className: "",
  iconSize: [24, 40],
  iconAnchor: [12, 40],
  html: `
  <svg
    width="24"
    height="40"
    viewBox="0 0 100 100"
    version="1.1"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0 L50 100 L100 0 Z" fill="#7A8BE7"></path>
  </svg>`,
});

interface IMapViewer {
  boundingBox: any;
  geoJSONData: any;
}

const MapViewer: FC<IMapViewer> = ({ geoJSONData, boundingBox }) => {
  const { minLong, minLat, maxLong, maxLat } = boundingBox;
  const geoJsonLayerRef = useRef<any>(null);
  const markerRef = useRef(null);

  const ShowMap = () => {
    let map = useMap();
    map.setView([minLat, minLong], map.getZoom());
    return null;
  };

  // console.log("geoJSONData mj", geoJSONData);

  useEffect(() => {
    const layer = geoJsonLayerRef.current;
    if (layer) {
      layer.clearLayers().addData(geoJSONData);
    }
  }, [geoJSONData]);

  return (
    <MapContainer
      style={{ width: "100%", height: "100vh" }}
      center={[minLong, minLat]}
      zoom={16}
      scrollWheelZoom={false}
    >
      <GeoJSON ref={geoJsonLayerRef} data={geoJSONData} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[minLat, minLong]}
        icon={customIcon}
        ref={markerRef}
      ></Marker>
      <Marker position={[maxLat, maxLong]} icon={customIcon}></Marker>
      <ShowMap />
    </MapContainer>
  );
};

export default MapViewer;
