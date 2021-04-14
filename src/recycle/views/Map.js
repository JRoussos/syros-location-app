import React, { useEffect, useRef, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase_config';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import recycle_image from '../assets/green.png';
import { showToast } from '../../components/Toast';

import { useLocation } from 'react-router-dom';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY 

const geolocation = new mapboxgl.GeolocateControl({
    trackUserLocation: true,
    positionOptions: {
        enableHighAccuracy: true,
        timeout: 6000
    }
})

geolocation.on('error', err => {
    showToast(err.message, 'error', 3000)
});

const Map = ({ state}) => {
    const routerLocation = useLocation()
    console.log(routerLocation);

    const { location, syrosBounds, category } = state

    const mapContainerRef = useRef(null)
    const mapInstance = useRef(null)
    const markerRef = useRef(new mapboxgl.Marker({ color: '#ec4e2c', scale: 0.7 }))

    const features = useRef([])

    const streetMapStyle = "mapbox://styles/john632/ckmzgu65x04tt18ti0dmxdug7"
    
    // eslint-disable-next-line
    const [ mapConfig, setMapConfig ] = useState({
        center: location,
        maxBounds: syrosBounds,
        zoom: 15,
        mapStyle: streetMapStyle
    })

    /**
     * Go to location on state.location change
     */
    useEffect(() => {
        if(mapInstance.current){
            mapInstance.current.flyTo({ 
                center: location, 
                zoom: 15,
                essential: true 
            })
            markerRef.current.setLngLat(location).addTo(mapInstance.current)
        }
        else return
    }, [location])

    const [ snapshot, loading, error ] = useCollection(
        firebase.firestore().collection(routerLocation.pathname.slice(1)), {
        snapshotListenOptions: { includeMetadataChanges: false },
        getOptions: { source: 'cache' }
    })

    if(error) {
        showToast(JSON.stringify(error), 'error', 3000)
    }

    /**
     * When user changes category  
     */
    if(mapInstance.current && !loading){
        features.current = []

        snapshot.docs.forEach(doc => {
            if(doc.data().type === category) features.current.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        doc.data().coordinates.latitude, 
                        doc.data().coordinates.longitude
                    ]
                },
                "properties": {
                    "name": doc.data().name
                }
            })
        })

        const map_source = mapInstance.current.getSource("locations")
        if(map_source) map_source.setData({
            "type": "FeatureCollection",
            "features": features.current
        })
    }

    /**
     * On first Render. Initialize the map and add layer
     */
    useEffect(() => {
        mapInstance.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: mapConfig.mapStyle,
            center: mapConfig.center,
            zoom: mapConfig.zoom,
            maxBounds: mapConfig.maxBounds,
            attributionControl: false,
            antialias: true
        })

        mapInstance.current.on('load', () => {
            mapInstance.current.addControl( new mapboxgl.FullscreenControl(),'bottom-right')
            mapInstance.current.addControl( geolocation, 'bottom-right')
    
            mapInstance.current.loadImage( recycle_image, (error, image) => {
                if (error) throw error;
                mapInstance.current.addImage('recycle-marker', image);
            })

            mapInstance.current.addSource('locations', {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": features.current
                },
                "cluster": true,
                "clusterMaxZoom": 14,
                "clusterRadius": 20 
            })

            mapInstance.current.addLayer({
                "id": "locations_clustered",
                "type": "symbol",
                "layout": { 
                    "icon-image": "recycle-marker", 
                    "icon-anchor": "bottom" 
                },
                "source": "locations"
            })
        })

        return () => mapInstance.current.remove()
    }, [mapConfig])

    return (
        <section id="map" className="map animate-section">
            <div className="map-container" ref={mapContainerRef}/>
        </section>
    )
}

export default React.memo(Map);