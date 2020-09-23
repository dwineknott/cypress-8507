describe('Smoke Test - Login Feature', () => {


     Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      }); 

 it('Login in successfully', () => {
    cy.visit('/login/');

    cy.get('#email').should('be.visible')
    .type("demo@songtrust.com");

    cy.get('.form-group:nth-child(4)').click()
    cy.get('#password').should('be.visible')
    .type('testing');

    cy.get('.navbar-header > .btn').should('be.visible')
    .and('have.attr', 'href', '/signup'); // `Join` header button
    cy.get('#forgot-your-password').should('be.visible'); // forgot password link
    cy.get(':nth-child(2) > .col-xs-12 > .btn').should('be.visible')
    .and('have.attr', 'href', '/signup'); // `Get Started` button

    cy.server()
    cy.route('POST', '/api/v1/user/login/').as('LOGIN');
    cy.get('.col-sm-8 > .login-submit').should('be.visible')
    cy.get('#login-form').submit();
    cy.wait('@LOGIN').should((xhr) => {
    expect(xhr.status, 'successful POST').to.equal(200);
    
    cy.wait(2000);
    cy.url().should('contains', '/dashboard/').end();
});



})
it('Login attempt - invalid credentials', () => {
    cy.visit('/login/');

    cy.get('#email').should('be.visible')
    .type("demo@songtrust.com");

    cy.get('.form-group:nth-child(4)').click()
    cy.get('#password').should('be.visible')
    .type('dkdkdk');

    cy.server()
    cy.route('POST', '/api/v1/user/login/').as('LOGIN');
    cy.get('.col-sm-8 > .login-submit').should('be.visible')
    cy.get('#login-form').submit();
    cy.wait('@LOGIN').should((xhr) => {
    expect(xhr.status, 'successful POST').to.equal(401);
    });

    cy.get('#login_error_msg').should('be.visible')
    .and('contain.text', 'Email or password is incorrect').end();


})

})