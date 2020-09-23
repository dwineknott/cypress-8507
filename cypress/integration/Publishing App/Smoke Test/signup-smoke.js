import { findByTestId } from "@testing-library/dom";

describe('Smoke Test - Account Signup Feature', () => {

    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()


    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      });

    it('Successfully create a new account', () => {
        cy.visit('/signup/');

        cy.generate_random(5).then((firstName) => {
        cy.findByTestId('first_name')
        .should('be.visible')
        .type(firstName);
        });

        cy.findByTestId('last_name')
        .should('be.visible')
        .type('Smith');

        cy.findByTestId('email')
        .should('be.visible')
        .type(id +'@songtrust.com'); //Make dynamic

        cy.findByTestId('password')
        .should('be.visible')
        .type('testing1');

        cy.findByTestId('confirm_password')
        .should('be.visible')
        .type('testing1');

        cy.findByTestId('phone_number')
        .should('be.visible')
        .type('9175541978');

        cy.findByTestId('btn-add-discount-code')
        .should('be.visible')
        .click();

        cy.findByTestId('discount-code-input')
        .should('be.visible');

        cy.findByRole('button', {name: 'Apply'})
        .should('be.visible');



        //Enter Stripe Credit Card Information
        cy.findByTestId('card_number')
        .should('be.visible')
        .type('4242424242424242');
        
        cy.findByTestId('name_on_card')
        .should('be.visible')
        .type('John Smith');

        cy.findByTestId('expiration')
        .should('be.visible')
        .type('0922');

        cy.findByTestId('security_code')
        .should('be.visible')
        .type('123');

        cy.findByTestId('tos')
        .should('be.visible')
        .click();

        cy.findByRole('button', {name: 'Submit Payment and Complete Signup'})
        .should('be.visible')
        .click();

        cy.wait(5000);
        cy.url()
        .should('contains', '/pay/');
   
    });

    it('Account creation failure - CC declined', () => {
        cy.visit('/signup/');

        cy.findByTestId('first_name')
        .should('be.visible')
        .type('John');

        cy.findByTestId('last_name')
        .should('be.visible')
        .type('Smith');

        cy.findByTestId('email')
        .should('be.visible')
        .type(id +'@songtrust.com'); //Make dynamic

        cy.findByTestId('password')
        .should('be.visible')
        .type('testing123');

        cy.findByTestId('confirm_password')
        .should('be.visible')
        .type('testing123');

        cy.findByTestId('phone_number')
        .should('be.visible')
        .type('6465557328');

        //Enter Stripe Credit Card Information
        cy.findByTestId('card_number')
        .should('be.visible')
        .type('4000000000000002');
        
        cy.findByTestId('name_on_card')
        .should('be.visible')
        .type('John Smith');

        cy.findByTestId('expiration')
        .should('be.visible')
        .type('0922');

        cy.findByTestId('security_code')
        .should('be.visible')
        .type('123');

        cy.findByTestId('tos')
        .should('be.visible')
        .click();

        cy.findByRole('button', {name: 'Submit Payment and Complete Signup'})
        .should('be.visible')
        .click();

        cy.url().should('contains', '/signup/');

        cy.wait(5000);

        cy.get('.form-error')
            .invoke('text')
            .should('equal', 'There was an error creating your account. Please contact help@songtrust.com if the issue persists.')
            .end();
    });

});


