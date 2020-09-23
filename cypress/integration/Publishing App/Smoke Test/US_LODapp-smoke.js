
describe('Smoke Test - US Entity LOD Application Feature', () => {
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

    //random string generator
/*     function generateRandom(string_length) {
         let firstName = '';
         let random_ascii;
         for(let i = 0; i < string_length; i++) {
             random_ascii = Math.floor((Math.random() * 25) + 97);
             firstName += String.fromCharCode(random_ascii)
          }
         return firstName
            
    };

    var firstName = generateRandom(5) */

    it('Successfully Submit LOD App To US Entity - ASCAP ', () => {
   //Begin LOD funnel workflow
        cy.visit('/songwriters/#add');
        cy.findByTestId('show-lod-pros-button')
        .click();
        cy.findByTestId('lod-pro-selections')
        .select('ASCAP', {force:true});
        cy.findByTestId('lod-pro-selections')
        .should('have.value', 'ASCAP');
        cy.findByTestId('continue-to-form')
        .click();

        //LOD Form
        cy.url()
        .should('contains', '/songwriters/#add/lod-form');//assert URL

        cy.findByTestId('first-name')
        .should('be.visible')
        .type('Frank');

        cy.findByTestId('last-name')
        .should('be.visible')
        .type('Ahrold');

        cy.findByTestId('id_email')
        .should('be.visible')
        .type(id +'@songtrust.com');

        cy.findByTestId('id_writer_id')
        .should('be.visible')
        .type('88515642');

        cy.findByTestId('pubco_yes')
        .should('be.visible')
        .click();

        cy.findByTestId('id_publishing_company')
        .should('be.visible')
        .type('Alpha Music');

        cy.findByTestId('publishing_company_pro')
        .should('be.visible')
        .select('ASCAP', {force: true});

        cy.findByTestId('publishing_company_pro')
        .should('be.visible')
        .should('have.value', 'ASCAP');

        cy.findByTestId('id_publisher_id')
        .should('be.visible')
        .type('697403510');

        //signature panel 
        cy.findByTestId('signature_panel')
        .should('be.visible')
        .click();
        cy.get('.type-toggle')
        .should('be.visible')
        .click(); 
        cy.get('.typed-signature-field')
        .should('be.visible')
        .click();
        cy.get('.typed-signature-field')
        .should('be.visible')
        .type('Frank Ahrold');

        cy.get('.standard')
        .should('be.visible')
        cy.get('.standard')
        .click()
                cy.wait('@lod').should((xhr) => {
                expect(xhr.status, 'successfull POST').to.equal(201);
                });
    }); 

    it('Successfully Submit LOD App To US Entity - BMI ', () => {
        //Begin LOD funnel workflow
        cy.visit('/songwriters/#add');
        cy.findByTestId('show-lod-pros-button')
        .click();
        cy.findByTestId('lod-pro-selections')
        .select('BMI', {force:true});
        cy.findByTestId('lod-pro-selections')
        .should('have.value', 'BMI');
        cy.findByTestId('continue-to-form')
        .click();

        //LOD Form
        cy.url().should('contains', '/songwriters/#add/lod-form');  //assert URL

        cy.findByTestId('first-name')
        .should('be.visible')
        .type('Taylor');

        cy.findByTestId('last-name')
        .should('be.visible')
        .type('Swift');

        cy.findByTestId('id_email')
        .should('be.visible')
        .type(id +'@songtrust.com');

        cy.findByTestId('id_writer_id')
        .should('be.visible')
        .type('454808145');

        cy.findByTestId('pubco_yes')
        .should('be.visible')
        .click();

        cy.findByTestId('id_publishing_company')
        .should('be.visible')
        .type('Alpha Music');

        cy.findByTestId('publishing_company_pro')
        .should('be.visible')
        .select('ASCAP', {force: true});

        cy.findByTestId('publishing_company_pro')
        .should('be.visible')
        .should('have.value', 'ASCAP');

        cy.findByTestId('id_publisher_id')
        .should('be.visible')
        .type('697403510');

        cy.findByTestId('signature_panel')
        .should('be.visible')
        .click();

        cy.get('.type-toggle')
        .should('be.visible')
        .click();

        cy.get('.typed-signature-field')
        .should('be.visible')
        .click();

        cy.get('.typed-signature-field')
        .should('be.visible')
        .type('Taylor Swift');

        cy.get('.standard')
        .should('be.visible')
        cy.get('.standard')
        .click()
        cy.wait('@lod').should((xhr) => {
          expect(xhr.status, 'successfull POST').to.equal(201);
        });
        
        //Thank you modal - NOT WORKING DUE TO CYPRESS BUG
        //cy.get('.back').should('be.visible')
        //cy.get('.back').click();

        //Back to Songwriters Main Page
        //cy.url().should('contains', '/songwriters/');
        //cy.get('.songwriter:nth-child(1)').should('exist');
        //cy.get('.songwriter:nth-child(1) .writer-email').should('contain', id).end(); //add email ID assertion


    });


});