import React, { useEffect } from 'react';

import Search from '../recycle/views/SearchBox';
import BusTypes from './views/BusTypes';

import '../styles/recycle_styles.css';

const Recycle = ({state, dispatch, forwardRef}) => {

    useEffect(() => {
        dispatch({ type: 'CHANGE_TYPE', category: 'bus' })
    }, [dispatch])
    
    return (
        <section ref={forwardRef} className="tabs_position">
            <BusTypes state={state} dispatch={dispatch}/>
            <Search state={state} dispatch={dispatch}/>
        </section>
    )
}

export default Recycle;