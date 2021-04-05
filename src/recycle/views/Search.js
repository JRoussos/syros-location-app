import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import Toast, {showToast} from './Toast';

const MAPBOX_KEY = process.env.REACT_APP_MAPBOX_KEY;

const Search = ({ state, dispatch }) => {
    const { t } = useTranslation()
    const inputRef = useRef()

    const [ focus, setFocus ] = useState(false)
    const [ active, setActive ] = useState(0)
    const [ results, setResults ] = useState([])
    const [ places, setPlaces ] = useState([
        {name: 'Hermoupolis',   location: [24.941304, 37.445081]}, 
        {name: 'Ano Syros',     location: [24.936160, 37.449216]}, 
        {name: 'Galissas',      location: [24.882602, 37.421016]}, 
        {name: 'Finikas',       location: [24.880867, 37.398874]}, 
        {name: 'Poseidonia',    location: [24.886639, 37.389367]}, 
        {name: 'Megas Gialos',  location: [24.909011, 37.380652]},
        {name: 'Vari',          location: [24.946256, 37.396470]}, 
        {name: 'Azolimnos',     location: [24.959405, 37.409883]} 
    ])

    const { syrosBounds, local } = state
    const bbox = `${syrosBounds[0][0]},${syrosBounds[0][1]},${syrosBounds[1][0]},${syrosBounds[1][1]}`

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

    const handleChangeInput = () => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputRef.current.value}.json?bbox=${bbox}&types=place,poi&language=${local}&limit=3&access_token=${MAPBOX_KEY}`
        console.log(inputRef.current.value);

        if(inputRef.current.value === '' ) {
            setResults([])
            return
        }

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
    }

    return (
        <section className="search">
            <div className="search_container">
                <div className="input_wrapper" onClick={() => {inputRef.current && inputRef.current.focus()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none" role="img">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.6002 12.0498C9.49758 12.8568 8.13777 13.3333 6.66667 13.3333C2.98477 13.3333 0 10.3486 0 6.66667C0 2.98477 2.98477 0 6.66667 0C10.3486 0 13.3333 2.98477 13.3333 6.66667C13.3333 8.15637 12.8447 9.53194 12.019 10.6419C12.0265 10.6489 12.0338 10.656 12.0411 10.6633L15.2935 13.9157C15.6841 14.3063 15.6841 14.9394 15.2935 15.33C14.903 15.7205 14.2699 15.7205 13.8793 15.33L10.6269 12.0775C10.6178 12.0684 10.6089 12.0592 10.6002 12.0498ZM11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z" fill="var(--placeholder)"></path>
                    </svg>
                    <input ref={inputRef} type="text" placeholder={t('input_placeholder')} 
                        onChange={handleChangeInput}
                        onFocus={() => gsap.to('.search_container', {duration: 0.3, boxShadow: '0px 8px 16px -6px var(--img-shadow)', scale: 1.05, ease: 'power2.inOut'})}
                        onBlur={() => gsap.to('.search_container', {duration: 0.3, boxShadow: '0px 4px 12px -6px var(--img-shadow)', scale: 1, ease: 'power2.inOut'})}/>
                </div>
                <div className="result_wrapper" style={{ height: focus ? 'auto' : '0px'}}>
                    <h5>Quick Results</h5>
                    <div id="places_wrappper" className="places_wrapper">
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
                        <div className="btn" style={{border: "1px solid transparent", marginLeft: "8px"}}></div>
                    </div>
                    {results.length ? <h5>Results based on: '{inputRef.current.value}'</h5> : null} 
                    {results.map( (feature, index) => (
                        <div className="result_container" key={index} onClick={() => dispatch({ type: 'CHANGE_LOCATION', location: feature.center})}>
                            <p>{feature.place_name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Toast/>
        </section>
    )
}

export default Search;