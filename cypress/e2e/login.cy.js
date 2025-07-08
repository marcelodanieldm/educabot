// Importamos los Page Objects necesarias para las pruebas
import LoginPage from './pages/loginPage';
import InventoryPage from './pages/inventoryPage'
import CartPage from './pages/cartPage';

describe('Test cases de Login', () => {
    // Instanciamos las Page Objects una vez por suite para reutilizarlas
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();

    beforeEach(() => {
        loginPage.visit();
    });

    it('should allow a standard user to log in successfully', () => {
        loginPage.login('standard_user', 'secret_sauce');
        inventoryPage.getTitle().should('contain', 'Products');
        cy.url().should('include', '/inventory.html');
    });

    it('should display an error for locked out user', () => {
        loginPage.login('locked_out_user', 'secret_sauce');
        loginPage.getErrorMessageText().should('eq', 'Epic sadface: Sorry, this user has been locked out.');
    });

    it('should display an error for invalid username', () => {
        loginPage.login('invalid_user', 'secret_sauce');
        loginPage.getErrorMessageText().should('eq', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('should display an error for invalid password', () => {
        loginPage.login('standard_user', 'wrong_password');
        loginPage.getErrorMessageText().should('eq', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('should display an error for empty username', () => {
        loginPage.typePassword('secret_sauce');
        loginPage.clickLogin();
        loginPage.getErrorMessageText().should('eq', 'Epic sadface: Username is required');
    });

    it('should display an error for empty password', () => {
        loginPage.typeUsername('standard_user');
        loginPage.clickLogin();
        loginPage.getErrorMessageText().should('eq', 'Epic sadface: Password is required');
    });
});


