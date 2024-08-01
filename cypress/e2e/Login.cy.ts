/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/log-in');
  });
  it('shows the login page', () => {
    
  })
  it('Has an input for username', () => {
   
  })
  it('Has an input for password', () => {
    
  })
  it('it has buttons', () => {
    
  })
  it('has a button to login', () => {
    
  })
  it('has a button to register', () => {
    
  })
  it('it will not let you log in without user/pass', () => {
    
  })
})
describe('register', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/log-in');
  });
  it('button for to register can be clicked', () => {
    
  })
  it('it has an input for name', () => {
   
  })
  it('Has an input for username', () => {
    
  })
  it('has an input for password', () => {
    
  })
  it('it will not allow you to register empty', () => {
    
  })
  it('has a button to go back to login', () => {
    
  })
})