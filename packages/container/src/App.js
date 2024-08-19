import React, { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles'
import { importRemote } from "module-federation-import-remote";

import { useHistory } from 'react-router-dom';

import Progress from './components/Progress'
import MainLayout from './components/MainLayout';

const appsToInstall = JSON.parse(localStorage.getItem('mfes'))

const AuthLazy = lazy(() => import('./components/AuthApp'))


const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory();

function getComponent(mount) {
    return () => {
        const ref = useRef(null);
        const history = useHistory();

        useEffect(() => {

            const response = mount(ref.current, {
                initialPath: history.location.pathname,
                onNavigate: ({ pathname: nextPathname }) => {
                    const { pathname } = history.location;
                    if (pathname !== nextPathname)
                        history.push(nextPathname)
                }
            });

            if (response?.onParentNavigate) {
                history.listen(response?.onParentNavigate)
            }
        }, []);

        return <div ref={ref} />
    }
}

function Welcome() {
    return <h1>WELCOME!!!</h1>
}

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [installedApps, setInstalledApps] = useState({});


    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard')
        }
    }, [isSignedIn])

    useEffect(() => {
        async function installApp() {
            let iApps = []

            if (appsToInstall) {
                for (let i = 0; i < appsToInstall.length; i++) {
                    const app = appsToInstall[i];
                    const { mount } = await importRemote({ url: app.url, scope: app.scope, module: app.module });
                    iApps = { ...iApps, [app.scope]: getComponent(mount) }
                }
            }
            setInstalledApps({ ...iApps });
        }

        installApp()
    }, [appsToInstall])

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <MainLayout isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}>
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth"> <AuthLazy onSignIn={() => setIsSignedIn(true)} /></Route>
                            {Object.keys(installedApps).map(app => {
                                return <Route keys={app} path={appsToInstall.filter(a => a.scope === app)[0].path} component={installedApps[app]} />
                            })}
                            <Route path="/" component={Welcome} />
                        </Switch>
                    </Suspense>
                </MainLayout>
            </StylesProvider>
        </Router>
    )
}
