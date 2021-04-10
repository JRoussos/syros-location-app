import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { showToast } from './Toast';

const MAPBOX_KEY = process.env.REACT_APP_MAPBOX_KEY;

const Search = ({ state, dispatch,setVisible }) => {
    const { t } = useTranslation()
    const inputRef = useRef()

    const [ results, setResults ] = useState([])
    const [ places, setPlaces ] = useState([
        {id: 941304, name: 'Hermoupolis',   location: [24.941304, 37.445081], isRecentSeach: false}, 
        {id: 936160, name: 'Ano Syros',     location: [24.936160, 37.449216], isRecentSeach: false}, 
        {id: 882602, name: 'Galissas',      location: [24.882602, 37.421016], isRecentSeach: false}, 
        {id: 880867, name: 'Finikas',       location: [24.880867, 37.398874], isRecentSeach: false}, 
        {id: 886639, name: 'Poseidonia',    location: [24.886639, 37.389367], isRecentSeach: false}, 
        {id: 946256, name: 'Vari',          location: [24.946256, 37.396470], isRecentSeach: false}, 
        {id: 959405, name: 'Azolimnos',     location: [24.959405, 37.409883], isRecentSeach: false}, 
        {id: 909011, name: 'Megas Gialos',  location: [24.909011, 37.380652], isRecentSeach: false}
    ])

    const { syrosBounds, local } = state
    const bbox = `${syrosBounds[0][0]},${syrosBounds[0][1]},${syrosBounds[1][0]},${syrosBounds[1][1]}`

    const handleLocationChange = location => {
        setPlaces([ ...places, {name: 'test', location: location} ])
        dispatch({ type: 'CHANGE_LOCATION', location: location})
        document.getElementById('map').scrollIntoView()
        setVisible(false)
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

    const addToLocalStorage = feature => {
        let storedSearches = JSON.parse(localStorage.getItem("storedSearches"))
        if(!storedSearches) storedSearches = []

        storedSearches.push({id: feature.id, name: feature.matching_text || feature.text, location: feature.center, isRecentSeach: true})
        storedSearches.reverse()
        localStorage.setItem("storedSearches", JSON.stringify(storedSearches))
    }

    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem("storedSearches"))
        if(storedSearches){
            setPlaces(prevState => [ ...storedSearches, ...prevState ])
        }
    }, [])

    return createPortal(
        <div className="search overlay">
            <div className="search_container">
                <div className="input_wrapper">
                    <svg width="21" height="20" viewBox="0 0 21 20" onClick={() => setVisible(false)} fill="none" role="img">
                        <path d="M5.68375 8.34175H19.0386C19.8754 8.34175 20.516 9.13089 20.5 10C20.484 10.8691 20 11.6789 19.0386 11.6789H5.68375L11.0932 17.1352C11.7009 17.7152 11.803 18.6483 11.3352 19.3461C11.2911 19.4036 11.2433 19.4583 11.1921 19.5096C10.5413 20.1622 9.48483 20.1636 8.83231 19.5129L0.488075 11.1687C-0.163195 10.5167 -0.162622 9.46023 0.489378 8.80896L8.83231 0.466025C8.88596 0.414403 8.94306 0.366431 9.00313 0.322422C9.74669 -0.222006 10.7908 -0.0605708 11.3352 0.682941C11.803 1.38067 11.7009 2.31377 11.0932 2.89382L5.68375 8.34175Z" fill="var(--placeholder)"/>
                    </svg>
                    <input ref={inputRef} autoFocus type="text" placeholder={t('input_placeholder')} onChange={handleChangeInput} />
                </div>
                <div className="result_wrapper">
                    {inputRef.current && inputRef.current.value ? 
                        <h5>{t('results_based')} '{inputRef.current.value}'</h5> : <>
                        <h5>{t('quick_results')}</h5>
                        <div id="places_wrappper" className="places_wrapper">
                            {places.map( _ => (
                                <div key={_.id} className="btn" onClick={() => handleLocationChange(_.location)}>
                                    {_.isRecentSeach && <svg style={{marginLeft: "10px"}} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 0C4.48591 0 0 4.48591 0 10C0 15.5141 4.48591 20 10 20C15.5141 20 20 15.5141 20 10C20 4.48591 15.5141 0 10 0ZM10 17.8142C5.69113 17.8142 2.18579 14.3089 2.18579 10C2.18579 5.69135 5.69113 2.18579 10 2.18579C14.3089 2.18579 17.8142 5.69135 17.8142 10C17.8142 14.3089 14.3089 17.8142 10 17.8142Z" fill="var(--subtitle)"/>
                                        <path d="M10.8656 10.0121V5.82084C10.8656 5.35286 10.4864 4.97363 10.0186 4.97363C9.55065 4.97363 9.17139 5.35286 9.17139 5.82084V10.2827C9.17139 10.296 9.17467 10.3085 9.17531 10.3219C9.16417 10.5522 9.24353 10.7861 9.41947 10.9621L12.5747 14.1171C12.9056 14.448 13.442 14.448 13.7727 14.1171C14.1034 13.7861 14.1036 13.2497 13.7727 12.919L10.8656 10.0121Z" fill="var(--subtitle)"/>
                                    </svg>}
                                    <p>{_.name}</p>
                                </div>
                            ))}
                        </div>
                    </>} 
                    {results.length ? results.map( feature => (
                        <div className="result_container" key={feature.id} onClick={() => { 
                            handleLocationChange(feature.center) 
                            addToLocalStorage(feature)
                        }}>
                            <p>{feature.matching_place_name || feature.place_name}</p>
                        </div>
                    )) : inputRef.current && inputRef.current.value && <p className="no_results">{t('no_results')}</p>}
                </div>
            </div>
        </div>, document.getElementById('root') 
    )
}

export default Search;