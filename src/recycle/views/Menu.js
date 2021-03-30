import React from 'react';
import { useTranslation } from 'react-i18next';

import us from '../assets/us.png';
import el from '../assets/el.png';

import sun from '../assets/sun.png';
import moon from '../assets/moon.png';

const Menu = ({ state, dispatch }) => {
    const { theme, local } = state
    const { t, i18n } = useTranslation()

    const handleChangeLanguage = () => {
        const changeTo = local==='en' ? 'el' : 'en'

        i18n.changeLanguage(changeTo)
        dispatch({ type: 'CHANGE_LOCAL', local: changeTo })
    }

    const handleChangeTheme = () => {
        document.body.classList.toggle('dark')
        dispatch({ type: 'CHANGE_THEME', theme: theme==='light' ? 'dark' : 'light' })
    }

    return (
        <div className="menu" style={{height: "250px"}}>
            <div className="menu-elements">
                <div className="menu-btn" onClick={handleChangeLanguage}>
                    {local === 'en' ? <img src={us} alt="us-flag"/> : <img src={el} alt="el-flag"/>}
                    <p>{t('language')}</p>
                </div>
                <div className="menu-btn" onClick={handleChangeTheme}>
                    {theme === 'light' ? <img src={sun} alt="light mode"/> : <img src={moon} alt="dark mode"/> }    
                    <p>{t('theme')}</p>
                </div>
            </div>
        </div>
    )
}
export default Menu;