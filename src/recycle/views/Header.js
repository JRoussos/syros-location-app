import React from 'react';

const Hamburger = () => {
    return (
        <div className="hamburger_wrapper">
            <div className="hamburger_btn" onClick={ e => {
                document.getElementById('container').classList.toggle('open')
                e.currentTarget.childNodes.forEach(el => el.classList.toggle('menu-is-open'))
            }}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

const Header = () => {
    return (
        <header>
            <Hamburger/>
        </header>
    )
}

export default Header;