import React from 'react';

import Search from '../recycle/views/SearchBox';

import '../styles/recycle_styles.css';

const Recycle = ({state, dispatch, forwardRef}) => {
    return (
        <section ref={forwardRef} className="tabs_position">
            <Search state={state} dispatch={dispatch}/>
        </section>
    )
}

export default Recycle;