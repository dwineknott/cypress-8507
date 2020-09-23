import '@testing-library/cypress/add-commands';

import 'cypress-file-upload'; //https://www.npmjs.com/package/cypress-file-upload

Cypress.Commands.add('random_numbers', () => {
    const uuid = () => Cypress._.random(0, 1e6)
    const tx = uuid()
    console.log(tx)
    return tx
})

Cypress.Commands.add('generate_random', (string_length) => { 

    let random_string = '';
    let random_ascii;
    for(let i = 0; i < string_length; i++) {
        random_ascii = Math.floor((Math.random() * 25) + 97);
        random_string += String.fromCharCode(random_ascii)
    }
    return random_string
})


Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: '/api/v1/user/login/',
        body: {
            username: 'demo@songtrust.com',
            password: 'testing',
        }
    })
})

Cypress.Commands.add('logout',() => {
    cy.request({
        method: 'GET',
        url: '/api/v1/user/logout/',
    })
})

Cypress.Commands.add('proapplication', () => {
    cy.request({
        method: 'POST',
        url: '/api/v1/proapplication/',
        body: {
        application_approval: true,
        birth_date: "07/14/1976",
        city: "toronto",
        country: "CA",
        country_of_birth: "CA",
        gender: "F",
        genre: "CTRY",
        phone_number: "+12125556868",
        pop_music: false,
        pro: {name: "ASCAP"},
        social_security: "",
        songwriter: {honorific: "Mr", alternate_names: [], first_name: firstName, middle_name: "", last_name: "Smith", songwriter_type: "client", birth_date: "04/03/1977", email: id +"@songtrust.com"},
        state: "Ontario",
        street_address: "1000 Donora Drive",
        us_representation: "ASCAP",
        zip_code: "M4B IB3",
        }
    })  
    
})
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
