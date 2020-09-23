import { RootObjects } from "../../../support/single_writer";
import { wait } from "@testing-library/dom";

describe('Smoke Test - Songwriter Details Page', () => {
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
        cy.login();
        cy.visit('/dashboard/');
    });
    
    beforeEach(() => {
        cy.server()
        cy.route('GET','/api/v1/songwriter/**')
        .as('getWriters')

    });

    beforeEach(() => {
        cy.server()
        cy.route('PATCH','/api/v1/songwriter/**')
        .as('getWriters2')

    });

    beforeEach(() => {
        cy.request({
            method: 'PATCH',
            url: '/api/v1/songwriter/1365331/',
            body: {
                bio: '',
            }
        })

    });

    it('Songwriter Details - Verify elements on page', () => {

        cy.visit('/songwriters/1365331/');

        cy.wait('@getWriters').then((xhr) => {
            const objects  = xhr.responseBody as RootObjects;
            console.log(xhr.responseBody);

            const writer: Object  = objects

                cy.get('.detail-name')
                .should('be.visible')
                .and('have.text', writer.full_name); //songwriter name

                cy.get('.light-gray-holder > :nth-child(1) > :nth-child(2)')
                .should('be.visible')
                .and('contain.text', writer.ipi) //IPI

                cy.get('.detail-email-join > :nth-child(1)')
                .should('be.visible')
                .and('contain.text', writer.email) //email

                cy.get('.detail-affiliation > :nth-child(1) > .detail-big-info')
                .should('be.visible')
                .and('contain.text', writer.pro.name) //PRO affiliation

                cy.get('.detail-affiliation > :nth-child(2) > :nth-child(1) > strong')
                .should('be.visible')
                .and('contain.text', writer.current_status[1]); //Registration Status

                cy.get('.publishing_company_tag')
                .should('be.visible')
                .and('contain.text', writer.publishing_company.name) //Publisher

                //Status Bar use 'status_log' from JSON
                cy.get('.completed > .dot')
                cy.get('.current > .fill')
                cy.get('.status-bar > .current')
                cy.get('.completed > .dot') 

                //Status Block use 'status_log' from JSON
                cy.get('.status-blocks > .current') 
                    cy.get('.current > .icon')
                    cy.get('.current > .date > .month')
                    cy.get('.current > .date > .day')
                    cy.get('.current > .status')

                cy.get('.detail-open-songs > .detail-big-info')
                .should('be.visible')
                .and('contain.text', writer.songs_open_count) //processing song #

                cy.get('.detail-closed-songs > .detail-big-info')
                .should('be.visible')
                .and('contain.text', writer.songs_closed_count) //registered song #

                //biography text box interaction begin
                cy.get('.detail-bio-field')
                .should('be.visible')
                .type('This is a test'); 

                cy.findByRole('button', {name: 'Submit Bio'})
                .should('be.visible')
                .click();

                cy.wait('@getWriters2').then((xhr) => {
                    const objects  = xhr.responseBody as RootObjects;
                    console.log(xhr.responseBody);
        
                    const writer2: Object  = objects

                        cy.get('.detail-bio-text')
                        .should('be.visible')
                        .and('have.text', writer2.bio);

                        cy.findByRole('button', {name: 'Edit Bio'})
                        .should('be.visible')
                        .click();

                        cy.get('.detail-bio-field')
                        .should('be.visible')
                        .clear();

                        cy.findByRole('button', {name: 'Submit Bio'})
                        .click();

                        cy.get('.detail-bio-text')
                        .should('not.be.visible');
                        //biography text box interaction end

                });    
                
                




        });     

    });

});    