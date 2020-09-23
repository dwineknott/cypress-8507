describe('Smoke Test - Song Feature', () => {
    //random number generator
    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    });

    //login custom command
    beforeEach(() => {
        cy.login()
        cy.visit('/dashboard/')
    });  

    beforeEach(() => {
      cy.server()
      cy.route('POST','/api/v1/songwriter/')
      .as('postWriter');

  });


it('Successfully add a song to an account', () => {
    cy.visit('/songwriters/#outside/add');

    cy.findByTestId('new-songwriter-email')
    .should('be.visible')
    .type(id +'outside@songtrust.com');

    cy.findByTestId('first-name')
    .should('be.visible')
    .type('Ritchie');

    cy.findByTestId('middle-name')
    .should('be.visible')
    .type('Aaron');

    cy.findByTestId('last-name')
    .should('be.visible')
    .type('James');

    cy.findByTestId('alternate-outside-name-toggle')
    .should('be.visible')
    .click();

    cy.get('.alternate_name')
    .should('be.visible');

    cy.findByRole('button', {name: 'Remove'})
    .should('be.visible')
    .click();

    cy.get('.alternate_name')
    .should('not.be.visible');

    cy.findByTestId('new-songwriter-pro')
    .should('be.visible')
    .select('ASCAP');

    cy.findByTestId('new-songwriter-ipi')
    .should('be.visible')
    .type('678671293')

    cy.findByRole('link', {name: 'Back'})
    .should('be.visible')
    .and('have.attr','href', '#outside');

    cy.findByRole('button', {name: 'Add Outside Songwriter'})
    .should('be.visible')
    .click();

    cy.wait('@postWriter').should((xhr) => {
        expect(xhr.status, 'successful POST').to.equal(201);
    });

    cy.url()
    .should('contains', '/songwriters/#outside/add');

    cy.get(':nth-child(1) > .songwriter-name .writer-email')
    .should('contain', id)
    .end();










});

});