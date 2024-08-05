import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Landing from './components/Landing'
import Pricing from './components/Pricing'

const generateClassName = createGenerateClassName({
  productionPrefix: 'ma'
})

export default function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
        <Switch>
            <Route exact path='/pricing' component={Pricing}/>
            <Route exact path='/' component={Landing} />
        </Switch>
          </BrowserRouter>
    </StylesProvider>
  )
}
