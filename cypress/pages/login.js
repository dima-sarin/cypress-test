const CyStrings = require('../fixtures/URLStubs/CyStrings').cy;

class loginPage {

    elements = {
        emailInput: () => cy.get(CyStrings.selectors.loginusername),
        passwordInput: () => cy.get(CyStrings.selectors.loginpassword),
        loginBtn: () => cy.get(CyStrings.selectors.loginButton),

    }

    typeEmail(username) {
        this.elements.emailInput().type(username);
    }

    typePassword(password) {
        this.elements.passwordInput().type(password);
    }

    clickLogin() {
        this.elements.loginBtn().click();
    }
}

module.exports = new loginPage();