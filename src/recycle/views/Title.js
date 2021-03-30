import React from 'react';
import { useTranslation } from 'react-i18next';

const Title = () => {
    const { t } = useTranslation()
    return (
        <section className="title">
            <h3>{t('header_title_start')}<br/>{t('header_title_continue')}</h3>
            <div className="subtitle">
                <svg style={{ padding: "5px", paddingLeft: 0, marginTop: "5px", overflow: "visible", fill: "var(--title)", fillOpacity: "0.60" }} width="21" height="21" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.5837 4.06594e-10C6.47301 4.05035e-05 3.93063 3.05756 4.46005 6.881C4.98947 10.7044 10.5836 15 10.5836 15C10.5836 15 16.3056 10.7044 16.7069 6.88099C17.1082 3.05755 14.6945 -4.07134e-05 10.5837 4.06594e-10ZM10.5 8.9999C11.8807 8.9999 13 7.88061 13 6.4999C13 5.11919 11.8807 3.9999 10.5 3.9999C9.1193 3.9999 8.00002 5.11919 8.00002 6.4999C8.00002 7.88061 9.1193 8.9999 10.5 8.9999Z"/>
                    </g>
                    <defs>
                        <filter id="filter0_d" x="0.390625" y="0" width="20.3596" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                        </filter>
                    </defs>
                </svg>
                <p>{t('header_location')}</p>
            </div>
        </section>
    )
}

export default Title;