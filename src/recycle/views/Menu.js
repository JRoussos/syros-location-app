import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault()
    window.deferredPrompt = event

    document.getElementById('install_btn').classList.remove('hidden');
    console.log(`'beforeinstallprompt' event was fired.`)
})

window.addEventListener('appinstalled', () => {
    window.deferredPrompt = null;
    
    console.log(`'appinstalled' event was fired.`)
})

const Menu = ({ state, dispatch }) => {
    const { isDark, local } = state
    const menuRef = useRef(null)
    const { t, i18n } = useTranslation()

    const handleChangeLanguage = () => {
        const changeTo = local==='en' ? 'el' : 'en'

        i18n.changeLanguage(changeTo)
        dispatch({ type: 'CHANGE_LOCAL', local: changeTo })
    }

    const handleChangeTheme = () => {
        dispatch({ type: 'CHANGE_THEME', isDark: !isDark })
        localStorage.setItem('theme_dark', !isDark);
        document.getElementsByClassName('checkbox')[0].classList.toggle('checked', isDark)
    }

    const handleInstall = async () => {
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) return;

        promptEvent.prompt();
        await promptEvent.userChoice;

        window.deferredPrompt = null;

        document.getElementById('install_btn').classList.add('hidden');
    }

    useEffect(() => {
        if(menuRef.current)
            gsap.set('#container', {y: -menuRef.current.clientHeight})
            gsap.set('#container', {transition: "transform .3s cubic-bezier(0.4, 0, 0.2, 1)"})
    }, [])

    return (
        <section ref={menuRef} className="menu">
            <div className="menu-elements">
                <div className="menu-btn">
                    <p>{t('language')}</p>
                    <div style={{display: "flex", alignItems: "center"}} onClick={handleChangeLanguage}>
                        <p style={{color: 'var(--subtitle)', fontWeight: 400}}>{t(local)}</p>
                        <span></span>
                    </div>
                </div>
                <div className="menu-btn">
                    <p>{t('theme')}</p>
                    <div className="toggle_btn" onClick={handleChangeTheme}>
                        <div className={isDark ? "checkbox": "checkbox checked"}></div>
                    </div>
                </div>
                <div id="install_btn" className="menu-btn hidden" onClick={handleInstall}>
                    <p>Install as an app</p>
                    <span></span>
                </div>
            </div>
        </section>
    )
}
export default Menu;