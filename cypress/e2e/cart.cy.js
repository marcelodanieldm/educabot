//importamos los modulos de los page objects
import LoginPage from './pages/loginPage';
import CartPage from './pages/cartPage';
import InventoryPage from './pages/inventoryPage';

describe('Test de Carrito de compra', () => {
    // Instanciamos las Page Objects
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();
    const cartPage = new CartPage();

    beforeEach(() => {
        loginPage.visit();
        loginPage.login('standard_user', 'secret_sauce');
        inventoryPage.getTitle().should('contain', 'Products');
    });

    it('TC-001 Agregar un solo producto al carrito', () => {
        const productName = 'Sauce Labs Backpack';
        inventoryPage.addProductToCart(productName);
        inventoryPage.getCartBadgeCount().should('have.text', '1');
        inventoryPage.clickShoppingCart();
        cartPage.getCartItem(productName).should('exist');
        cartPage.getNumberOfCartItems().should('have.length', 1);
    });

    it('TC-002 Agregar mas de un producto al carrito', () => {
        const product1 = 'Sauce Labs Backpack';
        const product2 = 'Sauce Labs Bike Light';
        inventoryPage.addProductToCart(product1);
        inventoryPage.addProductToCart(product2);
        inventoryPage.getCartBadgeCount().should('have.text', '2');
        inventoryPage.clickShoppingCart();
        cartPage.getCartItem(product1).should('exist');
        cartPage.getCartItem(product2).should('exist');
        cartPage.getNumberOfCartItems().should('have.length', 2);
    });

    it('TC-003 remover un producto del carrito', () => {
        const productName = 'Sauce Labs Backpack';
        inventoryPage.addProductToCart(productName);
        inventoryPage.getCartBadgeCount().should('have.text', '1');
        inventoryPage.removeProductFromCart(productName);
        cy.get(inventoryPage.cartBadge).should('not.exist'); // Accedemos directamente al selector
    });

    it('TC-004 remover un producto de la pagina de cart', () => {
        const product1 = 'Sauce Labs Backpack';
        const product2 = 'Sauce Labs Bike Light';
        inventoryPage.addProductToCart(product1);
        inventoryPage.addProductToCart(product2);
        inventoryPage.getCartBadgeCount().should('have.text', '2');
        inventoryPage.clickShoppingCart();
        cartPage.getCartItem(product1).should('exist');
        cartPage.removeProductFromCart(product1);
        cartPage.getCartItem(product1).should('not.exist');
        cartPage.getNumberOfCartItems().should('have.length', 1);
        cartPage.clickContinueShopping();
        inventoryPage.getCartBadgeCount().should('have.text', '1');
    });

    it('TC-005 checkout de la pagina step 1 e informacion', () => {
        const productName = 'Sauce Labs Backpack';
        inventoryPage.addProductToCart(productName);
        inventoryPage.clickShoppingCart();
        cartPage.clickCheckout();
        cy.url().should('include', '/checkout-step-one.html');
        cy.get('.title').should('contain', 'Checkout: Your Information');
    });

    it('TC-006 volver atras desde la pagina del carrito', () => {
        const productName = 'Sauce Labs Backpack';
        inventoryPage.addProductToCart(productName);
        inventoryPage.clickShoppingCart();
        cartPage.clickContinueShopping();
        cy.url().should('include', '/inventory.html');
        inventoryPage.getTitle().should('contain', 'Products');
    });
});