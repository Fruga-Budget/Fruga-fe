/// <reference types="cypress" />

describe('SavedBudgets Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/saved-budgets', {
        onBeforeLoad(win) {
          win.localStorage.setItem('userId', 'test-user-id');
        }
      });
    });
  
    it('should display budgets correctly after successful fetch', () => {
      cy.fixture('successfulBudgets').then((budgets) => {
        cy.intercept('GET', 'https://fruga-be-340d88ac3f29.herokuapp.com/api/v1/users/test-user-id/advices', {
          statusCode: 200,
          body: { data: budgets },
        }).as('fetchUserBudgets');
        cy.wait('@fetchUserBudgets');
        cy.get('.single-budget').should('have.length', budgets.length);
  
        budgets.forEach((budget, index) => {
          cy.get('.single-budget').eq(index).within(() => {
            cy.contains(`Budget #${budget.id}`);
            cy.contains(`Income: $${budget.attributes.total_income}`);
            cy.contains(`Needs: $${budget.attributes.needs_total}`);
            cy.contains(`Wants: $${budget.attributes.wants_total}`);
            cy.contains(`Savings: $${budget.attributes.savings_total}`);
          });
        });
      });
    });
  });
  