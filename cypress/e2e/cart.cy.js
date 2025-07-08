import LoginPage from '../pages/loginPage';
import ProductsPage from '../pages/inventoryPage';
import CartPage from '../pages/cartPage';

describe('Cart Feature Tests', () => {
    // Instanciamos las Page Objects
    const loginPage = new LoginPage();
    const productsPage = new ProductsPage();
    const cartPage = new CartPage();

    beforeEach(() => {
        loginPage.visit();
        loginPage.login('standard_user', 'secret_sauce');
        productsPage.getTitle().should('contain', 'Products');
    });

    it('should add a single item to the cart', () => {
        const productName = 'Sauce Labs Backpack';
        productsPage.addProductToCart(productName);
        productsPage.getCartBadgeCount().should('have.text', '1');
        productsPage.clickShoppingCart();
        cartPage.getCartItem(productName).should('exist');
        cartPage.getNumberOfCartItems().should('have.length', 1);
    });

    it('should add multiple items to the cart', () => {
        const product1 = 'Sauce Labs Backpack';
        const product2 = 'Sauce Labs Bike Light';
        productsPage.addProductToCart(product1);
        productsPage.addProductToCart(product2);
        productsPage.getCartBadgeCount().should('have.text', '2');
        productsPage.clickShoppingCart();
        cartPage.getCartItem(product1).should('exist');
        cartPage.getCartItem(product2).should('exist');
        cartPage.getNumberOfCartItems().should('have.length', 2);
    });

    it('should remove an item from the cart from the products page', () => {
        const productName = 'Sauce Labs Backpack';
        productsPage.addProductToCart(productName);
        productsPage.getCartBadgeCount().should('have.text', '1');
        productsPage.removeProductFromCart(productName);
        cy.get(productsPage.cartBadge).should('not.exist'); // Accedemos directamente al selector
    });

    it('should remove an item from the cart from the cart page', () => {
        const product1 = 'Sauce Labs Backpack';
        const product2 = 'Sauce Labs Bike Light';
        productsPage.addProductToCart(product1);
        productsPage.addProductToCart(product2);
        productsPage.getCartBadgeCount().should('have.text', '2');
        productsPage.clickShoppingCart();
        cartPage.getCartItem(product1).should('exist');
        cartPage.removeProductFromCart(product1);
        cartPage.getCartItem(product1).should('not.exist');
        cartPage.getNumberOfCartItems().should('have.length', 1);
        cartPage.clickContinueShopping();
        productsPage.getCartBadgeCount().should('have.text', '1');
    });

    it('should proceed to checkout from the cart page', () => {
        const productName = 'Sauce Labs Backpack';
        productsPage.addProductToCart(productName);
        productsPage.clickShoppingCart();
        cartPage.clickCheckout();
        cy.url().should('include', '/checkout-step-one.html');
        cy.get('.title').should('contain', 'Checkout: Your Information');
    });

    it('should navigate back to products from cart page', () => {
        const productName = 'Sauce Labs Backpack';
        productsPage.addProductToCart(productName);
        productsPage.clickShoppingCart();
        cartPage.clickContinueShopping();
        cy.url().should('include', '/inventory.html');
        productsPage.getTitle().should('contain', 'Products');
    });
});