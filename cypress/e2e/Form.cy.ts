/// <reference types="cypress" />

describe('Form', () => {
  before(() => {
    cy.intercept('POST', 'https://fruga-be-340d88ac3f29.herokuapp.com/api/v1/users/*/advices', {
      statusCode: 200,
      body: {
        data: {
          id: "3",
          type: "advice",
          attributes: {
            total_income: 5000,
            needs_total: 1200,
            wants_total: 1500,
            savings_total: 500,
            expenses: {
              needs: [
                { name: "Rent", amount: 1200, description: "", isNegotiable: false }
              ],
              wants: [
                { name: "Vacation", amount: 1500, description: "" }
              ],
              savings: [
                { name: "Emergency Fund", amount: 500, description: "" }
              ]
            },
            advice: [
              "Your submitted budget is being processed.",
              "Here's a summary of your budget: Needs: Rent $1200; Wants: Vacation $1500; Savings: Emergency Fund $500."
            ]
          }
        }
      }
    }).as('submitAdvice');

    cy.visit('http://localhost:3000/getting-started/1');
  });

  it('should be able to add a budget', () => {
    cy.get('input[name="grossIncome"]').should('be.visible').clear().type('5000').should('have.value', '5000');
    cy.contains('Next').click();
    cy.contains('Add Need').click();
    cy.get('input[name="name"]').last().type('Rent').should('have.value', 'Rent');
    cy.get('input[name="amount"]').last().clear().type('1200').should('have.value', '1200');
    cy.contains('Next').click();
    cy.contains('Add Want').click();
    cy.get('input[name="name"]').last().type('Vacation').should('have.value', 'Vacation');
    cy.get('input[name="amount"]').last().clear().type('1500').should('have.value', '1500');
    cy.contains('Next').click();
    cy.contains('Add Saving').click();
    cy.get('input[name="name"]').last().type('Emergency Fund').should('have.value', 'Emergency Fund');
    cy.get('input[name="amount"]').last().clear().type('500').should('have.value', '500');
    cy.contains('Submit').click();
    cy.wait('@submitAdvice').its('response.statusCode').should('eq', 200);
  });
});


  