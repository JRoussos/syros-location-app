import React from 'react';

const Hamburger = ({showMenu, setMenuVisibility}) => {
    return (
        <div className="hamburger_wrapper">
            <div className="hamburger_btn" onClick={ e => {
                setMenuVisibility(!showMenu)
                e.currentTarget.childNodes.forEach(el => el.classList.toggle('menu-is-open'))
            }}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

const Header = ({showMenu, setMenuVisibility}) => {
    return (
        <header>
            <Hamburger showMenu={showMenu} setMenuVisibility={setMenuVisibility}/>
        </header>
    )
}

export default Header;