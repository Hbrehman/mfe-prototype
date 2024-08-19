import React from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { Switch, Route, Router } from 'react-router-dom';

import GiveFeedback from './components/GiveFeedback'
import RequestFeedback from './components/RequestFeedback'

const generateClassName = createGenerateClassName({
  productionPrefix: 'fe'
})

export default function App({ history }) {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Switch>
          <Route exact path='/feedback' component={GiveFeedback} />
          <Route exact path='/feedback/request-feedback' component={RequestFeedback} />
        </Switch>
      </Router>
    </StylesProvider>
  )
}
