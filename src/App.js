import React, { useRef, useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import ReactMapboxGL, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import firebase from './firebase_config';
import './App.css';
import marker from './recycle/assets/pushpin.png';

import mapboxgl from 'mapbox-gl';

const Map = ReactMapboxGL({
  // accessToken: process.env.REACT_APP_MAPBOX_KEY
  accessToken: 'pk.eyJ1Ijoiam9objYzMiIsImEiOiJjazZtcm1mZm8waGs2M3VydWhvZjU2bXNrIn0.GCk0_AijdN89AK7LqqxgGw'
});

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9objYzMiIsImEiOiJjazZtcm1mZm8waGs2M3VydWhvZjU2bXNrIn0.GCk0_AijdN89AK7LqqxgGw'

const mapConfig = {
  zoom: [15],
  center: [ 24.94035310452929, 37.4449794111022 ],
  style: "mapbox://styles/mapbox/dark-v10",
  containerStyle: { width: "400px", height: "300px", borderRadius: "10px", outline: "none" }
}

function App() {
  const [ type, setType ] = useState('plastic')
  const [ theme, setTheme ] = useState('dark')
  const [ snapshot, loading, error ] = useCollection(
    firebase.firestore().collection('recycle').where("type", "==", type), {
    snapshotListenOptions: { includeMetadataChanges: false },
    getOptions: { source: 'cache' }
  })

  const mapContainerConfig = useRef(null)
  const actualMap = useRef(null)

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  useEffect(() => {
    actualMap.current = new mapboxgl.Map({
      container: mapContainerConfig.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    })

    actualMap.current.on('move', () => {
      setLng(actualMap.current.getCenter().lng.toFixed(4));
      setLat(actualMap.current.getCenter().lat.toFixed(4));
      setZoom(actualMap.current.getZoom().toFixed(2));
    })

    return () => actualMap.current.remove()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setType('plastic')}>Change to Plastic</button>
        <button onClick={() => setType('glass')}>Change to Glass</button>
        <button onClick={() => {actualMap.current.fitBounds([
[32.958984, -5.353521],
[43.50585, 5.615985]
])}}>Change location</button>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark' )}>Toggle Theme</button>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {/* {snapshot && console.log(snapshot.docs[0].data())} */}
        {/* {snapshot && snapshot.docs.map( doc => <p key={doc.id}> { JSON.stringify(doc.data()) } </p> )} */}
        {/* <Map {...mapConfig} style={theme==='dark' ? "mapbox://styles/mapbox/dark-v10" : "mapbox://styles/mapbox/light-v10"}>
          {snapshot && snapshot.docs.map( doc => (
            <Marker coordinates={[doc.data().location._long, doc.data().location._lat]} anchor="bottom">
              <img src={marker}/>
            </Marker>
          ))}
        </Map> */}

        <div style={{width: "100%", height: "400px", borderRadius: "8px", margin: "5px"}} className="map-container" ref={mapContainerConfig}/>

      </header>
    </div>
  );
}

export default App;
