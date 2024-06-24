import { Map } from "react-map-gl/maplibre";
import React from "react";
import 'maplibre-gl/dist/maplibre-gl.css';


const PlaceLocation = () => {
  return (
    <div className=" h-[45vh] rounded-lg border-2 border-black ">
      <Map
        mapboxAccessToken="<Mapbox access token>"
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="https://demotiles.maplibre.org/style.json"
      >

      </Map>
    </div>
  );
};

export default PlaceLocation;
