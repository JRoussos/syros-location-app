import React, { useReducer, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { SwitchTransition, Transition } from 'react-transition-group';
import { gsap } from 'gsap';

import Water from './water/water';
import Stops from './bus_stop/bus_stop';
import Recycle from './recycle/recycle';

import Header from './components/Header';
import Menu from './components/Menu';
import Title from './components/swipable-title';
import Map from './recycle/views/Map';
import Footer from './components/Footer';
import Toast from './components/Toast';

import './styles/recycle_styles.css';

window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault()
    window.deferredPrompt = event

    console.log(`'beforeinstallprompt' event was fired.`)
})

window.addEventListener('appinstalled', () => {
    window.deferredPrompt = null;
    
    console.log(`'appinstalled' event was fired.`)
})

const initialState = {
    isDark: localStorage.getItem('theme_dark')==='true' || false,
    local: localStorage.getItem('i18nextLng').slice(0,2) || navigator.language.slice(0,2),
    location: [24.941304, 37.445081],
    languages: [ 'en', 'el'],
    syrosBounds: [ [24.84, 37.35], [24.99, 37.52] ],
    category: 'plastic',
    links: [
      { path: '/recycle', title: 'header_title_continue_recycle', Component: Recycle },
      { path: '/water', title: 'header_title_continue_water', Component: Water },
      { path: '/buses', title: 'header_title_continue_bus', Component: Stops },
    ],
    swipeDirection: 0
}

const appReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_LOCATION':
            return { ...state, location: action.location }
        case 'CHANGE_TYPE':
            return { ...state, category: action.category }
        case 'CHANGE_THEME':
            return { ...state, isDark: action.isDark }
        case 'CHANGE_LOCAL': 
            return { ...state, local: action.local }
        case 'CHANGE_SWIPE_DIRECTION': 
            return { ...state, swipeDirection: action.swipeDirection }
        default:
            throw new Error();
    }
}

const ContentAndTransitions = ({state, dispatch}) => {
    const routerLocation = useLocation()
    const nodeRef = useRef() 

    return(
        <SwitchTransition>
                <Transition key={routerLocation.key} nodeRef={nodeRef} appear timeout={{enter: 300, exit: 200}}
                    onEnter={(node, appears) => {
                        gsap.fromTo(
                            '.animate-section', 
                            {x: `${100*state.swipeDirection}%`},
                            {duration: 0.3, x: 0, opacity: 1, ease: "back.out(1)", stagger: 0.02}
                        )}
                    }
                    onExit={(node, appears) => {
                        gsap.fromTo(
                            '.animate-section', 
                            {x: 0},
                            {duration: 0.2, x: `${-40*state.swipeDirection}%`, opacity: 0, ease: "back.out(1)", stagger: 0.02}
                        )}
                    }
                >
                <Switch location={routerLocation} key={routerLocation.key}>
                    <Route exact path="/"><Redirect to="/recycle"/></Route>
                    <Route exact path="/recycle" children={<Recycle forwardRef={nodeRef} state={state} dispatch={dispatch} /> }/>
                    <Route exact path="/water" children={<Water forwardRef={nodeRef} state={state} dispatch={dispatch} /> } />
                    <Route exact path="/buses" children={<Stops forwardRef={nodeRef} state={state} dispatch={dispatch} /> } />
                </Switch>
            </Transition>
        </SwitchTransition>
    )
}

const App = () => {
    const [state, dispatch] = useReducer( appReducer, initialState );
    const [ showMenu, setMenuVisibility ] = useState(false)

    useEffect(() => {
        document.body.classList.toggle('dark', state.isDark)
    }, [state])

    return (
        <main className="background">
            <Header showMenu={showMenu} setMenuVisibility={setMenuVisibility}/>
            <article id="container">
                <Menu showMenu={showMenu} state={state} dispatch={dispatch}/>
                <BrowserRouter>
                    <Title state={state} dispatch={dispatch}/>
                    <ContentAndTransitions state={state} dispatch={dispatch}/>
                    <Map state={state}/>
                </BrowserRouter>
                <Footer/>
                <Toast/>
            </article>
        </main>
    )
}

export default App;
