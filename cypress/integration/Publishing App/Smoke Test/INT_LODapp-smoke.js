describe('Add a songwriter successfully', () => {
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
            cy.route('POST', '/api/v1/lod/').as('lod');

        });

    it('Successfully Submit LOD App To Non-US Entity - IMRO ', () => {
        //Begin LOD funnel workflow
        cy.visit('/songwriters/#add');
        cy.findByTestId('show-lod-pros-button')
        .click();
        cy.findByTestId('lod-pro-selections')
        .select('IMRO', {force:true});
        cy.findByTestId('lod-pro-selections')
        .should('have.value', 'IMRO');
        cy.findByTestId('continue-to-form')
        .click();
        
        /////LOD Form - IMRO///////
        cy.url()
        .should('contains', '/songwriters/#add/lod-form');

        cy.findByTestId('first-name')
        .should('be.visible')
        .type('Frank');

        cy.findByTestId('middle-name')
        .should('be.visible');

        cy.findByTestId('last-name')
        .should('be.visible')
        .type('Ikiseh');

        cy.findByTestId('id_email')
        .should('be.visible')
        .type(id +'imro@songtrust.com');

        cy.findByTestId('id_writer_id')
        .should('be.visible')
        .type('01047205098');

        cy.findByTestId('lod-us-representation')
        .should('be.visible')
        .select('ASCAP', {force: true});

        cy.findByTestId('pubco_no')
        .should('be.visible');

        cy.findByTestId('pubco_yes')
        .should('be.visible')
        .click();

        cy.findByTestId('id_publishing_company')
        .should('be.visible')
        .type('Alpha Music');

        cy.findByTestId('publishing_company_pro')
        .should('be.visible')
        .select('ASCAP', {force: true});

        cy.findByTestId('id_publisher_id')
        .should('be.visible')
        .type('697403510');

        //Signature Modal
        cy.get('.type-toggle')
        .should('be.visible')
        .click();

        cy.get('.typed-signature-field')
        .should('be.visible')
        .type('Frank Ikiseh');

        //Submit Form - IMRO
        cy.get('.standard')
        .should('be.visible')
        .click();
        cy.wait('@lod').should((xhr) => {
          expect(xhr.status, 'successfull POST').to.equal(201);
        })

        //Success modal - NOT REACHABLE DUE TO CYPRESS BUG
        cy.findByRole('link', {name: 'Back to Songwriters'})
        .should('be.visible')
        .click();

        //Back to Songwriters Main Page
        cy.url()
        .should('contains', '/songwriters/');

        cy.get('.songwriter:nth-child(1)')
        .should('exist');

        cy.get('.songwriter:nth-child(1) .writer-email')
        .should('contain', id)
        .end();
        

    });

    
});