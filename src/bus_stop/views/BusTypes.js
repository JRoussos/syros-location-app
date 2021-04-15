import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import bus_icon from '../assets/bus.png';
import minibus_icon from '../assets/custombus.png';

const btns_arrays = [
    {title_en: 'bus', title_el: 'λεωφορείο', icon: bus_icon}, 
    {title_en: 'city bus', title_el: 'αστικό λεωφορείο', icon: minibus_icon}, 
]

const BusTypes = ({ state, dispatch }) => {
    const [ active, setActive ] = useState(0)
    const { t } = useTranslation()
    const { local } = state

    const handleCategoryChange = index => {
        setActive(index)
        dispatch({ type: 'CHANGE_TYPE', category: btns_arrays[index].title_en })
    }

    return (
        <section className="categories">
            <h5 className="animate-section">{t('bus_type_title')}</h5>
            <div className="categories_wrapper animate-section">
                {btns_arrays.map( (btn, index) => (
                    <div key={Math.random()} onClick={() => handleCategoryChange(index)} className={active === index ? "btn selected_btn" : "btn"}>
                        <img src={btn.icon} alt={btn.title_en}/>
                        <p>{local.slice(0,2)==='en' ? btn.title_en : btn.title_el}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BusTypes;