import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import glass_icon from '../assets/glass.png';
import paper_icon from '../assets/package.png';
import plastic_icon from '../assets/cup.png';
import electric_icon from '../assets/electric.png';
import battery_icon from '../assets/battery.png';
import clothes_icon from '../assets/clothes.png';

const btns_arrays = [
    {title_en: 'plastic', title_el: 'πλαστικό', icon: plastic_icon}, 
    {title_en: 'paper', title_el: 'χαρτί', icon: paper_icon}, 
    {title_en: 'glass', title_el: 'γυαλί', icon: glass_icon}, 
    {title_en: 'electronics', title_el: 'ηλεκτρικές συσκευές', icon: electric_icon}, 
    {title_en: 'batteries', title_el: 'μπαταρίες', icon: battery_icon}, 
    {title_en: 'clothes', title_el: 'ρούχα', icon: clothes_icon} 
]

const Categories = ({ state, dispatch }) => {
    const [ active, setActive ] = useState(0)
    const { t } = useTranslation()
    const { local } = state

    const handleCategoryChange = index => {
        setActive(index)
        dispatch({ type: 'CHANGE_TYPE', category: btns_arrays[index].title_en })
    }

    return (
        <section className="categories">
            <h5 className="animate-section">{t('categories_title')}</h5>
            <div className="categories_wrapper animate-section">
                {btns_arrays.map( (_, index) => (
                    <div key={index} onClick={() => handleCategoryChange(index)} className={active === index ? "btn selected_btn" : "btn"}>
                        <img src={_.icon} alt={_.title}/>
                        <p>{local==='en' ? _.title_en : _.title_el}</p>
                    </div>
                ))}
                <div className="btn"></div>
            </div>
        </section>
    )
}

export default Categories;