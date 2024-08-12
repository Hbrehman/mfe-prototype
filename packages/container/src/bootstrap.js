import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import App from './App.js'



const mount = (el) => {
    ReactDOM.render(
        <App />,
        el
    )
}

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_container-dev-root');
    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() })
    }
}

export { mount };
