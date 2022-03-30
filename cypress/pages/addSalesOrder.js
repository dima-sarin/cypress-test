const {cy: CyStrings} = require("../fixtures/URLStubs/CyStrings");

class addSalesOrder {

    elements = {
        customerField: () => cy.get('.soCustomer').find('[type=text]')
    }

    assignCustomer() {
        this.elements.customerField().type('Ervin Howell{enter}', {
            delay: 500,
        })
    }

    removeBillingInformation() {
        cy.get('[data-testid=inputSalesOrderBillingAddress]')
            .find('[data-testid=address-field-location]')
            .click();
        cy.get('button[id=removeAddress]')
            .click();
    }

    editBillingInformation(secondAddress){
        cy.get('[data-testid=inputSalesOrderBillingAddress]')
            .find('[data-testid=address-field-location]')
            .click();
        cy.get(CyStrings.selectors.bRoot)
            .find(CyStrings.selectors.bSecondAddress)
            .type(`${secondAddress}{enter}`)
        cy.assertChanges();
    }

    deleteSalesOrder() {
        cy.get('[data-testid=buttonSalesOrderCardMenu]')
            .click();
        cy.get('[data-testid=cardHeaderMenuButtonDELETE]')
            .click();
        cy.get('[data-testid=confirmDeleteButton]')
            .click();
    }
}
module.exports = new addSalesOrder();

