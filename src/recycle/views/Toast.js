import React from 'react';
import { createPortal } from 'react-dom';

const Toast = ({ message, type }) => {

    return createPortal(
        <div id="toast" className={type || "info"}>
            <p>{message}</p>
        </div>, document.getElementById('root')
    )
}

export default Toast;