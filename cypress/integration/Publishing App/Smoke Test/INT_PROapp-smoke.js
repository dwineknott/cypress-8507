describe('Smoke Test - Non U.S. PRO App feature', () => {
    
    //random number generator
    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()

    //form data for jquery variable capturing
    var city;
    var countryofbirth;
    var representation;
    var province;
    var gender;
    var genre;
   
  
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
    
    beforeEach (() => {
        cy.server()
        cy.route('POST', '/api/v1/proapplication/').as('PRO');
    });

    //random string generator
    function generateRandom(string_length) {
         let firstName = '';
         let random_ascii;
         for(let i = 0; i < string_length; i++) {
             random_ascii = Math.floor((Math.random() * 25) + 97);
             firstName += String.fromCharCode(random_ascii)
          }
         return firstName
            
    };

    var firstName = generateRandom(5)
    
    ///////////SOCAN//////////////
      it('Successfully submit PRO App to Non U.S. entity - SOCAN', () => {

        //Begin songwriter funnel
        cy.visit('/songwriters/#add');
        cy.findByTestId('show-pro-pros-button')
        .click();
        cy.get('.pro-pro > .residence')
        .select('CA');
        cy.get('.pro-pro > .citizenship')
        .select('CA');
        cy.findByTestId('pro-pro-SOCAN')
        .click();
        cy.findByTestId('continue-to-form')
        .click();

        //Begin PRO Form - SOCAN
        cy.get('.honorific-holder select')
        .should('be.visible')
        //.select('Ms');

        cy.findByTestId('first-name')
        .should('be.visible')
        .type(firstName)

        cy.findByTestId('middle-name')
        .should('be.visible'); //confirm exist

        cy.findByTestId('last-name')
        .should('be.visible')
        .type('Smith');

        cy.findByTestId('id_email')
        .should('be.visible')
        .type(id +'socan@songtrust.com');

        cy.findByTestId('id_country')
        .should('be.visible')
        //.and('have.value', 'Canada'); //confirm exist
        .select('CA', {force:true});

        cy.findByTestId('id_country_of_birth')
        .should('be.visible')
        .select('CA', {force:true}).then(elem => {
            var countryofbirth = Cypress.$(elem).val();
            return countryofbirth;
        });    

        cy.findByTestId('id_us_representation')
        .should('be.visible')
        .select('ASCAP', {force:true}).then(elem => {
            var representation = Cypress.$(elem).val();
            return representation;
        });

        cy.findByTestId('id_street_address')
        .should('be.visible')
        .type('1000 Donora Drive');

        cy.findByTestId('id_city')
        .should('be.visible')
        .type('Toronto').then(elem => {
            var city = Cypress.$(elem).val();
            return city;
        });

        cy.findByTestId('id_state')
        .should('be.visible')
        .type('{enter}')
        .select('Ontario', {force: true}).then(elem => {
            var province = Cypress.$(elem).val();
            return province;
        });    

        cy.findByTestId('id_zip_code')
        .should('be.visible')
        .type('M4B IB3');

        //date picker
        cy.findByTestId('id_birth_date')
        .should('be.visible')
        .click();        
        cy.get('.ui-datepicker-month')
        .type('4');
        cy.get('.ui-datepicker-year')
        .type('1977');
        cy.get('.ui-state-default')
        .eq(3)
        .click();

        cy.findByTestId('id_gender')
        .should('be.visible')
        .select('F', {force:true}).then(elem => {
            var gender = Cypress.$(elem).val();
            return gender;
        });

        cy.findByTestId('alternate-name-toggle')
        .should('be.visible')
        .click();

        cy.get('.alternate_name')
        .should('be.visible')
        .type('John Jay Smith');

        cy.findByTestId('id_phone_number')
        .should('be.visible')
        .type('212-555-7653');

        cy.findByTestId('id_genre')
        .should('be.visible')
        .select('FILM', {force:true}).then(elem => {
            var genre = Cypress.$(elem).val();
            return genre;
        });

        cy.findByTestId('id_membership_toc')
        .should('be.visible')
        .check();

        cy.findByTestId('classical')
        .should('be.visible')
        .check(); // confirm ‘Writing classical music?’ checkbox exist

        cy.get('.pro-proceed > .btn-primary')
        .should('be.visible')
        .click();

        //Middle Name Modal - Post Form
        cy.get('.deny')
        .should('be.visible')
        cy.get('.deny')
        .click();
        cy.wait('@PRO').should((xhr) => {
            expect(xhr.status, 'successful POST').to.equal(201);
        });
         
        //Confirm Modal
        cy.get('#songwriters-generic-modal > .modal-header')
        .should('be.visible'); //add header text assertion
        cy.get('#songwriters-generic-modal h3')
        .should('contain', 'Thanks');
        cy.get('#songwriters-generic-modal .btn')
        .click();

        //Redirect to Manage Songwriters
        cy.url()
        .should('contains', '/songwriters/');
        cy.get('.songwriter:nth-child(1)')
        .should('be.visible');
        cy.get('.songwriter:nth-child(1) .writer-email')
        .should('contain', id).end(); //add email ID assertion
    });

    /////////////////IMRO////////////////
    it('Successfully submit PRO App to Non U.S. entity - IMRO', () => {
        //Begin songwriter funnel
        cy.visit('/songwriters/#add');
        cy.findByTestId('show-pro-pros-button')
        .click();
        cy.get('.pro-pro > .residence')
        .select('France');
        cy.get('.pro-pro > .citizenship')
        .select('France');
        cy.findByTestId('pro-pro-IMRO')
        .click();
        cy.findByTestId('continue-to-form')
        .click();

        //Begin PRO Form - IMRO
        cy.get('#salutation .bx--select-input')
        .should('be.visible')
        .select('Mr');

        cy.findByTestId('first-name')
        .should('be.visible')
        .type('John');

        cy.findByTestId('last-name')
        .should('be.visible')
        .type('Smith');

        cy.findByTestId('id_email')
        .should('be.visible')
        .type(id +'imro@songtrust.com');

        cy.findByTestId('id_phone_number')
        .should('be.visible')
        .type('2125551578');

        cy.findByTestId('id_alternate_names')
        .should('be.visible')
        .type('John Jay Smith');

        cy.findByTestId('alternate-name-toggle')
        .should('be.visible')
        .click();

        cy.get('.alternate_name')
        .should('exist')
        .type('Jay Jacob Smith');

        cy.findByTestId('already-member-1')
        .should('be.visible'); //assert

        cy.findByTestId('already-member-2')
        .should('be.visible') //assert
        .click(); 

        cy.findByTestId('exclude-countries-1')
        .should('be.visible'); //assert

        cy.findByTestId('exclude-countries-2')
        .should('be.visible') //assert
        .click();

        cy.findByTestId('has-publisher-1')
        .should('be.visible'); //assert

        cy.findByTestId('has-publisher-2')
        .should('be.visible')  //assert
        .click(); 

        cy.get('#id_us_representation > .bx--select-input')
        .should('be.visible')
        .select('ASCAP', {force:true});

        //date picker
        cy.findByTestId('id_birth_date')
        .should('be.visible')
        .click();

        cy.get('.ui-datepicker-month')
        .select('4', {force: true});

        cy.get('.ui-datepicker-year')
        .select('1977', {force: true});

        cy.get('.ui-state-default')
        .eq(3)
        .click();

        cy.findByTestId('id_country_of_birth')
        .should('be.visible')
        .select('United States', {force: true});

        cy.findByTestId('id_tax_country')
        .should('be.visible')
        .select('United States', {force: true});

        cy.findByTestId('id_country')
        .should('be.visible')
        .select('United States', {force: true});

        cy.findByTestId('id_street_address')
        .should('be.visible')
        .type('155 Sixth Avenue');

        cy.findByTestId('id_city')
        .should('be.visible')
        .type('New York');

        cy.findByTestId('id_zip_code')
        .should('be.visible')
        .type('10017');
        
        
    
         cy.findByTestId('fsp-fileUpload')
         .trigger('mouseover', {force: true})
         .attachFile('drag-and-drop.pdf', {force: true});
            cy.get('.fsp-summary__item')
            .should('be.visible')
            cy.get('.fsp-summary__item')
            .contains('drag-and-drop.pdf');
            cy.get('.fsp-button > span')
            .click({force: true});
        

        //Signature Date Picker
        cy.findByTestId('signature-date')
        .should('be.visible')
        .click({force: true});
        cy.get('.ui-datepicker-month')
        .select('4', {force: true});
        cy.get('.ui-datepicker-year')
        .select('1977', {force: true});
        cy.get('.ui-state-default')
        .eq(4)
        .click({force: true}); //select day from calendar

        //Signature
        cy.get('.type-toggle')
        .should('be.visible')
        .click({force:true});
        cy.get('.typed-signature-field')
        .should('be.visible')
        .click({force:true});  //assert
        cy.get('.typed-signature-field')
        .type('John Smith');

        cy.findByTestId('imro-marketing-permission')
        .should('be.visible')
        .check({force: true});

        //Submit Form
        cy.get('.bx--btn--primary')
        .should('be.visible')
        .click({force: true});
        cy.wait('@PRO').should((xhr) => {
        expect(xhr.status, 'successful POST').to.equal(201);
    });

        //Confirm Modal
        cy.get('#songwriters-generic-modal > .modal-header')
        .should('be.visible'); //add header text assertion
        cy.get('#songwriters-generic-modal h3')
        .should('contain', 'Songwriter Added');
        cy.get('#songwriters-generic-modal .btn')
        .click();

        //Redirect to Add Songs Page - Assert
        cy.url()
        .should('contains', '/songs/add/')
        .end();



    });
});