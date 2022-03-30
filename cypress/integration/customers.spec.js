const {cy: CyStrings} = require("../fixtures/URLStubs/CyStrings");
import addCustomer from '../pages/addCustomer';
import addSalesOrder from '../pages/AddSalesOrder';
import customers from '../pages/customers';
import header from '../pages/header';


describe('Suite for managing the customers', function () {

    before(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
    });

    beforeEach(() => {
        //Todo: need to confirm customers are not available and remove them

    });

    afterEach(() => {
        addCustomer.deleteCustomer(user.name)
    });

    let user;

    it('Add new customer via global add', () => {
        header.clickPlus();
        header.clickAddCustomer();
        user = addCustomer.populateCustomerData(false);
        assertCustomer(user);
    });

    it('Add new customer via new customer button', () => {
        header.clickContactsTab();
        customers.clickNewCustomer();
        user = addCustomer.populateCustomerData(false);
        assertCustomer(user);
    });

    it('Add new customer and syntax check', () => {
        header.clickPlus();
        header.clickAddCustomer();
        user = addCustomer.populateCustomerData(false);
        addCustomer.checkSyntax(user.name);
    });

    it('Add new customer with the address', () => {
        header.clickPlus();
        header.clickAddCustomer();
        user = addCustomer.populateCustomerData(true);
        assertCustomer(user);
    });

    it('Add new customer and use billing address', () => {
        header.clickPlus();
        header.clickAddCustomer();
        user = addCustomer.populateCustomerData(true);
        addCustomer.useBillingAndDeleteOther();
        assertCustomer(user);
    });

    it('Assign customer to Sell Order and edit billing information', () => {
        header.clickPlus();
        header.clickAddCustomer();
        user = addCustomer.populateCustomerData(true);

        assertCustomer(user);
        cy.openNewSalesOrderPage();
        addSalesOrder.assignCustomer()
        //Todo: click on Billing address and assert against the values

        addSalesOrder.editBillingInformation("new address")
        addSalesOrder.deleteSalesOrder()
    });

    it('Assign customer to Sell Order and remove billing information', () => {
        header.clickPlus();
        header.clickAddCustomer();
        user = addCustomer.populateCustomerData(true);

        assertCustomer(user);
        cy.openNewSalesOrderPage();
        addSalesOrder.assignCustomer()
        //Todo: click on Billing address and assert against the values

        addSalesOrder.removeBillingInformation()
        addSalesOrder.deleteSalesOrder()
    });


});
function assertCustomer(user) {
    cy.location('pathname').invoke('split', '/').its(2).as("customerID")

    cy.get(CyStrings.selectors.newCustomerTopRightElementClass)
        .find(CyStrings.selectors.saved)
        .siblings('[type="button"]')
        .click()

    cy.get('@customerID').then(id => {
        const customerHref = "/customer/" + id;
        cy.contains("a", `${user.name}`).should("have.attr", "href", customerHref).click();
        //Todo: click on it and assert against the values
    })
}
