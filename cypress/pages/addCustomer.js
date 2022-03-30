const {cy: CyStrings} = require("../fixtures/URLStubs/CyStrings");
const user_with_billing = require('../fixtures/user_with_billing.json');
const user_wo_billing = require('../fixtures/user_wo_billing.json');

const emailWithoutAtSign = `dmitri.saringmail.com`;

class AddCustomer {

    elements = {
        firstNameInput: () => cy.get(CyStrings.selectors.firstNameInput),
        lastNameInput: () => cy.get(CyStrings.selectors.lastNameInput),
        companyNameInput: () => cy.get(CyStrings.selectors.CompanyNameInput),
        displayNameInput: () => cy.get(CyStrings.selectors.DisplayNameInput),
        emailInput: () => cy.get(CyStrings.selectors.emailInput),
        phoneInput: () => cy.get(CyStrings.selectors.phoneInput),
        commentInput: () => cy.get(CyStrings.selectors.commentInput),
        billingAddress: () => cy.get(CyStrings.selectors.billingAddress),
        defaultShippingAddress: () => cy.get(CyStrings.selectors.defaultShippingAddress),

        bFirstNameInput: () => cy.get(CyStrings.selectors.bRoot)
            .find(CyStrings.selectors.bFirstNameInput),
        bLastNameInput: () => cy.get(CyStrings.selectors.bRoot)
            .find(CyStrings.selectors.bLastNameInput),
        bCompanyNameInput: () => cy.get(CyStrings.selectors.bRoot)
            .find(CyStrings.selectors.bCompanyNameInput),
        bPhoneInput: () => cy.get(CyStrings.selectors.bRoot)
            .find(CyStrings.selectors.bPhoneInput),
        bFirstAddressInput: () => cy.get(CyStrings.selectors.bRoot)
            .find(CyStrings.selectors.bFirstAddress),
        bSecondAddressInput: () => cy.get(CyStrings.selectors.bRoot)
            .find(CyStrings.selectors.bSecondAddress),
    }

    populateCustomerData(isBilling) {
        let user
        isBilling ? user = user_with_billing : user = user_wo_billing;
        this.populateUserFirstName(user.firstName);
        this.populateUserLastName(user.lastName);
        this.populateUserCompany(user.company);
        this.populateUserEmail(user.email);
        this.populateUserPhone(user.phone);
        this.populateUserComment(user.comment);
        if (isBilling) {
            this.elements.billingAddress()
                .type("anything")
            this.populateAddress(user);
            this.elements.defaultShippingAddress()
                .type("anything")
            this.populateAddress(user);
        }
        return user
    }

    populateUserFirstName(firstName) {
        cy.intercept('POST', '**/api/customers').as('firstNameAlias')
        this.elements.firstNameInput()
            .type(`${firstName}{enter}`)
        cy.assertChanges()
        cy.get('@firstNameAlias').should(({request}) => {
            expect(request.body).to.have.property("firstName", firstName)
        })
    }

    populateUserLastName(lastName) {
        cy.intercept('PATCH', '**/api/customers/*').as('lastNameAlias')
        this.elements.lastNameInput()
            .type(`${lastName}{enter}`)
        cy.assertChanges()
        cy.get('@lastNameAlias').should(({request}) => {
            expect(request.body).to.have.property("lastName", lastName)
        });
    }

    populateUserCompany(company) {
        cy.intercept('PATCH', '**/api/customers/*').as('companyAlias')
        this.elements.companyNameInput()
            .type(`${company}{enter}`)
        cy.assertChanges()
        cy.get('@companyAlias').should(({request}) => {
            expect(request.body).to.have.property("company", company)
        });
    }

    populateUserEmail(email) {
        cy.intercept('PATCH', '**/api/customers/*').as('emailAlias')
        this.elements.emailInput()
            .type(`${email}{enter}`)
        cy.assertChanges()
        cy.get('@emailAlias').should(({request}) => {
            expect(request.body).to.have.property("email", email)
        });
    }

    populateUserPhone(phone) {
        cy.intercept('PATCH', '**/api/customers/*').as('phoneAlias')
        this.elements.phoneInput()
            .type(`${phone}{enter}`)
        cy.assertChanges()
        cy.get('@phoneAlias').should(({request}) => {
            expect(request.body).to.have.property("phone", phone)
        });
    }

    populateUserComment(comment) {
        cy.intercept('PATCH', '**/api/customers/*').as('commentAlias')
        this.elements.commentInput()
            .type(`${comment}{enter}`)
        cy.assertChanges()
        cy.get('@commentAlias').should(({request}) => {
            expect(request.body).to.have.property("comment", comment)
        });
    }

    populateAddress(user) {
        cy.intercept('POST', '**/api/customer-addresses').as('customerAddressAlias')
        this.elements.bFirstNameInput().type(`${user.addresses[0].firstName}`)
        this.elements.bLastNameInput().type(`${user.addresses[0].lastName}`)
        this.elements.bCompanyNameInput().type(`${user.addresses[0].company}`)
        this.elements.bPhoneInput().type(`${user.addresses[0].phone}`)
        this.elements.bFirstAddressInput().type(`${user.addresses[0].line1}{enter}`, {
            delay: 250,
        })
        this.elements.bSecondAddressInput().type(`${user.addresses[0].line2}{enter}`)
        cy.assertChanges()
        cy.get('@customerAddressAlias').should(({request}) => {
            expect(request.body).to.have.property("firstName", user.addresses[0].firstName)
            expect(request.body).to.have.property("lastName", user.addresses[0].lastName)
            expect(request.body).to.have.property("company", user.addresses[0].company)
            expect(request.body).to.have.property("phone", user.addresses[0].phone)
            expect(request.body).to.have.property("line1", user.addresses[0].line1)
            expect(request.body).to.have.property("line2", user.addresses[0].line2)
        });
    }

    checkSyntax(name) {

        //even we did not fill Display Name input, it's value should not be empty
        this.elements.displayNameInput()
            .find(CyStrings.selectors.firstNameValue)
            .should('have.value', name)

        //the email without "at" will not be accepted.
        this.elements.emailInput()
            .type(`${emailWithoutAtSign}{enter}`)
        cy.get(CyStrings.selectors.newCustomerTopRightElementClass)
            .find(CyStrings.selectors.notSaved)
            .should('have.text', 'Not saved')

        //Todo: extend with more checks
    }

    useBillingAndDeleteOther() {
        cy.get('.MuiButton-label')
            .contains('Use billing address')
            .parent(CyStrings.selectors.buttonType)
            .click();

        cy.get('[data-testid=inputCustomerShippingAddress-0]')
            .parent('.MuiGrid-grid-xs-true')
            .siblings('.MuiGrid-root')
            .find(CyStrings.selectors.buttonType)
            .click();

        cy.get('.MuiListItemText-primary')
            .contains('Delete')
            .click();
    }

    deleteCustomer(name) {
        cy.get('a[id=contactsTab]')
            .click()
        cy.contains("a", `${name}`)
            .click()
        cy.get(CyStrings.selectors.newCustomerTopRightElementClass)
            .find(CyStrings.selectors.saved)
            .siblings('.print-hide')
            .find(CyStrings.selectors.buttonType)
            .click()
        cy.get('[data-testid=cardHeaderMenuButtonDELETE]')
            .click()
        cy.get('[data-testid=confirmDeleteButton]')
            .click()
    }

}

module.exports = new AddCustomer();