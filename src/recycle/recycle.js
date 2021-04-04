import React, { useReducer, useEffect } from 'react';
// import { useCollection } from 'react-firebase-hooks/firestore';

import Header from './views/Header';
import Menu from './views/Menu';
import Title from './views/swipable-title';
import Search from './views/Search';
import Categories from './views/Categories';
import Map from './views/Map';
import Footer from './views/Footer';

import './styles/recycle_styles.css';

const initialState = {
    theme: 'light',
    local: 'en',
    location: [24.941304, 37.445081],
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
            return { ...state, theme: action.theme }
        case 'CHANGE_LOCAL': 
            return { ...state, local: action.local }
        default:
            throw new Error();
    }
}

const Recycle = () => {
    const [state, dispatch] = useReducer( recycleReducer, initialState );

    useEffect(() => {
        // gsap.to('section', {delay: 1, force3D: true, duration: 0.5, opacity: 1, y: 20, ease: 'power2.inOut', stagger: 0.1})
    }, [])

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