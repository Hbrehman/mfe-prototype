import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles'

import Progress from './components/Progress'
import MainLayout from './components/MainLayout';

const FeedbackLazy = lazy(() => import('./components/FeedbackApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))
const DashboardLazy = lazy(() => import('./components/DashboardApp'))


const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory();

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard')
        }
    }, [isSignedIn])

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <MainLayout isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}>
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to='/' />}
                                <DashboardLazy />
                            </Route>
                            <Route path="/" component={FeedbackLazy} />
                        </Switch>
                    </Suspense>
                </MainLayout>
            </StylesProvider>
        </Router>
    )
}
