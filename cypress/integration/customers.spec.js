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

    let user;

    it('Add new customer via global add', () => {
        header.clickPlus();
        header.clickAddCustomer();
        user = addCustomer.populateCustomerData(false);
        assertCustomer(user);
        addCustomer.deleteCustomer(user.name)
    });

    it('Add new customer via new customer button', () => {
        header.clickContactsTab();
        customers.clickNewCustomer();
        user = addCustomer.populateCustomerData(false);
        assertCustomer(user);
        addCustomer.deleteCustomer(user.name)
    });

    it('Add new customer and syntax check', () => {
        header.clickPlus();
        header.clickAddCustomer();
        user = addCustomer.populateCustomerData(false);
        addCustomer.checkSyntax(user.name);
        addCustomer.deleteCustomer(user.name)
    });

    it('Add new customer with the address', () => {
        header.clickPlus();
        header.clickAddCustomer();
        user = addCustomer.populateCustomerData(true);
        assertCustomer(user);
        addCustomer.deleteCustomer(user.name)
    });

    it('Add new customer and use billing address', () => {
        header.clickPlus();
        header.clickAddCustomer();
        user = addCustomer.populateCustomerData(true);
        addCustomer.useBillingAndDeleteOther();
        assertCustomer(user);
        addCustomer.deleteCustomer(user.name)
    });

    it('Assign customer to Sell Order and edit billing information', () => {
        header.clickPlus();
        header.clickAddCustomer();
        user = addCustomer.populateCustomerData(true);

        assertCustomer(user);
        cy.openNewSalesOrderPage();
        addSalesOrder.assignCustomer()

        addSalesOrder.editBillingInformation("new address")
        addSalesOrder.deleteSalesOrder()
        addCustomer.deleteCustomer(user.name)
    });

    it('Assign customer to Sell Order and remove billing information', () => {
        header.clickPlus();
        header.clickAddCustomer();
        user = addCustomer.populateCustomerData(true);

        assertCustomer(user);
        cy.openNewSalesOrderPage();
        addSalesOrder.assignCustomer()

        addSalesOrder.removeBillingInformation()
        addSalesOrder.deleteSalesOrder()
        addCustomer.deleteCustomer(user.name)
    });


});

//todo: needs to be moved to one of the pages
function assertCustomer(user) {
    cy.location('pathname').invoke('split', '/').its(2).as("customerID")

    cy.get(CyStrings.selectors.newCustomerTopRightElementClass)
        .find(CyStrings.selectors.saved)
        .siblings('[type="button"]')
        .click()

    cy.get('@customerID').then(id => {
        const customerHref = "/customer/" + id;
        cy.get('a[href="' + customerHref + '"][data-testid=cellName]').click()
        //Todo: Assert against the values we filled in initially
    })
}
