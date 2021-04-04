import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

const Menu = ({ state, dispatch }) => {
    const { theme, local } = state
    const menuRef = useRef(null)
    const { t, i18n } = useTranslation()

    const handleChangeLanguage = () => {
        const changeTo = local==='en' ? 'el' : 'en'

        i18n.changeLanguage(changeTo)
        dispatch({ type: 'CHANGE_LOCAL', local: changeTo })
    }

    const handleChangeTheme = () => {
        // document.body.classList.toggle('dark')
        // gsap.to('.checkbox', {duration: 0.3, marginLeft: 3, ease: 'power3.inOut'})
        document.getElementsByClassName('checkbox')[0].classList.toggle('checked')
        // dispatch({ type: 'CHANGE_THEME', theme: theme==='light' ? 'dark' : 'light' })
    }

    useEffect(() => {
        if(menuRef.current)
            gsap.set('#container', {y: -menuRef.current.clientHeight})
    }, [])

    return (
        <div ref={menuRef} className="menu" style={{paddingTop: "85px", paddingBottom: "25px"}}>
            <div className="menu-elements">
                <div className="menu-btn" onClick={handleChangeLanguage}>
                    <p>{t('language')}</p>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <p style={{color: 'var(--subtitle)', fontWeight: 400}}>English</p>
                        <span></span>
                    </div>
                </div>
                <div className="menu-btn" onClick={handleChangeTheme}>
                    <p>{t('theme')}</p>
                    <div className="toggle_btn">
                        <div className="checkbox"></div>
                    </div>
                </div>
                <div className="menu-btn">
                    <p>Install as an app</p>
                    <span></span>
                </div>
            </div>
        </div>
    )
}
export default Menu;