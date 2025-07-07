class LoginPage {

    getUsuario() {
        return cy.get('[data-test=username]');
    }

    getPassword() {
        return cy.get('[data-test=password]');
    }

    getLoginBtn() {
        return cy.get('#login-button');
    }

}

export default LoginPage;