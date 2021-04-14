import React, { useEffect } from 'react';

import Search from './views/SearchBox';
import Categories from './views/Categories';

import '../styles/recycle_styles.css';

const Recycle = ({state, dispatch, forwardRef}) => {

    useEffect(() => {
        dispatch({ type: 'CHANGE_TYPE', category: 'plastic' })
    }, [])

    return (
        <section ref={forwardRef} className="tabs_position">
            <Categories state={state} dispatch={dispatch}/>
            <Search state={state} dispatch={dispatch}/>
        </section>
    )
}

export default Recycle;