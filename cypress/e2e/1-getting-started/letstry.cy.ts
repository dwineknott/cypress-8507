describe('Login', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
  
    it('the page renders', () => {
      cy.get('.login-page-form').should('exist');
})   
    });