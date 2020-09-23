
describe('Smoke Test - ASCAP/BMI PRO App feature', () => {

    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      });

      beforeEach(() => {
        cy.login()
        cy.visit('/dashboard/')
       
    });
    
      beforeEach (() => {
        cy.server()
        cy.route('POST', '/api/v1/proapplication/').as('PRO');
      
      });

    it('Successfully submit PRO App to ASCAP', () => {
  //Begin songwriter funnel
        cy.visit('/songwriters/#add');
        cy.get('#show-pro-pros-button').click();
        cy.get('.residence:nth-child(1)').select('United States');
        cy.get('.citizenship:nth-child(2)').select('United States');
        cy.get('#pro-pro-ASCAP > img').click();
        cy.get('#continue-to-form').click();


        //Begin PRO Form
        //cy.get('.honorific-holder select')
        //.invoke('text')
        //.contains('Add a New Songtrust Writer'); //add header text assertion

        cy.generate_random(5).then((firstName) => {
            cy.findByTestId('first-name')
            .should('be.visible')
            .type(firstName)
        });

        cy.findByTestId('last-name')
        .should('be.visible')
        .type('Smith');

        cy.findByTestId('id_email')
        .should('be.visible')
        .type(id +'@songtrust.com');

        cy.findByTestId('id_country')
        .should('be.visible')
        .select('United States');

        cy.findByTestId('id_social_security')
        .should('be.visible')
        .type('555-53-6564');

        cy.findByTestId('id_street_address')
        .should('be.visible')
        .type('155 Sixth Avenue');

        cy.findByTestId('id_city')
        .should('be.visible')
        .type('New York');

        cy.findByTestId('id_state')
        .should('be.visible')
        .select('NY');

        cy.findByTestId('id_zip_code')
        .should('be.visible')
        .type('10013');

        cy.findByTestId('id_birth_date')
        .should('be.visible')
        .click();

        cy.get('.ui-datepicker-month')
        .should('be.visible')
        .select('4');

        cy.get('.ui-datepicker-year')
        .should('be.visible')
        .select('1975');

        cy.get('.ui-state-default')
        .should('be.visible')
        .eq(3)
        .click();

        cy.findByTestId('alternate-name-toggle')
        .should('be.visible')
        .click();

        cy.get('.alternate_name')
        .should('be.visible')
        .type('Johnathan Jay');

        cy.findByTestId('id_phone_number')
        .should('be.visible')
        .type('212-555-1449');

        cy.get('#classical')
        .should('be.visible');

        cy.findByTestId('id_membership_toc')
        .should('be.visible')
        .click();

        cy.get('.pro-proceed > .btn-primary')
        .should('be.visible')
        .click();

        //Middle Name Modal
        //cy.get('#3203354835274024 > .modal-header').click(); //add header text assertion
        //cy.get('#\{\{label\}\}').click();

        cy.get('.deny').should('be.visible')
        .click();
        cy.wait('@PRO').should((xhr) => {
          expect(xhr.status, 'successfull POST').to.equal(201);
        });


        //Confirm Modal
        cy.get('#songwriters-generic-modal > .modal-header')
        .should('be.visible'); //add header text assertion

        cy.get('#songwriters-generic-modal h3')
        .should('contain', 'Thanks');

        cy.findByRole('button', {name: 'Ok'})
        .should('be.visible')
        .click();

        //Redirect to Manage Songwriters
        cy.url()
        .should('contains', '/songwriters/');

        cy.get('.songwriter:nth-child(1)')
        .should('exist');

        cy.get('.songwriter:nth-child(1) .writer-email')
        .should('contain', id).end(); //add email ID assertion
    });

    it('Successfully submit PRO App to BMI', () => {
        //Begin songwriter funnel
     cy.visit('/songwriters/#add');
     cy.get('#show-pro-pros-button').click();
     cy.get('.residence:nth-child(1)').select('United States');
     cy.get('.citizenship:nth-child(2)').select('United States');
     cy.get('#pro-pro-BMI > img').click();
     cy.get('#continue-to-form').click();

     //Begin PRO Form
     cy.get(':nth-child(1) > .control-group > div > select')
     .should('be.visible')

     cy.generate_random(5).then((firstName) => {
         cy.findByTestId('first-name')
         .should('be.visible')
         .type(firstName)
     });

     cy.findByTestId('middle-name')
     .should('be.visible');

     cy.findByTestId('last-name')
     .should('be.visible')
     .type('Smith');

     cy.findByTestId('id_email')
     .should('be.visible')
     .type(id +'@songtrust.com');

     cy.findByTestId('id_country')
     .should('be.visible')
     .select('United States');

     cy.findByTestId('id_social_security')
     .should('be.visible')
     .type('555-53-6564');

     cy.findByTestId('id_street_address')
     .should('be.visible')
     .type('155 Sixth Avenue');

     cy.findByTestId('id_city')
     .should('be.visible')
     .type('New York');

     cy.findByTestId('id_state')
     .should('be.visible')
     .select('NY');

     cy.findByTestId('id_zip_code')
     .should('be.visible')
     .type('10013');

     cy.findByTestId('id_birth_date')
     .should('be.visible')
     .click();

     cy.get('.ui-datepicker-month')
     .should('be.visible')
     .select('4');

     cy.get('.ui-datepicker-year')
     .should('be.visible')
     .select('1975');

     cy.get('.ui-state-default')
     .should('be.visible')
     .eq(3)
     .click();

     cy.findByTestId('alternate-name-toggle')
     .should('be.visible')
     .click();

     cy.get('.alternate_name')
     .should('be.visible')
     .type('Johnathan Jay');

     cy.findByTestId('id_phone_number')
     .should('be.visible')
     .type('212-555-1449');

     cy.get('#classical')
     .should('be.visible');

     cy.findByTestId('id_membership_toc')
     .should('be.visible')
     .click();

     cy.get('.pro-proceed > .btn-primary')
     .should('be.visible')
     .click();

     //Middle Name Modal
     //cy.get('#3203354835274024 > .modal-header').click(); //add header text assertion
     //cy.get('#\{\{label\}\}').click();


     cy.get('.deny')
     .should('be.visible')
     .click();

     cy.wait('@PRO').should((xhr) => {
       expect(xhr.status, 'successfull POST').to.equal(201);
     });

     //Confirm Modal
     cy.get('#songwriters-generic-modal > .modal-header')
     .should('exist'); //add header text assertion

     cy.get('#songwriters-generic-modal h3')
     .should('contain', 'Thanks');

     cy.findByRole('button', {name: 'Ok'})
     .should('be.visible')
     .click();

     //Redirect to Manage Songwriters
     cy.url().should('contains', '/songwriters/');
     cy.get('.songwriter:nth-child(1)')
     .should('exist');

     cy.get('.songwriter:nth-child(1) .writer-email')
     .should('contain', id).end(); //add email ID assertion

     });
     
    

});