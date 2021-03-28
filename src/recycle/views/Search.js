import React, { useState, useRef } from 'react';
import Toast, {showToast} from './Toast';

const MAPBOX_KEY = process.env.REACT_APP_MAPBOX_KEY;

const Search = ({ state, dispatch }) => {
    const [ active, setActive ] = useState(0)
    const [ focus, setFocus ] = useState(false)
    const [ places, setPlaces ] = useState([
        {name: 'Hermoupolis',   location: [24.942510526728135, 37.44061640827948]}, 
        {name: 'Ano Syros',     location: [24.93616015846609, 37.44921635523102]}, 
        {name: 'Galissas',      location: [24.88260288147806, 37.421016233241886]}, 
        {name: 'Finikas',       location: [24.87769604369507, 37.39739629800199]}, 
        {name: 'Poseidonia',    location: [24.886639833820777, 37.389367603716316]}, 
        {name: 'Megas Gialos',  location: [24.90901131756162, 37.38065270066173]},
        {name: 'Vari',          location: [24.946256666308543, 37.39647055589011]}, 
        {name: 'Azolimnos',     location: [24.95940502507134, 37.4098833209217]} 
    ])

    const [ results, setResults ] = useState([])

    const inputRef = useRef()
    const { syrosBounds } = state

    const handleLocationChange = index => {
        setActive(index)
        dispatch({ type: 'CHANGE_LOCATION', location: places[index].location})
    }

    const hadleGetGeoLocation = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 'infinity' 
        }

        navigator.geolocation.getCurrentPosition( getCoords, onError, options )
    }

    const onError = err => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        showToast(err.message, 'error', 3000)
    }

    const getCoords = pos => {
        setActive(-1)

        const lng = pos.coords.longitude
        const lat = pos.coords.latitude
        
        dispatch({ type: 'CHANGE_LOCATION', location: [lng, lat]})
    }

    const handleSubmitForm = event => {
        // showToast('This feature is not yet supported', 'info', 3000)

        event.preventDefault()
        console.log(inputRef.current.value);

        const bbox = `${syrosBounds[0][0]},${syrosBounds[0][1]},${syrosBounds[1][0]},${syrosBounds[1][1]}`
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputRef.current.value}.json?bbox=${bbox}&types=place&access_token=${MAPBOX_KEY}`

        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setResults(data.features)
        })
        .catch( error => {
            console.warn("ERROR: ", error)
            showToast(error, 'error', 3000)
        })

        // inputRef.current.value = null
    }

    return (
        <section className="search">
            <div className="input_wrapper">
                <svg style={{ padding: "25px", fill: "var(--title)", fillOpacity: "0.35", transition: "transition: all .2s ease-in-out" }} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.5517 13.8719C10.3998 14.587 9.03988 15 7.58318 15C3.42976 15 0.0627441 11.6421 0.0627441 7.5C0.0627441 3.35786 3.42976 0 7.58318 0C11.7366 0 15.1036 3.35786 15.1036 7.5C15.1036 9.46568 14.3453 11.2547 13.1046 12.5921L15.347 14.8284C15.7385 15.2189 15.7385 15.8521 15.347 16.2426C14.9554 16.6331 14.3205 16.6331 13.9289 16.2426L11.5517 13.8719ZM14.1008 7.5C14.1008 11.0899 11.1827 14 7.58311 14C3.98347 14 1.0654 11.0899 1.0654 7.5C1.0654 3.91015 3.98347 1 7.58311 1C11.1827 1 14.1008 3.91015 14.1008 7.5Z" />
                </svg>
                <form onSubmit={handleSubmitForm}>
                    <input ref={inputRef} type="text" onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} placeholder="Search for a location.."/>
                </form>
            </div>
            {results.map( (feature, index) => (
                <div className="result_container" key={index} onClick={() => dispatch({ type: 'CHANGE_LOCATION', location: feature.center})}>
                    <p>{feature.place_name}</p>
                </div>
            ))}
            <div className="places_wrapper">
                {navigator.geolocation ? // if geolocation is supported on device
                    <div className={active === -1 ? "btn selected_btn dark" : "btn"} onClick={hadleGetGeoLocation}>
                        <svg style={{ padding: "15px", fill: "var(--subtitle)" }} width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.3513 5.67568C11.2438 5.67568 11.1407 5.63296 11.0647 5.55693C10.9886 5.48091 10.9459 5.37779 10.9459 5.27027V3.25332C9.48457 3.32646 8.06745 3.79396 6.84667 4.60965C5.5133 5.50058 4.47406 6.76689 3.86038 8.24846C3.50318 9.11082 3.29949 10.0236 3.25332 10.946H5.27027C5.37779 10.946 5.48091 10.9888 5.55693 11.0648C5.63296 11.1408 5.67568 11.2439 5.67568 11.3515C5.67568 11.459 5.63296 11.5621 5.55693 11.6381C5.48091 11.7142 5.37779 11.7569 5.27027 11.7569H3.25333C3.27304 12.1504 3.32149 12.5435 3.39898 12.9331C3.71184 14.5059 4.48406 15.9507 5.618 17.0846C6.75194 18.2185 8.19666 18.9908 9.76948 19.3036C10.1591 19.3811 10.5523 19.4296 10.9459 19.4493V17.4325C10.9459 17.325 10.9886 17.2219 11.0647 17.1458C11.1407 17.0698 11.2438 17.0271 11.3513 17.0271C11.4589 17.0271 11.562 17.0698 11.638 17.1458C11.714 17.2219 11.7567 17.325 11.7567 17.4325V19.4493C12.6791 19.4031 13.5918 19.1994 14.4541 18.8422C15.9357 18.2285 17.202 17.1893 18.0929 15.8559C18.9086 14.6352 19.3761 13.2181 19.4493 11.7569H17.4324C17.3249 11.7569 17.2217 11.7142 17.1457 11.6381C17.0697 11.5621 17.027 11.459 17.027 11.3515C17.027 11.2439 17.0697 11.1408 17.1457 11.0648C17.2217 10.9888 17.3249 10.946 17.4324 10.946H19.4488C19.3465 8.94404 18.5061 7.04496 17.0819 5.62072C15.6577 4.19653 13.7587 3.35612 11.7567 3.25378V5.27027C11.7567 5.37779 11.714 5.48091 11.638 5.55693C11.562 5.63296 11.4589 5.67568 11.3513 5.67568ZM2.4416 11.7569C2.48842 12.7853 2.71318 13.8033 3.11129 14.7644C3.78634 16.3941 4.9295 17.7871 6.39621 18.7671C7.75035 19.6719 9.32412 20.1872 10.9459 20.261V22.2974C10.9459 22.4049 10.9886 22.508 11.0647 22.584C11.1407 22.6601 11.2438 22.7028 11.3513 22.7028C11.4589 22.7028 11.562 22.6601 11.638 22.584C11.714 22.508 11.7567 22.4049 11.7567 22.2974V20.2606C13.9738 20.1573 16.0787 19.2312 17.655 17.655C19.2312 16.0788 20.1573 13.9739 20.2605 11.7569H22.2972C22.4048 11.7569 22.5079 11.7142 22.5839 11.6381C22.6599 11.5621 22.7027 11.459 22.7027 11.3515C22.7027 11.2439 22.6599 11.1408 22.5839 11.0648C22.5079 10.9888 22.4048 10.946 22.2972 10.946H20.261C20.1873 9.3242 19.6719 7.75038 18.7671 6.39621C17.7871 4.9295 16.3941 3.78634 14.7644 3.11129C13.8033 2.71316 12.7852 2.4884 11.7567 2.4416V0.405405C11.7567 0.297885 11.714 0.194769 11.638 0.118741C11.562 0.0427123 11.4589 0 11.3513 0C11.2438 0 11.1407 0.0427123 11.0647 0.118741C10.9886 0.194769 10.9459 0.297885 10.9459 0.405405V2.44159C10.4994 2.4619 10.0533 2.51583 9.6113 2.60375C7.8812 2.94789 6.292 3.79733 5.04467 5.04467C3.79733 6.292 2.94789 7.8812 2.60375 9.6113C2.51582 10.0534 2.46189 10.4995 2.44158 10.946H0.405405C0.297885 10.946 0.194769 10.9888 0.118741 11.0648C0.0427123 11.1408 0 11.2439 0 11.3515C0 11.459 0.0427123 11.5621 0.118741 11.6381C0.194769 11.7142 0.297885 11.7569 0.405405 11.7569H2.4416Z"/>
                        </svg>
                    </div> : null }
                {places.map( (_, index) => (
                    <div key={index} onClick={() => handleLocationChange(index)} className={active === index ? "btn selected_btn" : "btn"}>
                        <p>{_.name}</p>
                    </div>
                ))}
                <div className="btn" style={{borderColor: "transparent", marginLeft: "8px"}}></div>
            </div>
            <Toast/>
        </section>
    )
}

export default Search;