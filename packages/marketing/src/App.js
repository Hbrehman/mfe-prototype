import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import React from 'react'

// BrowserRouter internally creates a copy of browser history 
// Router: simple Router allows us to provide history object we wanted to use rather then react-router-dom 
// create history object for us. Router does not create its own history which means we have to provide history to use
// 
import { Switch, Route, Router } from 'react-router-dom/cjs/react-router-dom.min';
import Landing from './components/Landing'
import Pricing from './components/Pricing'

const generateClassName = createGenerateClassName({
  productionPrefix: 'ma'
})

export default function App({ history }) {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Switch>
            <Route exact path='/pricing' component={Pricing}/>
            <Route exact path='/' component={Landing} />
        </Switch>
      </Router>
    </StylesProvider>
  )
}
