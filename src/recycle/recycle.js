import React, { useReducer } from 'react';
// import { useCollection } from 'react-firebase-hooks/firestore';

import Header from './views/Header';
import Menu from './views/Menu';
import Title from './views/Title';
import Search from './views/Search';
import Categories from './views/Categories';
import Map from './views/Map';
import Footer from './views/Footer';

import './styles/recycle_styles.css';

const initialState = {
    theme: 'light',
    location: [[24.942510526728135, 37.44061640827948]],
    category: 'plastic'
}


const recycleReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_LOCATION':
            return { ...state, location: action.location }
        case 'CHANGE_TYPE':
            return { ...state, category: action.category }
        case 'CHANGE_THEME':
            return { ...state }
        default:
            throw new Error();
    }
}

const Recycle = () => {
    const [state, dispatch] = useReducer( recycleReducer, initialState );
  
    // const handleIncrease = () => {
    //   dispatch({ type: 'CHANGE_LOCATION', location: 'Galissas'});
    // };
  
    // const handleDecrease = () => {
    //   dispatch({ type: 'CHANGE_TYPE', category: 'glass' });
    // };

    return (
        <main className="background">
            <Header/>
            <article id="container">
                <Menu/>
                <Title/>
                <Search dispatch={dispatch}/>
                <Categories dispatch={dispatch}/>
                <Map state={state}/>
                <Footer/>
            </article>
        </main>
    )
}

export default Recycle;