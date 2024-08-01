/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://fruga-be-340d88ac3f29.herokuapp.com/api/v1/sessions', {
      statusCode: 200,
      body: {
        user_name: "",
        password: ""
      }
    }).as('postLogin');
    cy.visit('http://localhost:3000/log-in');
  });
  it('shows the login page', () => {
    cy.contains('Login or Register Here!').should('be.visible');
  })
  it('Has an input for username', () => {
    cy.get('input[type="text"]').should('have.class', 'login-input').should('be.visible');
  })
  it('Has an input for password', () => {
    cy.get('input[type="password"]').first().should('have.class', 'login-input').should('be.visible');
  })
  it('it has buttons', () => {
    cy.get('button').should('have.length', 3);
  })
  it('has a button to login', () => {
    cy.contains('button', 'Login').should('be.visible');
  })
  it('has a button to register', () => {
    cy.contains('button', 'Register').should('be.visible');
  })
  it('it will not let you log in without user/pass', () => {
    cy.contains('button', 'Login').click();
    cy.contains('An error occurred during login.').should('be.visible');
  })
})

describe('Register', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://fruga-be-340d88ac3f29.herokuapp.com/api/v1/users', {
      statusCode: 201,
      body: {
        data: {
          id: '2'
        }
      }
    }).as('postRegister');

    cy.visit('http://localhost:3000/log-in');
  });

  it('button to switch to register can be clicked', () => {
    cy.contains('button', 'Register').click();
    cy.contains('Confirm Password:').should('be.visible');
  });

  it('has an input for username in registration mode', () => {
    cy.contains('button', 'Register').click();
    cy.get('input.login-input').eq(0).should('be.visible');
  });

  it('has an input for password in registration mode', () => {
    // Switch to registration mode
    cy.contains('button', 'Register').click();
    cy.get('input.login-input').eq(1).should('be.visible'); 
  });

  it('it will not allow you to register empty', () => {
    cy.contains('button', 'Register').click();
    cy.contains('button', 'Register').click();
    cy.contains('Please fill in all fields correctly.').should('be.visible');
  });

  it('has a button to go back to login', () => {
    cy.contains('button', 'Register').click();
    cy.contains('button', 'Back to Login').should('be.visible');
  });
});
