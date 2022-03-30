const {cy: CyStrings} = require("../fixtures/URLStubs/CyStrings");

class header {

    elements = {
        plusBtn: () => cy.get(CyStrings.selectors.plusButton),
        addCustomerBtn: () => cy.get(CyStrings.selectors.addCustomer),
        addSalesOrderBtn: () => cy.get(CyStrings.selectors.addSales),
        salesTab: () => cy.get(CyStrings.selectors.salesTab),
        contactsTab: () => cy.get(CyStrings.selectors.contactsTab)
    }

    clickPlus() {
        this.elements.plusBtn().click();
    }

    clickAddCustomer() {
        this.elements.addCustomerBtn().click();
    }

    clickAddSalesOrder() {
        this.elements.addSalesOrderBtn().click();
    }

    clickContactsTab() {
        this.elements.contactsTab().click();
    }
    assertHeaderIsLoaded() {
        this.elements.salesTab().should('have.text', 'Sell')
    }
}

module.exports = new header();

