import {getDefaultNormalizer} from '@testing-library/dom'


describe('Smoke Test - Manage Songwriters', () => {
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
        cy.route('GET','/api/v1/songwriter/?songwriter_type=client&**')
        .as('getWriters')

    });
 

    it('Manage Songwriters - Verify elements on page', () => {
        cy.visit('/songwriters/')
        cy.wait('@getWriters').then((xhr) => {
            const { objects } = xhr.responseBody as RootObject;

            if(objects.length > 0) {
                console.log(objects[0]);

            }
        cy.findByRole('link', {name: 'Songtrust Writers'})
        .should('be.visible')
        .and('have.attr', 'href', '#');

        cy.findByRole('link', {name: 'Outside Writers'})
        .should('be.visible')
        .and('have.attr', 'href', '#outside');
    
        cy.findByRole('link', {name: 'Add songwriter'})
        .should('be.visible')
        .and('have.attr', 'href', '#add');
    
        cy.get('.songwriter-search')
        .should('be.visible');
    
        cy.get('#songwriter-count')
        .should('be.visible');
    
        cy.get('.grid-pager')
        .should('be.visible');    
         
         cy.get('.manage-writer-view > :nth-child(1) > #writer-list > li')
            .should('have.length', 10)
            .each(($writerList, index) => {

                const writer: Object  = objects[index]

                cy.wrap($writerList).within(() => {
                    
                   cy.findAllByText(RegExp(writer.full_name, "i"),
                     {normalizer: str => getDefaultNormalizer ({trim: true})(str).replace(/^\s+|\s+$|\s+(?=\s)/g,"")}
    
                    )
                    .should('be.visible')

                    cy.findByRole('link', {name: RegExp(writer.full_name, "i")})
                    .should('be.visible');

                    if (Cypress._.isNull(writer.publishing_company)) {
                        cy.get('.songwriter-name > .writer-name-holder > p').should('not.be.visible');
                       // expect('.songwriter-name > .writer-name-holder > p').to.not.exist
                        } else {
                        cy.get('.songwriter-name > .writer-name-holder > p')
                        .should('include.text', writer.publishing_company.name);
                        };                    

                    cy.findByText(writer.email, {selector: 'span'})
                    .should('be.visible');     
                    
                    cy.findByText(writer.pro.name)
                    .should('be.visible');

                    cy.findByText(writer.payee)
                    .should('be.visible');

                    cy.get('.songwriter-status-tracker > .status-mask')
                    .should('have.attr', 'data-content')
                    .and('include.string', writer.current_status[1]);

                    cy.findByText(
                        Cypress.moment(writer.created)
                        .format('MMM DD, YYYY'))
                        .should('be.visible');

                    cy.get('.access-img')  
                        .should('have.attr', 'src')
                        .and('include.string', '/static/img/icons/user.png');
                    
                    cy.get('.access-popover__message')
                        .should('exist')
                        .and('have.text', writer.has_access);



                
                    //iterate over each element within each `.songwriter`
               
                });

            });

        });

        
    });


});





