class LoginPage {
    // selectores de login.
    get usernameInput() { return '#user-name'; }
    get passwordInput() { return '#password'; }
    get loginButton() { return '#login-button'; }
    get errorMessage() { return '[data-test="error"]'; }

    visit() {
        cy.visit('/'); //Doy referencia a la URL en cypress.config.js
    }

    typeUsername(username) {
        cy.get(this.usernameInput).type(username);
    }

    typePassword(password) {
        cy.get(this.passwordInput).type(password);
    }

    clickLogin() {
        cy.get(this.loginButton).click();
    }

    // Método combinado para login
    login(username, password) {
        this.typeUsername(username);
        this.typePassword(password);
        this.clickLogin();
    }

    getErrorMessageText() {
        return cy.get(this.errorMessage).invoke('text');
    }
}

export default LoginPage;