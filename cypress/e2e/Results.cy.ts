/// <reference types="cypress" />

describe('Results Component', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('userId', '1');
    });
    cy.intercept('GET', 'https://fruga-be-340d88ac3f29.herokuapp.com/api/v1/users/1/advices', {
      statusCode: 200,
      body: {
        data: [{
          id: "1",
          attributes: {
            total_income: 5000,
            expenses: {
              needs: [
                { name: "Rent", amount: 1200 },
                { name: "Utilities", amount: 300 }
              ],
              wants: [
                { name: "Vacation", amount: 1500 },
                { name: "Dining Out", amount: 500 }
              ],
              savings: [
                { name: "Emergency Fund", amount: 500 },
                { name: "401k", amount: 800 }
              ]
            },
            advice: [
              "Consider reducing expenses on Wants.",
              "Increase Savings for better financial stability."
            ]
          }
        }]
      }
    });

    cy.visit('http://localhost:3000/results'); // Adjust URL as needed
  });

  it('should render the component correctly', () => {
    cy.get('.results').should('be.visible');
    cy.get('.budget-header h3').should('contain', 'Budget');
    cy.get('.edit').should('be.visible');
    cy.get('.budget-data').should('be.visible');
    cy.get('.suggestion').should('be.visible');
  });
  it('should display the PieChart with correct data', () => {
    cy.get('canvas').should('exist'); 
  });
  it('should show suggestions', () => {
    cy.get('.suggestion').should('contain', 'Suggestions');
    cy.get('.advice-item').should('have.length', 2);
  });
});
