import React from 'react';
import { useTranslation } from 'react-i18next';

const Title = () => {
    const { t } = useTranslation()
    return (
        <section className="title">
            <h3>{t('header_title_start')}<br/>{t('header_title_continue')}</h3>
            <div className="subtitle">
                <svg style={{ padding: "6px 6px 0 0", marginTop: "5px", overflow: "visible" }} width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="8" cy="17" rx="6" ry="2" fill="url(#paint0_radial)"/>
                    <g filter="url(#filter0_d)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.01295 2C4.0218 2.00004 1.55339 4.96861 2.06741 8.68082C2.58143 12.393 8.01285 16.5636 8.01285 16.5636C8.01285 16.5636 13.5683 12.393 13.9579 8.68082C14.3476 4.9686 12.0041 1.99996 8.01295 2ZM7.93181 10.7382C9.27236 10.7382 10.3591 9.65146 10.3591 8.31091C10.3591 6.97037 9.27236 5.88364 7.93181 5.88364C6.59127 5.88364 5.50454 6.97037 5.50454 8.31091C5.50454 9.65146 6.59127 10.7382 7.93181 10.7382Z" fill="var(--white-kinda)"/>
                    </g>
                    <defs>
                        <filter id="filter0_d" x="0" y="0" width="16" height="18.5636" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                            <feOffset/>
                            <feGaussianBlur stdDeviation="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                        </filter>
                        <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8 17) rotate(90) scale(2 6)">
                            <stop offset="0.270833" stopOpacity="0.15"/>
                            <stop offset="1" stopOpacity="0"/>
                        </radialGradient>
                    </defs>
                </svg>
                <p>{t('header_location')}</p>
            </div>
            <div className="pages_indicator">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </section>
    )
}

export default Title;