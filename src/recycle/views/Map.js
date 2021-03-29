import React, { useEffect, useRef, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase_config';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY 

const Map = ({ state}) => {
    const { location, category } = state

    const mapContainerRef = useRef(null)
    const mapInstance = useRef(null)
    const markerRef = useRef(new mapboxgl.Marker({ color: '#ec4e2c', scale: 0.7 }))

    console.log(location);
    console.log(category);

    const darkMapStyle = "mapbox://styles/mapbox/dark-v10"
    const lightMapStyle = "mapbox://styles/mapbox/light-v10"
    
    const [ mapConfig, setMapConfig ] = useState({
        center: [24.940336, 37.444246],
        zoom: 11,
        mapStyle: lightMapStyle
    })

    useEffect(() => {
        if(mapInstance.current){
            mapInstance.current.flyTo({ 
                center: location, 
                zoom: 14, 
                essential: true 
            })
            markerRef.current.setLngLat(location).addTo(mapInstance.current)
        }
        else return
    }, [location])

    useEffect(() => {
        mapInstance.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: mapConfig.mapStyle,
            center: mapConfig.center,
            zoom: mapConfig.zoom,
            maxBounds: [[24.844369, 37.356365], [24.993442, 37.521599]],
            attributionControl: false
        })

        // mapInstance.current.on('move', () => {
        //     setMapConfig({
        //         ...mapConfig,
        //         center: mapInstance.current.getCenter(),
        //         zoom: mapInstance.current.getZoom().toFixed(2)
        //     })
        // })

        // mapInstance.current.on('load', () => {
        //     setMapConfig(  )
        // })

        return () => mapInstance.current.remove()
    }, [mapConfig])

    const [ snapshot ] = useCollection(
        firebase.firestore().collection('recycle').where("type", "==", category), {
        snapshotListenOptions: { includeMetadataChanges: false },
        getOptions: { source: 'cache' }
    })

    return (
        <section id="map" className="map">
            <h5>Map View</h5>
            {/* <button onClick={() => setMapConfig({ ...mapConfig, mapStyle: mapConfig.mapStyle===darkMapStyle ? lightMapStyle : darkMapStyle })}>style</button>
            <button onClick={() => mapInstance.current.fitBounds([ [24.883661, 37.410933], [24.883603, 37.427273] ])}>flyTo</button> */}
            <div className="map-container" ref={mapContainerRef}/>
        </section>
    )
}

export default Map;

{/* <Map {...mapConfig}>
    {snapshot && snapshot.docs.map( (doc, index) => (
        <Marker key={index} coordinates={[doc.data().location._long, doc.data().location._lat]} anchor="bottom">
            <img src={marker} alt="marker"/>
        </Marker>
    ))}
</Map> */}