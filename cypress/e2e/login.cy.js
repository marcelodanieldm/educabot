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

    it('TC-001 Usuario con credenciales validas', () => {
        loginPage.login('standard_user', 'secret_sauce');
        inventoryPage.getTitle().should('contain', 'Products');
        cy.url().should('include', '/inventory.html');
    });

    it('TC-002 Debe mostrar un error de locked out', () => {
        loginPage.login('locked_out_user', 'secret_sauce');
        loginPage.getErrorMessageText().should('eq', 'Epic sadface: Sorry, this user has been locked out.');
    });

    it('TC-003 Mostrar error de usuario', () => {
        loginPage.login('invalid_user', 'secret_sauce');
        loginPage.getErrorMessageText().should('eq', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('TC-004 Mostrar error de password invalido', () => {
        loginPage.login('standard_user', 'wrong_password');
        loginPage.getErrorMessageText().should('eq', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('TC-005 Mostrar error de usuario vacio', () => {
        loginPage.typePassword('secret_sauce');
        loginPage.clickLogin();
        loginPage.getErrorMessageText().should('eq', 'Epic sadface: Username is required');
    });

    it('TC-006 Mostrar error de password vacio', () => {
        loginPage.typeUsername('standard_user');
        loginPage.clickLogin();
        loginPage.getErrorMessageText().should('eq', 'Epic sadface: Password is required');
    });
});


