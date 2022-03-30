const {cy: CyStrings} = require("../fixtures/URLStubs/CyStrings");
class customers {

    elements = {
        newCustomerBtn: () => cy.get('.grid-tabs-container').find(CyStrings.selectors.buttonType),
    }

    clickNewCustomer() {
        this.elements.newCustomerBtn().click();
    }
}
module.exports = new customers();
