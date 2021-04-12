import React from 'react';

import Search from './views/SearchBox';
import Categories from './views/Categories';
import Map from './views/Map';

import './styles/recycle_styles.css';

const Recycle = ({state, dispatch}) => {
    return (
        <section className="tabs_position">
            <Categories state={state} dispatch={dispatch}/>
            <Search state={state} dispatch={dispatch}/>
            {/* <Map state={state}/> */}
        </section>
    )
}

export default Recycle;