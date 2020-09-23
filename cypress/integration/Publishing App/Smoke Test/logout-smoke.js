describe('Smoke Test - Logout Feature', () => {

  
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    });

    beforeEach(() => {
      cy.login()
      cy.visit('/dashboard/')

})  
    
      it('Logout', () => {
        cy.getCookie('sessionid').should('exist');

        cy.logout().should('have.property', 'status', 200),
        // Below click action is not working currently: https://github.com/cypress-io/cypress/issues/7614
        // cy.get('.fa-bars').click() 
        // cy.get('#logout-submit').click()
        cy.getCookie('sessionid').should('not.exist')
        cy.visit('/login/').end();
  
      });
  })    