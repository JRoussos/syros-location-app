import React, { useReducer, useEffect } from 'react';
import { BrowserRouter, Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { SwitchTransition, Transition } from 'react-transition-group';
import { gsap } from 'gsap';

import Water from './water/water';
import Stops from './bus_stop/bus_stop';
import Recycle from './recycle/recycle';

import Header from './components/Header';
import Menu from './components/Menu';
import Title from './components/swipable-title';
import Footer from './components/Footer';

import './recycle/styles/recycle_styles.css';

const initialState = {
    isDark: localStorage.getItem('theme_dark')==='true' || false,
    local: localStorage.getItem('i18nextLng') || navigator.language.slice(0,2),
    location: [24.941304, 37.445081],
    languages: [ 'en', 'el'],
    syrosBounds: [ [24.84, 37.35], [24.99, 37.52] ],
    category: 'plastic',
    links: [
      { path: '/recycle', name: 'Recycle Location', Component: Recycle },
      { path: '/water', name: 'Potable Water', Component: Water },
      { path: '/bus-stops', name: 'Bus Stops', Component: Stops },
    ],
    swipeDirection: 1
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
            return { ...state, swipeDirection: action.swipeDirection === "left" ? 1 : -1 }
        default:
            throw new Error();
    }
}

const ContentAndTransitions = ({state, dispatch}) => {
    const routerLocation = useLocation()

    return(
        <SwitchTransition>
                <Transition key={routerLocation.key} appear timeout={{enter: 300, exit: 200}}
                    onEnter={(node, appears) => {
                        gsap.fromTo(
                            node.querySelectorAll('.animate-section'), 
                            {x: `${100*state.swipeDirection}%`},
                            {duration: 0.3, x: 0, ease: "back.out(1)", stagger: 0.05}
                        )}
                    }
                    onExit={(node, appears) => {
                        gsap.fromTo(
                            node.querySelectorAll('.animate-section'), 
                            {x: 0},
                            {duration: 0.2, x: `${-40*state.swipeDirection}%`, opacity: 0, ease: "back.out(1)", stagger: 0.05}
                        )}
                    }
                >
                <Switch location={routerLocation} key={routerLocation.key}>
                    <Route exact path="/"><Redirect to="/recycle"/></Route>
                    <Route exact path="/recycle" children={<Recycle state={state} dispatch={dispatch} /> }/>
                    <Route exact path="/water" children={<Recycle state={state} dispatch={dispatch} /> } />
                    <Route exact path="/bus-stops" children={<Recycle state={state} dispatch={dispatch} /> } />
                </Switch>
            </Transition>
        </SwitchTransition>
    )
}

const App = () => {
    const [state, dispatch] = useReducer( appReducer, initialState );

    useEffect(() => {
        document.body.classList.toggle('dark', state.isDark)
    }, [state])

    return (
        <main className="background">
            <Header/>
            <article id="container">
                <Menu state={state} dispatch={dispatch}/>
                <BrowserRouter>
                    <Title state={state} dispatch={dispatch}/>
                    <ContentAndTransitions state={state} dispatch={dispatch}/>
                </BrowserRouter>
                <Footer/>
            </article>
        </main>
    )
}

export default App;
