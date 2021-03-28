import React, { useState } from 'react';

import glass_icon from '../assets/glass.png';
import paper_icon from '../assets/paper.png';
import plastic_icon from '../assets/plastic.png';
import electric_icon from '../assets/electric.png';
import battery_icon from '../assets/battery.png';
import clothes_icon from '../assets/clothes.png';

const btns_arrays = [
    {title: 'plastic', icon: plastic_icon}, 
    {title: 'paper', icon: paper_icon}, 
    {title: 'glass', icon: glass_icon}, 
    {title: 'electronics', icon: electric_icon}, 
    {title: 'batteries', icon: battery_icon}, 
    {title: 'clothes', icon: clothes_icon} 
]

const Categories = ({ dispatch }) => {
    const [ active, setActive ] = useState(0)

    const handleCategoryChange = index => {
        setActive(index)
        dispatch({ type: 'CHANGE_TYPE', category: btns_arrays[index].title })
    }

    return (
        <section className="categories">
            <h5>Categories</h5>
            {/* <p>I want to recycle: </p> */}
            <div className="categories_wrapper">
                {btns_arrays.map( (_, index) => (
                    <div key={index} onClick={() => handleCategoryChange(index)} className={active === index ? "btn selected_btn" : "btn"}>
                        <img src={_.icon} alt={_.title}/>
                        <p>{_.title}</p>
                    </div>
                ))}
                <div className="btn" style={{borderColor: "transparent", marginLeft: "8px"}}></div>
            </div>
        </section>
    )
}

export default Categories;