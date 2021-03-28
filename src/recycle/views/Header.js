import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hamburger = () => {
    const tl = useRef(gsap.timeline({ reversed: true, paused: true}))

    useEffect(() => {
        tl.current.to('#container', {duration: .3, y: 0, ease: 'sine.inOut'})
    }, [])

    return (
        <div className="hamburger_wrapper">
            <div className="hamburger_btn" onClick={ e => {
                    tl.current.reversed() ? tl.current.play() : tl.current.reverse()
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