import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

const Menu = ({ showMenu, state, dispatch }) => {
    const { isDark, local, languages } = state
    const menuRef = useRef(null)
    const { t, i18n } = useTranslation()

    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang)
        dispatch({ type: 'CHANGE_LOCAL', local: lang })
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
    }

    useEffect(() => {
        if(menuRef.current)
            gsap.set('#container', {y: showMenu ? 0 : -menuRef.current.clientHeight-10})
            gsap.set('#container', {transition: "transform .3s cubic-bezier(0.4, 0, 0.2, 1)"})
    }, [showMenu])

    setTimeout(() => {
        window.deferredPrompt = {active: true}
    }, 3000);

    return (
        <section ref={menuRef} className="menu">
            <Swiper spaceBetween={20} allowTouchMove={false} navigation={{nextEl: ".nextBtn", prevEl: ".prevBtn"}}>
                <SwiperSlide className="menu-elements">
                    <div className="menu-btn">
                        <p>{t('language')}</p>
                        <div style={{display: "flex", alignItems: "center"}} className="nextBtn">
                            <p style={{color: 'var(--subtitle)', fontWeight: 400}}>{t(local.slice(0,2))}</p>
                            <span></span>
                        </div>
                    </div>
                    <div className="menu-btn">
                        <p>{t('theme')}</p>
                        <div className="toggle_btn" onClick={handleChangeTheme}>
                            <div className={isDark ? "checkbox": "checkbox checked"}></div>
                        </div>
                    </div>
                    {window.deferredPrompt && <div id="install_btn" className="menu-btn" onClick={handleInstall}>
                        <p>Install as an app</p>
                        <span></span>
                    </div>}
                </SwiperSlide>
                <SwiperSlide className="menu-elements">
                    {languages.map( (lang, index) => (
                        <div key={index} className="menu-btn prevBtn" onClick={() => handleChangeLanguage(lang) }>
                            <p>{t(lang)}</p>
                            <div className="lang_checkbox">
                                {lang===local.slice(0,2) ? <div className="lang_checked"></div> : null}
                            </div>
                        </div>
                    ))}
                </SwiperSlide>
            </Swiper>
        </section>
    )
}
export default Menu;