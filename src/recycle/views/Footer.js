import React from 'react';
import heart from '../assets/heart.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="links">
                <a href="mailto:someone@yoursite.com?subject=SYROS SPOT REPORT">Feedback</a>
                {/* <div className="dot"></div> */}
                <a href="/">Privacy</a>
                {/* <div className="dot"></div> */}
                <a href="/">About</a>
            </div>
            <p>Made with <img style={{width: "15px", marginBottom: "-2px"}} src={heart} alt="heart"/> by <a href="https://johnroussos.me/">J.R.</a></p>
        </footer>
    )
}

export default Footer;