import React from 'react'
import Header from '../../src/Header/Header'
// import 'cypress/react18';

describe('<Header />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Header />)
  })
})