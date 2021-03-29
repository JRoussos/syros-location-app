import React from 'react';
import { createPortal } from 'react-dom';

export const showToast = (message, type="default", timeout) => {
    const toast = document.getElementById('toast')
    const cls = ['show', type]

    toast.style.setProperty('--timeout', `${(timeout-500) / 1000}s` )
    
    toast.firstChild.innerHTML = message
    toast.classList.add(...cls)     
    setTimeout(() => {
        toast.classList.remove('show')     
    }, timeout);
}

const Toast = () => { 
    return createPortal(
        <div id="toast">
            <p></p>
        </div>, document.getElementById('root') 
    )
}

export default Toast;