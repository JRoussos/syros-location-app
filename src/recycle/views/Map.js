import React, { useEffect, useRef, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase_config';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import stores from './feat';
import recycle_image from '../assets/green.png';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY 

const Map = ({ state}) => {
    const { location, category, theme } = state

    const mapContainerRef = useRef(null)
    const mapInstance = useRef(null)
    const markerRef = useRef(new mapboxgl.Marker({ color: '#ec4e2c', scale: 0.7 }))

    const darkMapStyle = "mapbox://styles/mapbox/dark-v10"
    const lightMapStyle = "mapbox://styles/mapbox/light-v10"
    
    const [ mapConfig, setMapConfig ] = useState({
        center: [24.940336, 37.444246],
        zoom: 14,
        mapStyle: lightMapStyle
    })

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

    useEffect(() => {
        if(mapInstance.current){
            setMapConfig( prevConfig => { 
                const updatedConfig = {
                    center: prevConfig.center,
                    zoom: prevConfig.zoom,
                    mapStyle: theme==='light' ? lightMapStyle : darkMapStyle
                }

                return { ...prevConfig, ...updatedConfig }
            })
            // setMapConfig({ ...mapConfig, mapStyle: theme==='light' ? lightMapStyle : darkMapStyle })
        }
    }, [theme])

    useEffect(() => {
        mapInstance.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: mapConfig.mapStyle,
            center: mapConfig.center,
            zoom: mapConfig.zoom,
            maxBounds: [[24.844369, 37.356365], [24.993442, 37.521599]],
            attributionControl: false,
            antialias: true
        })

        mapInstance.current.on('load', () => {
            mapInstance.current.addControl( new mapboxgl.FullscreenControl(),'bottom-right')

            mapInstance.current.loadImage( recycle_image, (error, image) => {
                if (error) throw error;
                mapInstance.current.addImage('recycle-marker', image);
            })

            mapInstance.current.addSource('locations', {
                "type": "geojson",
                "data": stores,
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

    const [ snapshot ] = useCollection(
        firebase.firestore().collection('recycle').where("type", "==", category), {
        snapshotListenOptions: { includeMetadataChanges: false },
        getOptions: { source: 'cache' }
    })

    return (
        <section id="map" className="map">
            {/* <h5>{t('map_title')}</h5> */}
            <div className="map-container" ref={mapContainerRef}/>
        </section>
    )
}

export default Map;