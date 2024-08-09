import React from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Competencies from './components/Competencies'

const generateClassName = createGenerateClassName({
  productionPrefix: 'com'
})

export default function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Competencies />
    </StylesProvider>
  )
}
