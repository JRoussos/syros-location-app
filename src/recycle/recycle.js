import React from 'react';

import Search from './views/SearchBox';
import Categories from './views/Categories';

import './styles/recycle_styles.css';

const Recycle = ({state, dispatch, forwardRef}) => {
    return (
        <section ref={forwardRef} className="tabs_position">
            <Categories state={state} dispatch={dispatch}/>
            <Search state={state} dispatch={dispatch}/>
        </section>
    )
}

export default Recycle;