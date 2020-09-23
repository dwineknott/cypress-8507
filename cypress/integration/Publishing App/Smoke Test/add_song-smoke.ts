import { Song } from "../../../support/Song";
import { Attributes, Datum, RootObject} from "../../../support/Songwriters";


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
              cy.route('POST','/api/v1/song/')
              .as('getSong');

              cy.route('GET', '/api/v2/songwriter/?format=json&for_song_addition=1')
              .as('getSongwriters');
      
          });


    it('Successfully add a song to an account', () => {
          cy.visit('/songs/add/');

          cy.wait(2000);
          cy.wait('@getSongwriters').then((xhr) => {
            const {data} = xhr.responseBody as RootObject;
            console.log(data)
          

          cy.findByTestId('id_title')
          .should('be.visible')
          .type('MistaBobDobalina' + id);

          cy.findByRole('button', {name:'Add an Alternate Song Title'})
          .should('be.visible')
          .click();

          cy.get('.alternate_title')
          .should('be.visible');

          cy.findByRole('button', {name: 'Remove'})
          .should('be.visible')
          .click();
          
          cy.get('.alternate_title')
          .should('not.be.visible');
          
          cy.get('.song-typeahead')
          .should('be.visible');

          cy.get('.songwriter-ownership > .complex-select > .complex-select-label')
          .should('be.visible')
          .click()

/*           cy.get('.songwriter-ownership > .complex-select > .complex-list > .complex-option-list > li')
          .each(($songwriterList, index) => {

            cy.wrap($songwriterList).within(() => {

              const blahwriters: Datum = data[index]
              console.log(blahwriters);

              cy.findByText(blahwriters.attributes.last_name +','+blahwriters.attributes.first_name +''+blahwriters.attributes.last_name,   {selector: 'li'})
              .should('exist');


            });
          });  */
        });
          cy.get('.songwriter-ownership > .complex-select > .complex-list > .complex-option-list > li')
          .eq(5)
          .click();

          cy.get('#co-writer-select > .complex-select > .complex-select-label')
          .should('be.visible');

          cy.get('.song-typeahead')
          .should('be.visible');  //'copy splits' search box

          cy.get('.own-lyrics')
          .should('be.visible')
          .click();

          cy.get('.own-music')
          .should('be.visible')
          .click();

          cy.get('.percentage_box')
          .should('be.visible')
          .type('100%');

          cy.findByTestId('percentage_total')
          .should('be.visible')
          .invoke('text')
          .should('equal', '100.00');

          cy.findByTestId('id_iswc')
          .should('be.visible');

          cy.findByTestId('id_language')
          .should('be.visible')
          .select('en');
    
          cy.findByTestId('id_full_lyrics')
          .should('be.visible')
          .type('MistaBobDobalina' + id);
    
          cy.findByTestId('id_chorus_lyrics')
          .should('be.visible')
          .type('MistaDobalina, MistaBobDobalina' + id);

          cy.findByRole('link', {name: 'Back to Song List'})
          .should('be.visible')
          .and('have.attr', 'href', '/songs');

          cy.findByRole('link', {name: 'Support Form'})
          .should('be.visible')
          .and('have.attr', 'href', 'https://www.songtrust.com/support')

          cy.findByRole('button', {name: 'Register Song'})
          .should('be.visible')
          .click();

          cy.wait('@getSong').then((xhr) => {
            const songs = xhr.responseBody as Song;
            console.log(songs);

          cy.findByTestId('song-added-modal')
          .should('exist')
    
          cy.get('#song-added-modal h3')
            .invoke('text')
            .should('contain', 'Song Added');
    
          //Clicks on Add Additional Song Info Layer
         // cy.findByRole('button', {name: 'Close'})
          //.should('exist')
          
          cy.findByRole('button', {name: 'Add ISRC'})
          .should('exist')  
          .click();

          //Redirect to Add Songs Page - Assert
          cy.url()
          .should('contains', '/songs/'+ songs.id +'/recordings/add/?song-added#spotify')
          .end();
        });  
      
    });

});