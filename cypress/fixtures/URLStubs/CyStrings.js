module.exports = {

    cy: {
        selectors: {
            //General
            "buttonType": "button[type=button]",

            //login page
            "loginusername": "[type=email]",
            "loginpassword": "[type=password]",
            "loginButton": "button[type=submit]",

            //header
            "plusButton": "button[id=globalAdd]",
            "addCustomer": "[id=add-customer]",
            "addSales": "[id=add-sales]",
            "salesTab": "a[id=salesTab]",
            "contactsTab": "a[id=contactsTab]",

            //customer page
            "firstNameInput": "[data-testid=inputCustomerFirstName]",
            "firstNameValue": "input[name=name]",
            "lastNameInput": "[data-testid=inputCustomerLastName]",
            "CompanyNameInput": "[data-testid=inputCustomerCompany]",
            "DisplayNameInput": "[data-testid=inputCustomerDisplayName]",
            "emailInput": "[data-testid=inputCustomerEmail]",
            "phoneInput": "[data-testid=inputCustomerPhone]",
            "commentInput": "[data-testid=inputCustomerComment]",
            "billingAddress": "[data-testid=inputCustomerDefaultBillingAddress]",
            "defaultShippingAddress": "[data-testid=inputCustomerDefaultShippingAddress]",
            "newCustomerTopRightElementClass": ".MuiGrid-justify-content-xs-flex-end",

            "saved": ".saved",
            "notSaved": ".notSaved",

            //customer page - billing
            "bRoot": ".MuiDialogContent-root",
            "bFirstNameInput": "[name=firstName]",
            "bLastNameInput": "[name=lastName]",
            "bCompanyNameInput": "[name=company]",
            "bPhoneInput": "[name=phone]",
            "bFirstAddress": "[name=line1]",
            "bSecondAddress": "[name=line2]"
        }
    }
};