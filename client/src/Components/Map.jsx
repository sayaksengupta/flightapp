import { useState, React } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import {MdLocalAirport,MdLocationOn} from "react-icons/md";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import '../Styles/Map.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const TOKEN = "pk.eyJ1IjoiYW5vbWljMzAiLCJhIjoiY2tydnFkcTgyMDk5bjJ1bzJhOGRwdHdyYSJ9.sdeq4wN8AvZxrehZ12pazQ";

const Map = ({srcLat,srcLon,destLat,destLon}) => {
    
    const [viewport, setViewport] = useState({
        latitude: 22.5726,
        longitude: 88.3639,
        zoom: 3.1,
        bearing: 0,
        pitch:0,
        width: "100%",
        height: "94vh",
    });

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/mapbox/dark-v10"
            mapboxApiAccessToken={TOKEN}
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}

        >
            <Marker latitude={srcLat} longitude={srcLon}>
                <MdLocalAirport width="80px" color="#4295f5"/>
            </Marker>
            <Marker latitude={destLat} longitude={destLon} >
                <MdLocationOn width="80px" color="#4295f5"/>
            </Marker>
        </ReactMapGL>
    );
}

export default Map