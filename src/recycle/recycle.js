import React, { useReducer, useEffect } from 'react';

import Header from './views/Header';
import Menu from './views/Menu';
import Title from './views/swipable-title';
import Search from './views/SearchBox';
import Categories from './views/Categories';
import Map from './views/Map';
import Footer from './views/Footer';

import './styles/recycle_styles.css';

const initialState = {
    isDark: localStorage.getItem('theme_dark')==='true' || false,
    local: localStorage.getItem('i18nextLng') || navigator.language.slice(0,2),
    location: [24.941304, 37.445081],
    languages: [ 'en', 'el'],
    syrosBounds: [[24.844369, 37.356365], [24.993442, 37.521599]],
    category: 'plastic'
}

const recycleReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_LOCATION':
            return { ...state, location: action.location }
        case 'CHANGE_TYPE':
            return { ...state, category: action.category }
        case 'CHANGE_THEME':
            return { ...state, isDark: action.isDark }
        case 'CHANGE_LOCAL': 
            return { ...state, local: action.local }
        default:
            throw new Error();
    }
}

const Recycle = () => {
    const [state, dispatch] = useReducer( recycleReducer, initialState );

    useEffect(() => {
        document.body.classList.toggle('dark', state.isDark)
    }, [state])

    return (
        <main className="background">
            <Header/>
            <article id="container">
                <Menu state={state} dispatch={dispatch}/>
                <Title/>
                <Categories state={state} dispatch={dispatch}/>
                <Search state={state} dispatch={dispatch}/>
                <Map state={state}/>
                <Footer/>
            </article>
        </main>
    )
}

export default Recycle;