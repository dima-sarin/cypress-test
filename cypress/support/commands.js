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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const {cy: CyStrings} = require("../fixtures/URLStubs/CyStrings");

import loginPage from '../pages/login'
import header from '../pages/header'


Cypress.Commands.add('login', (email, password) => {
    cy.visit(Cypress.env('URL'));
    loginPage.typeEmail(email);
    loginPage.typePassword(password);
    loginPage.clickLogin();
    header.assertHeaderIsLoaded();
});

Cypress.Commands.add('openNewSalesOrderPage', () => {
    header.clickPlus();
    header.clickAddSalesOrder();
    //todo: assert success
});

Cypress.Commands.add('assertChanges', () => {
    cy.get(CyStrings.selectors.newCustomerTopRightElementClass)
        .find(CyStrings.selectors.saved)
        .should('have.text', 'All changes saved')

})